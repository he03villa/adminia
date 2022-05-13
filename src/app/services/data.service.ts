import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  metodoPost(url, body) {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if (user) {
      httpOptions.headers = httpOptions.headers.append('x-api-key', user.token);
    }
    return this.http.post(url, body, httpOptions);
  }

  metodoGet(url) {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if (user) {
      httpOptions.headers.append('x-api-key', user.token);
      httpOptions.headers = httpOptions.headers.append('x-api-key', user.token);
    }
    return this.http.get(url, httpOptions);
  }
}
