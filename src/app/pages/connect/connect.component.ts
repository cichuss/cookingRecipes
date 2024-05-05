import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/movie";
import {MovieService} from "../../services/movie.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent implements OnInit {
  movies: Movie[] = [];
  titles: string[] = [];
  posterUrls: string[] = [];

  constructor(
    private movieService: MovieService,
    private modal: NgbModal
  ) {
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe((res: Movie[]) => {
      this.movies = res;
      this.loadMovieData();
    });
  }

  loadMovieData() {
    for(let i=0; i<4; i++) {
      this.titles[i] = this.movies[i].title;
      if (this.movies[i].posterUrl) {
        this.movieService.getImageUrl(this.movies[i].posterUrl).subscribe(
          url => {
            this.posterUrls[i] = url;
            console.log(url);
          },
          error => console.error(error)
        );
      }
    }
  }
}
