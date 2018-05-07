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

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, UserService, UserProfileResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
