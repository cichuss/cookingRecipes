import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {combineLatest, map, Observable, switchMap} from "rxjs";
import {Recipe} from "../models/recipe";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: Firestore, private storage: AngularFireStorage, private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  getRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, 'recipes');
    return collectionData(recipesRef, { idField: 'id' }) as Observable<Recipe[]>;
  }

  getImageUrl(url: string): Observable<string> {
    const ref = this.storage.refFromURL(url);
    return ref.getDownloadURL();
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.afs.collection('recipes').doc(id).valueChanges() as Observable<Recipe | undefined>;
  }

  getRecipeByCurrentUser(): Observable<Recipe[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user)
          return this.afs.collection('userRecipes', ref => ref.where('uid', '==', user.uid)).valueChanges();
        } else {
          return [];
        }
      }),
      switchMap((userRecipes: any[]) => {
        const recipeId = userRecipes.map(userRecipe => userRecipe.recipeId);
        return this.getRecipesByIds(recipeId);
      })
    );
  }

  private getRecipesByIds(recipeId: string[]): Observable<Recipe[]> {
    const recipeObservable: Observable<Recipe | undefined>[] = recipeId.map(recipeId => this.getRecipeById(recipeId));
    return combineLatest(recipeObservable).pipe(

      map(recipes => recipes.filter(recipe => recipe !== undefined) as Recipe[])
    );
  }

  deleteRecipeFromCurrentUser(recipeId: string): Promise<void> {
    console.log(recipeId);
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('userRecipes', ref => ref.where('uid', '==', user.uid).where('recipeId', '==', recipeId)).get();
        } else {
          return [];
        }
      }),
      switchMap(snapshot => {
        const batch = this.afs.firestore.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        return batch.commit();
      })
    ).toPromise();
  }

}
