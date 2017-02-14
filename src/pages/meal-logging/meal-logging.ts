import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AddFruitPage } from '../add-fruit/add-fruit';

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
  meal = [];
  mealForm: FormGroup;
  type: AbstractControl;
  notes: AbstractControl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private modalCtrl: ModalController, 
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public fb: FormBuilder) {

                this.mealForm = fb.group({
                  'type'  : ['', Validators.required],
                  'notes' : ['']
                });

                this.type = this.mealForm.controls['type'];
                this.notes = this.mealForm.controls['notes'];
              }

  ionViewDidLoad() {}

  showAddFruitModal() {
    let modal = this.modalCtrl.create(AddFruitPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data) {
        this.meal.push(data);
      }
    });
  }

  submitMeal() {
    // TOOD: Submit meal to endpoint.
    this.presentLoading();
    setTimeout(() => {
      this.resetMeal();
      // TODO: reset form...
      this.presentToast();
    }, 2000);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Submitting meal...",
      duration: 2000
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

  resetMeal() {
    this.type.setValue('');
    this.notes.setValue('');
    this.meal = [];
  }

}
