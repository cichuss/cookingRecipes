import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userData: any = {};
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(userData => {
      this.userData = userData;
    });
  }
  logout() {
    this.authService.logout();
  }
}
