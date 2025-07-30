import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  checkOrgID(orgID: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/check-orgid`, { orgID });
  }
}
