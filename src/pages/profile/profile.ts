import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientService } from "../../services/domain/client.service";
import { ClientDTO } from "../../models/client.dto";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private client: ClientDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clientService: ClientService) {
  }

  ionViewDidLoad() {
    this.clientService.getProfile()
      .subscribe((client) => {
        this.client = client;
      }, () => {
      })
  }

}
