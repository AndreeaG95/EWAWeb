import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {rootRouterConfig} from './app.routes';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './core/auth.guard';
import {UserService} from './core/user.service';
import {AuthService} from './core/auth.service';
import {UserProfileResolver} from './user-profile/user-profile.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../../demo-utils/module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientsComponent } from './patients/patients.component';
import {PatientService} from './patients/patient.service';
import {NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbUserModule, NbCardModule, NbTabsetModule} from '@nebular/theme';
import {MatTabsModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    AppointmentsComponent,
    NavbarComponent,
    PatientsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CalendarModule.forRoot(),
    DemoUtilsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbSidebarModule,
    NbUserModule,
    NbCardModule,
    NbTabsetModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [AuthService, UserService, PatientService, UserProfileResolver, AuthGuard, NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
