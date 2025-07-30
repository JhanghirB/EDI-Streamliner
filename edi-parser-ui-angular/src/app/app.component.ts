import { Component, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { OrgIDComponentComponent } from './org-idcomponent/org-idcomponent.component';
import { ClaimInfoComponent } from './claim-info/claim-info.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, OrgIDComponentComponent, ClaimInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'edi-parser-ui-angular';

  orgID:string = '';
  source = '';
  destination = '';
  claimType = '';
  metadata = '';

  @ViewChild(OrgIDComponentComponent) orgIDComponent!: OrgIDComponentComponent;

 
  
  returnMetaData() 
  {
    this.metadata = this.orgID + "-" + this.claimType + "-" + this.source + "-" + this.destination;
    console.log(this.metadata);
  }
  // call jar file.

}
