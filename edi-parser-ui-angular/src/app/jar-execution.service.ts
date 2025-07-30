import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JarExecutionService {

  private apiUrl = 'http://localhost:3000';
  userWantsToChangePaths: boolean = false;
  constructor(private http: HttpClient,private router: Router) {}
  
  checkCombo(orgID: string, claimType: string): Observable<any> {
    const body = { orgID, claimType };
    return this.http.post(`${this.apiUrl}/check-combo`, body);
  }
  runJar(source: string, destination: string, claimType: string, orgID:string): Observable<any> {
    const body = { source, destination, claimType, orgID };
    return this.http.post(`${this.apiUrl}/run-jar`, body);
  }

  removeLine(orgID: string, claimType: string): Observable<any> {
    const body = { orgID, claimType };
    return this.http.post(`${this.apiUrl}/remove-line`, body);
  }

  runJar2(orgID: string, claimType: string): Observable<any> {
    return this.checkCombo(orgID, claimType).pipe(
      switchMap(response => {
        if (response.exists) {
          if (confirm("Would you like to change the folder path?") === true) {
            return this.removeLine(orgID, claimType).pipe(
              tap(() => this.router.navigate(['/0'])),
              switchMap(() => EMPTY)
            );
          }
        }
        const body = { orgID, claimType };
        return this.http.post(`${this.apiUrl}/run-jar`, body);
      })
    );
  }
}