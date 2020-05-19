import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from 'src/app/models/store';
import { BusinessResult } from '../../models/business-result';
import { map } from 'rxjs/operators';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  stores: Store[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    console.log('on init');

    this.loadData();

  }

  private loadData(): void {

    this.api.get('stores').subscribe( (response: BusinessResult) => {
      console.log(response);
    });
  }

}
