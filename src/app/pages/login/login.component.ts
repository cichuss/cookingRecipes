import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Performance} from "@angular/fire/performance";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private performance = inject(Performance);
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

}
