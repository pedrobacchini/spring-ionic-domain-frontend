import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from "../../services/domain/category.service";
import { CategoryDTO } from "../../models/category.dto";

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  private categories: CategoryDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService) {

    this.categoryService.findAll()
      .subscribe(categories => this.categories = categories, () => {});
  }
}
