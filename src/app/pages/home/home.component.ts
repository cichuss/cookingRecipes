import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/movie";
import {MovieService} from "../../services/movie.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  movies:Movie[] = [];
  title: string | undefined;
  synopsis: string | undefined;

  constructor(
    private movieService: MovieService,
    private modal: NgbModal
  ) {
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe((res: Movie[]) => {
      this.movies = res;
      console.log(this.movies);
      this.loadMovieData();
    });


  }



  loadMovieData(){
    const randomNumber = getRandomNumber(0, this.movies.length-1);
    this.title = this.movies[randomNumber].title;
    this.synopsis = this.movies[randomNumber].description;
  }




}


