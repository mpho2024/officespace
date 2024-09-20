import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './pages/login/login.component';
import { AvailableOfficeComponent } from './pages/available-office/available-office.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './pages/content/content.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CalendarComponent } from './pages/calendar/calendar.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    CalendarComponent,
    LoginComponent,
    AvailableOfficeComponent,
    ContentComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
