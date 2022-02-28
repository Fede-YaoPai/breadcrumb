import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { HomeChildOneComponent } from './features/home-child-one/home-child-one.component';
import { HomeChildTwoComponent } from './features/home-child-two/home-child-two.component';
import { InfoComponent } from './features/info/info.component';
import { InfoChildOneComponent } from './features/info-child-one/info-child-one.component';
import { InfoChildTwoComponent } from './features/info-child-two/info-child-two.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { AboutChildComponent } from './features/about/about-child/about-child.component';
import { AboutGrandchildComponent } from './features/about/about-grandchild/about-grandchild.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeChildOneComponent,
    HomeChildTwoComponent,
    InfoComponent,
    InfoChildOneComponent,
    InfoChildTwoComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
