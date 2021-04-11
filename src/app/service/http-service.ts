import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    URL = "https://gwldx.com/evaluacion/"
  constructor(private http: HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(this.URL + 'login.php', JSON.stringify(data));
  }
}