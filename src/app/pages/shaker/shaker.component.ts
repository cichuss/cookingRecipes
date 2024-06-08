import {Component, inject, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Performance} from "@angular/fire/performance";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
@Component({
  selector: 'app-shaker',
  templateUrl: './shaker.component.html',
  styleUrl: './shaker.component.css'
})

export class ShakerComponent implements OnInit{
  private performance = inject(Performance);
  recipes:Recipe[] = [];
  title: string | undefined;
  synopsis: string | undefined;
  posterUrl: string | undefined;

  constructor(
    private recipeService: RecipeService,
    private modal: NgbModal
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
    this.synopsis = this.recipes[randomNumber].description;

    if (this.recipes[randomNumber].posterUrl) {
      this.recipeService.getImageUrl(this.recipes[randomNumber].posterUrl).subscribe(url => {
        this.posterUrl = url;
        console.log(url);
      }, error => console.error(error));
    }
  }
}
