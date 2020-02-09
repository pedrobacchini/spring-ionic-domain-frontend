import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from "../../services/domain/category.service";
import { CategoryDTO } from "../../models/category.dto";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  private categories: CategoryDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService) {

    this.categoryService.findAll()
      .subscribe(categories => this.categories = categories, error => console.log(error));
  }
}
