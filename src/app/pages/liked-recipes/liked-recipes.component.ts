import {Component, inject, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Performance} from "@angular/fire/performance";

@Component({
  selector: 'app-liked-recipes',
  templateUrl: './liked-recipes.component.html',
  styleUrl: './liked-recipes.component.css'
})
export class LikedRecipesComponent implements OnInit{
  private performance = inject(Performance);
  recipes: Recipe[] = [];
  title: string | undefined;
  desc: string | undefined;
  recipeId: string | undefined;
  selectedRecipeId: string | null = null;
  constructor(
    private recipeService: RecipeService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    this.recipeService.getRecipeByCurrentUser().subscribe((res: Recipe[]) => {
      this.recipes = res;
      console.log(this.recipes);
      for (let i = 0; i < this.recipes.length; i++) {
        this.loadRecipeData(i);
        console.log(this.recipes[i].posterUrl);
      }
    });

  }

  loadRecipeData(recipeNr: number){
    this.title = this.recipes[recipeNr].title;
    this.desc = this.recipes[recipeNr].description;

    if (this.recipes[recipeNr].posterUrl) {
      this.recipeService.getImageUrl(this.recipes[recipeNr].posterUrl).subscribe(url => {
        this.recipes[recipeNr].posterUrl = url;
        //console.log(url);
      }, error => console.error(error));
    }
  }

  openDeleteRecipeDialog(recipeId: string) {
    this.selectedRecipeId = recipeId;
  }
  onDocumentClick() {
    this.selectedRecipeId = null;
  }
  deleteRecipe(recipeId: string) {
    this.recipeService.deleteRecipeFromCurrentUser(recipeId)
      .then(() => {
        this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
      })
      .catch(error => {
        console.error('Error while deleting the recipe:', error);
      });
  }
}
