import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JarExecutionService } from '../jar-execution.service';
import { OrgIDService } from '../org-id.service';
import { OrgIDComponentComponent } from '../org-idcomponent/org-idcomponent.component';

@Component({
  selector: 'app-claim-info',
  standalone: true,
  imports: [FormsModule, OrgIDComponentComponent],
  templateUrl: './claim-info.component.html',
  styleUrl: './claim-info.component.css',
})
export class ClaimInfoComponent {
  source: string = '';
  destination: string = '';
  claimType: string = '';
  orgID: string = '';

  errCheck: boolean = false;
  constructor(
    private router: Router,
    private jarExecutionService: JarExecutionService,
    private orgIDService: OrgIDService
  ) {}

  ngOnInit(): void {
    this.orgIDService.currentOrgID.subscribe((orgID) => (this.orgID = orgID));
    this.orgIDService.currentClaimType.subscribe((claimType) => (this.claimType = claimType));
  }
  
  test(){
    //<button class="orgIDSubmit" (click)="test()">Submit</button>
    //<input type="file" [(ngModel)]="source" webkitdirectory directory multiple/>
    
    console.log(this.orgID);
    console.log(this.claimType);
  }


  submit() {
    if(this.source!=''&&this.destination!='')
      {
    this.jarExecutionService
      .runJar(this.source, this.destination, this.claimType, this.orgID)
      .subscribe(
        (response) => {
          this.errCheck = false;
          console.log('JAR executed successfully', response);

          alert('EDI Files have been successfully loaded into the destination folder.');
          this.router.navigate(['']);
        },
        (error) => {
          this.errCheck = true;
          console.error('Error executing JAR', error);
          alert('An error has occurred.');
        }
        
      );
    }

  }

  returnInfo() {
    console.log(this.source + ' ' + this.destination + ' ' + this.claimType);
  }


}
