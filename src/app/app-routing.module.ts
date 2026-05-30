import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  // },
  // {
  //   path: 'reports',
  //   loadChildren: () => import('./pages/reports/reports.module').then((m) => m.ReportsPageModule),
  // },
  // {
  //   path: 'vehicles',
  //   loadChildren: () => import('./pages/vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
  // },
  // {
  //   path: 'alerts',
  //   loadChildren: () => import('./pages/alerts/alerts.module').then((m) => m.AlertsPageModule),
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  // },
  // {
  //   path: 'sign-up',
  //   loadChildren: () => import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
