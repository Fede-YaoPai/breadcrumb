import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutChildComponent } from '../about-child/about-child.component';
import { AboutGrandchildComponent } from '../about-grandchild/about-grandchild.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { crumb: 'About' }
  },
  {
    path: 'child',
    component: AboutChildComponent,
    data: { crumb: 'About child' }
  },
  {
    path: 'grandchild',
    component: AboutGrandchildComponent,
    data: { crumb: 'About grandchild' }
  },
]

@NgModule({
  declarations: [
    AboutComponent,
    AboutChildComponent,
    AboutGrandchildComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { }
