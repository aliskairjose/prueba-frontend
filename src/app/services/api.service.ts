import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.baseUrl;



  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  get( url: string ): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient.get( this.apiUrl + url, { headers } );
  }

  post( url: string, params: any, type = false ): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient.post( this.apiUrl + url, params, { headers } );
  }

}
