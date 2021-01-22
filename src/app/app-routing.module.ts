import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {RegistrationComponent} from './auth/registration/registration.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth/register', pathMatch: 'full'},
  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: 'register', component: RegistrationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
