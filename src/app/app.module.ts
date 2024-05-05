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
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
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
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"movie-match-f7747","appId":"1:1020026463414:web:fe05276f17580b66ff7217","storageBucket":"movie-match-f7747.appspot.com","apiKey":"AIzaSyDio6Vu1R6GMTMaSiQzuMBjaLaPxmTIMQQ","authDomain":"movie-match-f7747.firebaseapp.com","messagingSenderId":"1020026463414"})),
    AngularFireStorageModule
  ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
