import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LikedRecipesService} from "../../services/liked-recipes.service";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  recipes: Recipe[] = [];
  title: string | undefined;
  desc: string | undefined;
  posterUrl: string | undefined;
  recipeId: string | undefined;

  constructor(
    private recipeService: RecipeService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth,
    private likedRecipesService: LikedRecipesService
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((res: Recipe[]) => {
      this.recipes = res;
      this.loadRecipeData();
    });
  }

  loadRecipeData(){
    const randomNumber = getRandomNumber(0, this.recipes.length-1);
    this.title = this.recipes[randomNumber].title;
    this.desc = this.recipes[randomNumber].description;
    this.recipeId = this.recipes[randomNumber].id;

    if (this.recipes[randomNumber].posterUrl) {
      this.recipeService.getImageUrl(this.recipes[randomNumber].posterUrl).subscribe(url => {
        this.posterUrl = url;
        console.log(url);
      }, error => console.error(error));
    }
  }
  addDataToFirestore() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        if(this.recipeId) {
        const recipeId = this.recipeId;
        this.likedRecipesService.addData(uid, recipeId)
          .then(() => {
            console.log('Data added to Firestore');
            this.loadRecipeData();
          })
          .catch(error => console.error('Error while loading to firestore', error));}
      } else {
        console.error('No logged in user');
      }
    });
  }
}
