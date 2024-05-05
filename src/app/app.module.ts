import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterHeaderMenuLayoutComponent } from './Layouts/footer-header-menu-layout/footer-header-menu-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LikedMoviesComponent } from './pages/liked-movies/liked-movies.component';
import { ConnectComponent } from './pages/connect/connect.component';
import { ShakerComponent } from './pages/shaker/shaker.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    HeaderComponent,
    FooterHeaderMenuLayoutComponent,
    HomeComponent,
    LikedMoviesComponent,
    ConnectComponent,
    ShakerComponent,
    FooterComponent,
    MenuComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
