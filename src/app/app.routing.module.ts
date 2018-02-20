import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent, AuthGuard } from './core';
import { PageNotFoundComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule',
    data: { title: 'Admin' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Page Not Found' }
  }
];

export const appRouterComponents = [AppComponent, PageNotFoundComponent];

const extraOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  // enableTracing: true
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

