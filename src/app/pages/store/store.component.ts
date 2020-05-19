import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessResult } from '../../models/business-result';
import { map } from 'rxjs/operators';

@Component( {
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: [ './store.component.scss' ]
} )
export class StoreComponent implements OnInit {
  loading = true;
  submitted = false;
  editForm: FormGroup;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = false;

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.editForm.controls; }

  onSubmit(): void {

    this.submitted = true;

    if ( this.editForm.valid ) {
      this.loading = true;
      this.save( this.editForm.value );
    }

  }

  private createForm(): void {
    this.editForm = this.formBuilder.group( {
      name: [ '', [ Validators.required ] ],
      phone: [ '', [ Validators.required ] ],
      address: [ '', [ Validators.required ] ],
      email: [ '', [] ]
    } );
  }

  private save( params: any ): void {
    this.api.post( 'store', params ).pipe( map( ( response: BusinessResult ) => {
      if ( response.isSuccess ) {
        console.log( response.objects );
      }
    } )
    );
  }

}
