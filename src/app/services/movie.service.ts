import { Injectable } from '@angular/core';
import {Firestore, addDoc, collection, collectionData} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: Firestore, private storage: AngularFireStorage) { }

  getMovies(): Observable<Movie[]> {
    const moviesRef = collection(this.firestore, 'movies');
    return collectionData(moviesRef, { idField: 'id' }) as Observable<Movie[]>;
  }

  getImageUrl(url: string): Observable<string> {
    const ref = this.storage.refFromURL(url);
    return ref.getDownloadURL();
  }
}
