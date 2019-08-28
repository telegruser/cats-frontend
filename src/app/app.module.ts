import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppRoutingModule } from "./app-routing.module";
import { CatComponent } from './cat/cat.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from './material.module';
import { AuthComponent } from './auth/auth.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { CatsComponent } from './cats/cats.component';
import { AppService } from './app.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './api.service';
import { AuthGuard } from './app.guard';
import { RegisterComponent } from './register/register.component';
import { UnAuthGuard } from './app.unauth.guard';

@NgModule({
  declarations: [
    AppComponent,
    // ShowDataComponent,
    PagenotfoundComponent,
    CatComponent,
    // AuthenticatedComponent,
    // HomeComponent,
    AuthComponent,
    HomeComponent,
    CatsComponent,
    NavbarComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // MatButtonModule,
    // MatDatepickerModule,
    // MatDatepicker,
    // MatInputModule,
    // MatInput,
    // MatSuffix,
    MaterialModule,
    // MatRadioGroup,
    // MatRadioButton
    // OAuthModule.forRoot(),
  ],
  providers: [ CookieService, AppService, ApiService, AuthGuard, UnAuthGuard ],
  // bootstrap: [],
  // providers: [AuthGuard, OktaAuthWrapper],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
