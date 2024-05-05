import { Injectable } from '@angular/core';
import {Firestore, addDoc, collection, collectionData} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {Movie} from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: Firestore) { }

  getMovies(): Observable<Movie[]> {
    const moviesRef = collection(this.firestore, 'movies');
    return collectionData(moviesRef, { idField: 'id' }) as Observable<Movie[]>;
  }

}
