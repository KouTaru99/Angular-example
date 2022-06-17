import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { CategoryComponent } from './Components/blocks/category/category.component'; 
import { DetailComponent } from './Components/pages/detail/detail.component';
import { CateComponent } from './Components/pages/cate/cate.component';

const routes: Routes = [
  { path: 'category', component: CateComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }