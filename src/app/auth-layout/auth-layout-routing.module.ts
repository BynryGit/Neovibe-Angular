import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLogoutComponent } from '../auth-layout/login-logout/login-logout.component'
import { ChangePasswordComponent } from '../auth-layout/login-logout/change-password/change-password.component';
import { ResetPasswordComponent } from '../auth-layout/login-logout/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginLogoutComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Forget Password'
        }
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
