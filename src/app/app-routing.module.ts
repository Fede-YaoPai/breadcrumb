import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeChildOneComponent } from './features/home-child-one/home-child-one.component';
import { HomeChildTwoComponent } from './features/home-child-two/home-child-two.component';
import { HomeComponent } from './features/home/home.component';
import { InfoChildOneComponent } from './features/info-child-one/info-child-one.component';
import { InfoChildTwoComponent } from './features/info-child-two/info-child-two.component';
import { InfoComponent } from './features/info/info.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    data: { crumb: 'Home' },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'child-one',
        data: { crumb: 'Home Child' },
        children: [
          {
            path: '',
            component: HomeChildOneComponent,
          },
          {
            path: 'child-two',
            component: HomeChildTwoComponent,
            data: { crumb: 'Home Grandchild' }
          }
        ]
      }
    ]
  },
  {
    path: 'info',
    data: { crumb: 'Info' },
    children: [
      {
        path: '',
        component: InfoComponent
      },
      {
        path: 'child-one',
        data: { crumb: 'Info Child' },
        children: [
          {
            path: '',
            component: InfoChildOneComponent,
          },
          {
            path: 'child-two',
            component: InfoChildTwoComponent,
            data: { crumb: 'Info Grandchild' }
          }
        ]
      }
    ]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about/about.module').then(m => m.AboutModule),
    data: { crumb: 'About' }
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
