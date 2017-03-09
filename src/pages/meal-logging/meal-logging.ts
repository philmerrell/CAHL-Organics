import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AddFruitPage } from '../add-fruit/add-fruit';
import { ApiService } from '../../services/api.service';

/*
  Generated class for the MealLogging page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meal-logging',
  templateUrl: 'meal-logging.html'
})
export class MealLoggingPage {
  public fruits = [];
  public mealTypes = [];
  public meal = {
    image: '',
    items: [],
    which: 0,
    validity: 1,
    when: 1234567898,
    notes: ''
  };
  public mealForm: FormGroup;
  public type: AbstractControl;
  public notes: AbstractControl;

  constructor(
    private apiService: ApiService,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder) {

      this.mealForm = fb.group({
        'type'  : ['', Validators.required]
      });

      this.type = this.mealForm.controls['type'];
    }

  ionViewDidLoad() {
    this.getMealTypes();
  }

  private getMealTypes() {
    this.apiService.getMealTypeValues()
      .subscribe(mealTypes => this.mealTypes = mealTypes);
  }

  showAddFruitModal() {
    let modal = this.modalCtrl.create(AddFruitPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data) {
        this.fruits.push(data);
      }
    });
  }

  submitMeal() {
    let loader = this.presentLoading();
    this.meal.notes = this.notes.value;
    // this.meal.which = this.type.value;
    this.meal.which = 0;
    this.meal.items = this.fruits;

    console.log('Meal: ', this.meal);
    this.apiService.submitMeal(this.meal)
      .subscribe(response => {
        console.log('Submit meal response: ',response);
        this.presentToast();
        this.resetMeal();
        loader.dismiss();
      },
      err => {
        console.log('Submit meal error: ', err);
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Submitting meal..."
    });

    loader.present();
    return loader;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Meal was submitted successfully',
      duration: 3000
    });
    toast.present();
  }

  removeFruit(fruit) {
    let index = this.fruits.indexOf(fruit);
    this.fruits.splice(index, 1);
  }

  resetMeal() {
    this.type.setValue('');
    this.notes.setValue('');
    this.fruits = [];
  }

}
