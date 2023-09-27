import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL = 'https://localhost:7052';
  headers!: HttpHeaders;
  requestOptions: any;

  constructor(private httpClient: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    });
    this.requestOptions = {
      headers: this.headers,
      withCredentials: true,
    };
  }

  public post(apibaseURL: string, data: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseURL}/${apibaseURL}`, data, this.requestOptions);
  }

  public put(apibaseURL: string, data: object): Observable<any> {
    return this.httpClient
      .put<any>(`${this.baseURL}/${apibaseURL}`, data, this.requestOptions);
  }

  public get(apibaseURL: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.baseURL}/${apibaseURL}`, this.requestOptions);
  }

  public delete(apibaseURL: string) {
    return this.httpClient
      .delete(`${this.baseURL}/${apibaseURL}`, this.requestOptions);
  }
}
