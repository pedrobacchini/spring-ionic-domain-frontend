import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CityService } from "../../services/domain/city.service";
import { StateService } from "../../services/domain/state.service";
import { StateDTO } from "../../models/state.dto";
import { CityDTO } from "../../models/city.dto";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private formGroup: FormGroup;
  private states: StateDTO[];
  private cities: CityDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService:CityService,
    public stateService:StateService) {

    this.formGroup = formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type: ['1', Validators.required],
      cpfOrCnpj: ['02717049185', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', Validators.required],
      street: ['Rua Via', Validators.required],
      number: ['25', Validators.required],
      complement: ['Apto 3'],
      neighborhood: ['Copacabana'],
      cep: ['74543040', Validators.required],
      phone1: ['999795167', Validators.required],
      phone2: [null],
      phone3: [null],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required]
    });
  }

  ionViewDidLoad() {
    this.stateService.findAll()
      .subscribe((states) => {
        this.states = states;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      }, () => {})
  }

  signupClient() {
    console.log('signupClient');
  }

  updateCities() {
    const stateId = this.formGroup.value.stateId;
    this.cityService.findAll(stateId)
      .subscribe((cities) => {
        this.cities = cities;
        this.formGroup.controls.cityId.setValue(null);
      }, () => {})
  }
}
