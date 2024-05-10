import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  avatarFile: File | null = null;
  avatarURL: string | null = null;

  constructor(private authService: AuthService, private storage: AngularFireStorage) {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.avatarFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatarURL = reader.result as string;
      };
    }
  }

  register() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (this.avatarFile) {
      const filePath = `avatars/${Date.now()}_${this.avatarFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.avatarFile);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            this.authService.signUp(this.email, this.password, url, this.username);
          });
        })
      ).subscribe();
    } else {
      this.authService.signUp(this.email, this.password, null, this.username);
    }
  }
}
