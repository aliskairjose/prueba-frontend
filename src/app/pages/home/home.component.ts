import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from 'src/app/models/store';
import { BusinessResult } from '../../models/business-result';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  stores: Store[] = [];
  loading: boolean;
  imgUrl = environment.imgUrl;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.loading = false;
    this.loadData();

  }

  private loadData(): void {
    this.loading = true;
    this.api.get('stores').subscribe( (response: BusinessResult) => {
      if (response.isSuccess) {
        console.log(response.objects);
        this.loading = false;
        this.stores = response.objects;
      }
    });
  }

}
