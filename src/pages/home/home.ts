import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CategoryPage } from "../category/category";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login() {
    this.navCtrl.setRoot('CategoryPage')
  }

}
