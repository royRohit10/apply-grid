import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { Applicants } from './applicants/applicants';
import { Jobs } from './jobs/jobs';
import { Dashboard } from './dashboard/dashboard';
import { PostJob } from './post-job/post-job';
import { Login } from './login/login';
import { Register } from './register/register';
import { LandingPage } from './landing-page/landing-page';
import { Home } from './home/home';
import { AuthGuard } from './auth-guard';
import { RedirectIfLoggedInGuard } from './redirect-if-logged-in-guard';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [

  { path: '', component: LandingPage, canActivate: [RedirectIfLoggedInGuard], pathMatch: 'full' },

  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'jobs', component: Jobs },
      { path: 'post-job', component: PostJob },
      { path: 'applicants', component: Applicants },
    ]
  },

  { path: 'login', component: Login, canActivate: [RedirectIfLoggedInGuard] },
  { path: 'register', component: Register, canActivate: [RedirectIfLoggedInGuard] },

  { path: '404', component: NotFound },
  { path: '**', redirectTo: '404' }
];
