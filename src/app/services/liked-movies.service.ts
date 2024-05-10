import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class LikedMoviesService {
  constructor(private firestore: AngularFirestore) { }

  async addData(uid: string, movieId: string): Promise<void> {
    try {
      await this.firestore.collection('userMovies').add({
        uid: uid,
        movieId: movieId
      });
      console.log('Data added to Firestore');
    } catch (error) {
      console.error('Error while loading the data to Firestore:', error);
      throw error;
    }
  }
}
