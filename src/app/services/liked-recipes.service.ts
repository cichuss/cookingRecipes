import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class LikedRecipesService {
  constructor(private firestore: AngularFirestore) { }

  async addData(uid: string, recipeId: string): Promise<void> {
    try {
      await this.firestore.collection('userRecipes').add({
        uid: uid,
        recipeId: recipeId
      });
      console.log('Data added to Firestore');
    } catch (error) {
      console.error('Error while loading the data to Firestore:', error);
      throw error;
    }
  }
}
