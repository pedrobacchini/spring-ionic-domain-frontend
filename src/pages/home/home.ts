import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredentialsDTO } from "../../models/credentials.dto";
import { AuthenticationService } from "../../services/authentication.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private credentials: CredentialsDTO = {
    email: 'pedrobacchini@outlook.com',
    password: '123'
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authenticationService: AuthenticationService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);

  }

  ionViewDidEnter() {
    this.authenticationService.refreshToken()
      .subscribe(() => {
        this.navCtrl.setRoot('CategoriesPage')
      }, () => {
      })
  }

  login() {
    this.authenticationService.authenticate(this.credentials)
      .subscribe(() => {
        this.navCtrl.setRoot('CategoriesPage')
      }, () => {
      })
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }
}
