import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgIDService } from '../org-id.service';
import { FileService } from '../file.service';
import { JarExecutionService } from '../jar-execution.service';
import { CommonModule, NgIf } from '@angular/common';
import { EMPTY } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-org-idcomponent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './org-idcomponent.component.html',
  styleUrl: './org-idcomponent.component.css',
})
export class OrgIDComponentComponent {
  orgID: string = '';
  claimType = '';
  errCheck: boolean = false;
  userWantsToChangePaths: boolean = false;
  constructor(private router: Router, private orgIDService: OrgIDService, private jarExecutionService: JarExecutionService,) {}

  getOrgID(): string {
    return this.orgID;
  }
  toClaimInfoPage() {
    this.router.navigate(['/0']);
  }
  returnID() {
    console.log(this.orgID);

    if (this.orgID != '' && this.claimType != '') {
      this.orgIDService.changeOrgID(this.orgID);
      this.orgIDService.changeClaimType(this.claimType);

      this.jarExecutionService.runJar2(this.orgID, this.claimType).pipe(
        catchError(error => {
          this.errCheck = true;
          console.error('OrgId not found, routing to info page', error);
          this.toClaimInfoPage();
          return EMPTY;
        })
      ).subscribe(
        (response) => {
          this.errCheck = false;
          console.log('JAR executed successfully', response);
          alert('EDI Files have been successfully loaded into the destination folder.');
          window.location.reload();
        }
      );
    }
    else{
      alert("Not all input fields were provided.")
    }
  }
  is835() {
    this.claimType = '835';
  }

  is837() {
    this.claimType = '837';
  }
  test(){
    //console.log(this.orgID);
    console.log(this.claimType);
  }
}
