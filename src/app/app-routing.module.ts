import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {LoginComponent} from "./pages/login/login.component";
import {FooterHeaderMenuLayoutComponent} from "./Layouts/footer-header-menu-layout/footer-header-menu-layout.component";
import {HomeComponent} from "./pages/home/home.component";
import {MenuComponent} from "./components/menu/menu.component";
import {LikedMoviesComponent} from "./pages/liked-movies/liked-movies.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ShakerComponent} from "./pages/shaker/shaker.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: FooterHeaderMenuLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'liked', component: LikedMoviesComponent },
      { path: 'shake', component: ShakerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
