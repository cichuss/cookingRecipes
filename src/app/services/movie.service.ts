import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {combineLatest, map, Observable, switchMap} from "rxjs";
import {Movie} from "../models/movie";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: Firestore, private storage: AngularFireStorage, private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  getMovies(): Observable<Movie[]> {
    const moviesRef = collection(this.firestore, 'movies');
    return collectionData(moviesRef, { idField: 'id' }) as Observable<Movie[]>;
  }

  getImageUrl(url: string): Observable<string> {
    const ref = this.storage.refFromURL(url);
    return ref.getDownloadURL();
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    return this.afs.collection('movies').doc(id).valueChanges() as Observable<Movie | undefined>;
  }

  getMoviesByCurrentUser(): Observable<Movie[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user)
          return this.afs.collection('userMovies', ref => ref.where('uid', '==', user.uid)).valueChanges();
        } else {
          console.log("nico")
          return [];
        }
      }),
      switchMap((userMovies: any[]) => {
        const movieIds = userMovies.map(userMovie => userMovie.movieId);
        return this.getMoviesByIds(movieIds);
      })
    );
  }

  private getMoviesByIds(movieIds: string[]): Observable<Movie[]> {
    const movieObservables: Observable<Movie | undefined>[] = movieIds.map(movieId => this.getMovieById(movieId));
    return combineLatest(movieObservables).pipe(

      map(movies => movies.filter(movie => movie !== undefined) as Movie[])
    );
  }
}
