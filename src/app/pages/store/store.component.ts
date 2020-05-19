import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessResult } from '../../models/business-result';
import { map } from 'rxjs/operators';
import { Store } from '../../models/store';

@Component( {
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: [ './store.component.scss' ]
} )
export class StoreComponent implements OnInit {
  loading: boolean;
  submitted: boolean;
  warning: boolean;
  storeForm: FormGroup;
  filesCount: number;
  formData = new FormData();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = false;
    this.warning = false;

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.storeForm.controls; }

  clearForm(): void {
    this.storeForm.reset();
  }

  onSubmit(): void {

    this.submitted = true;

    if ( this.filesCount > 3 ) {
      this.warning = true;
      setTimeout( () => {
        this.warning = false;
      }, 2000 );
      return;
    }

    if ( this.storeForm.valid ) {
      this.loading = true;
      this.save( this.storeForm.value );
    }

  }

  onLoadimages( files: FileList ): void {
    this.warning = false;
    if ( files.length > 3 ) {
      this.warning = true;
      this.filesCount = files.length;
    }

    for ( const key in files ) {
      if ( files.hasOwnProperty( key ) ) {
        const file = files[ key ];
        this.formData.append( `picture_${key}`, file, file.name );
      }
    }

  }

  private createForm(): void {
    this.storeForm = this.formBuilder.group( {
      name: [ '', [ Validators.required ] ],
      phone: [ '', [ Validators.required ] ],
      address: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.email ] ]
    } );
  }

  private save( params: Store ): void {
    for ( const key in params ) {
      if ( params.hasOwnProperty( key ) ) {
        const element = params[ key ];
        this.formData.append( key, element );
      }
    }

    this.api.post( 'stores', this.formData ).subscribe( ( response: BusinessResult ) => {
      if ( response.isSuccess ) {
        this.loading = false;
        // this.router.navigateByUrl('/home');
        // this.;
      }
    } );
  }

}
