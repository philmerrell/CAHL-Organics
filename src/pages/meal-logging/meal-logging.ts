import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealLoggingPage');
  }

  showAddFruitModal() {
    let modal = this.modalCtrl.create(AddFruitPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data) {
        this.meal.push(data);
      }
    });
  }

}
