import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/blocks/menu/menu.component';
import { SliderComponent } from './Components/blocks/slider/slider.component';
import { UserComponent } from './Components/blocks/user/user.component';
import { CategoryComponent } from './Components/blocks/category/category.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { DetailComponent } from './Components/pages/detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import { CateComponent } from './Components/pages/cate/cate.component';
import { CateDetailComponent } from './Components/pages/cate/cate-detail/cate-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SliderComponent,
    UserComponent,
    CategoryComponent,
    HomeComponent,
    DetailComponent,
    CateComponent,
    CateDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
