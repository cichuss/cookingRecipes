import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/movie";
import {MovieService} from "../../services/movie.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LikedMoviesService} from "../../services/liked-movies.service";

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
  posterUrl: string | undefined;
  movieId: string | undefined;

  constructor(
    private movieService: MovieService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth,
    private likedMoviesService: LikedMoviesService
  ) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((res: Movie[]) => {
      this.movies = res;
      this.loadMovieData();
    });
  }

  loadMovieData(){
    const randomNumber = getRandomNumber(0, this.movies.length-1);
    this.title = this.movies[randomNumber].title;
    this.synopsis = this.movies[randomNumber].description;
    this.movieId = this.movies[randomNumber].id;

    if (this.movies[randomNumber].posterUrl) {
      this.movieService.getImageUrl(this.movies[randomNumber].posterUrl).subscribe(url => {
        this.posterUrl = url;
        console.log(url);
      }, error => console.error(error));
    }
  }
  addDataToFirestore() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        if(this.movieId) {
        const movieId = this.movieId;
        this.likedMoviesService.addData(uid, movieId)
          .then(() => {
            console.log('Data added to Firestore');
            this.loadMovieData();
          })
          .catch(error => console.error('Error while loading to firestore', error));}
      } else {
        console.error('No logged in user');
      }
    });
  }
}
