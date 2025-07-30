import { Routes } from "@angular/router";
import { OrgIDComponentComponent } from "./org-idcomponent/org-idcomponent.component";
import { ClaimInfoComponent } from "./claim-info/claim-info.component";

const routeConfig: Routes = [
    {
      path: '',
      component: OrgIDComponentComponent,
      title: 'orgID',
    },
    {
      path:'0',
      component: ClaimInfoComponent,
      title: 'claimInfo'
    }
]
export default routeConfig;
