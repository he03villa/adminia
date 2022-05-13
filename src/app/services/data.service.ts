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
    return this.http.post(url, body);
  }

  metodoGet(url) {
    return this.http.get(url);
  }
}
