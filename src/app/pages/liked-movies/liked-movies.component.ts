import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/movie";
import {MovieService} from "../../services/movie.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-liked-movies',
  templateUrl: './liked-movies.component.html',
  styleUrl: './liked-movies.component.css'
})
export class LikedMoviesComponent implements OnInit{
  movies:Movie[] = [];
  title: string | undefined;
  synopsis: string | undefined;


  constructor(
    private movieService: MovieService,
    private modal: NgbModal,
  ) {}

  ngOnInit() {
    this.movieService.getMoviesByCurrentUser().subscribe((res: Movie[]) => {
      this.movies = res;
      console.log(this.movies);
      for (let i = 0; i < this.movies.length; i++) {
        this.loadMovieData(i);
        console.log(this.movies[i].posterUrl);
      }
    });

  }

  loadMovieData(movieNr: number){
    this.title = this.movies[movieNr].title;
    this.synopsis = this.movies[movieNr].description;

    if (this.movies[movieNr].posterUrl) {
      this.movieService.getImageUrl(this.movies[movieNr].posterUrl).subscribe(url => {
        this.movies[movieNr].posterUrl = url;
        //console.log(url);
      }, error => console.error(error));
    }
  }
}
