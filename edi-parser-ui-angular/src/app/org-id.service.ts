import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgIDService {
  private orgIDSource = new BehaviorSubject<string>('');
  currentOrgID = this.orgIDSource.asObservable();

  private claimTypeSource = new BehaviorSubject<string>('');
  currentClaimType = this.claimTypeSource.asObservable();

  private userWantsToChangePathsSource = new BehaviorSubject<boolean>(false);
  CurrentuserWantsToChangePaths = this.userWantsToChangePathsSource.asObservable();

  constructor() {}

  changeOrgID(orgID: string) {
    this.orgIDSource.next(orgID);
  }

  changeClaimType(claimType: string) {
    this.claimTypeSource.next(claimType);
  }

  changeuserWantsToChangePaths(userWantsToChangePaths: boolean) {
    this.userWantsToChangePathsSource.next(userWantsToChangePaths);
  }
}
