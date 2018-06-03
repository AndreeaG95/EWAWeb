import { Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileResolver } from './user-profile/user-profile.resolver';
import { AuthGuard } from './core/auth.guard';
import {AppointmentsComponent} from './appointments/appointments.component';
import {PatientsComponent} from './patients/patients.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent,  resolve: { data: UserProfileResolver}},
  { path: 'patients', component: PatientsComponent,  resolve: { data: UserProfileResolver}},
  { path: 'appointments', component: AppointmentsComponent,  resolve: { data: UserProfileResolver}}
];
