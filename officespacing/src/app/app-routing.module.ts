import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';

import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';
import { AvailableOfficeComponent } from './pages/available-office/available-office.component';
import { ContentComponent } from './pages/content/content.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'register',component:RegisterComponent},
  {path:'calendar',component:CalendarComponent},
  {path:'login',component:LoginComponent},
  {path:'availoffice',component:AvailableOfficeComponent},
  {path:'content',component:ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
