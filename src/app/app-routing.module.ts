import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/app-dashboard/dashboard.component';
import {CraditCardComponent} from './components/cradit-card/cradit-card.component'
const routes: Routes = [{
  path: '',
  component: DashboardComponent,
},
{
  path: 'CraditCard',
  component: CraditCardComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {  
}
