import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';

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

  async metodoPostAxios(url, body) {
    return await axios.post(url, body);
  }

  metodoGet(url) {
    return this.http.get(url);
  }
}
