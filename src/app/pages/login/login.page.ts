import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toast: ToastController
  ) {}

  ngOnInit() {}

  async errorMessage(mensagem) {
    const toast = await this.toast.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  login(email, password) {
    if (email.value && password.value) {
      this.authService
        .signIn(email.value, password.value)
        .then((res) => {
          this.router.navigate(['home']);
        })
        .catch((error) => {
          let message = error.code;
          if (message === 'auth/user-not-found') {
            message = 'Usuário não encontrado';
          } else if (message === 'auth/wrong-password') {
            message = 'Senha incorreta';
          } else if (message === 'auth/invalid-email') {
            message = 'Email inválido';
          }

          this.errorMessage(message);
        });
    }
  }

  loginGoogle() {
    this.authService
      .googleAuth()
      .then((res) => {
        this.router.navigate(['home']);
      })
      .catch((error) => {
        let message = error.code;
        if (message === 'auth/popup-closed-by-user') {
          message = 'Login cancelado';
        }

        this.errorMessage(message);
      });
  }
}
