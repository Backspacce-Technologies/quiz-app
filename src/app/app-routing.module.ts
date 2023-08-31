import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './auth/auth-guard/auth-guard.guard';
import { unauthGuardGuard } from './unauth/unauth-guard.guard';




const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login.module').then(m => m.LoginModule),
    canActivate: [unauthGuardGuard]
  },
  {
    path: '',
    loadChildren: () => import('./post-auth/post-auth.module').then(m=>m.PostAuthModule),
    canActivate: [authGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [authGuardGuard,unauthGuardGuard]
})
export class AppRoutingModule { }
