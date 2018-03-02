import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

// rxjs
import { toPromise } from 'rxjs/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';

import { AppSettingsService } from './app-settings.service';

@Injectable()
export class HttpService {

  private baseUrl: string;

  constructor(
    public appSettingsService: AppSettingsService,
    private http: HttpClient) {}

  // Promise approach
  get<T>(url: string): Promise<T> {
    return this.http.get(this.baseUrl + url)
      .toPromise()
      .then( response => <T>response)
      .catch(this.handlePromiseError);
  }

  // Observable approach
  post<T>(url, obj): Observable<T> {
   const body = JSON.stringify(obj),
   options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   return this.http
      .post(this.baseUrl + url, body, options)
      .pipe(
        map( this.handleData ),
        catchError( this.handleObservableError )
      );
  }

  put<T>(url, obj): Observable<T> {
    const body = JSON.stringify(obj),
    options = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
       .put(this.baseUrl + url, body, options)
       .pipe(
         map( this.handleData ),
         catchError( this.handleObservableError )
       );
   }

  delete<T>(url, obj): Observable<T> {
    return this.http
      .delete(this.baseUrl + url)
      .pipe(
        map( this.handleData ),
        catchError( this.handleObservableError )
      );
   }

  private handleData<T> (response: HttpResponse<T>) {
    const body = response;
    return body || {};
  }

  async init() {
    this.baseUrl = (await this.appSettingsService.getConfig()).apiUrl;

    if (!this.baseUrl) {
      throw new Error('baseUrl is empty');
    }
  }

  private handleObservableError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return _throw(errorMessage);
  }

  private handlePromiseError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
