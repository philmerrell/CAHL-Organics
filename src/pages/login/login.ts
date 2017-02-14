import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { MealLoggingPage } from '../meal-logging/meal-logging';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginForm = fb.group({
      'username'  : ['', Validators.required],
      'password'  : ['', Validators.required]
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    
  }

  onSubmit() {
    // TODO: Hit endpoint with creds, set cookie, redirect to meal-logging if successful
    this.presentLoading();
    setTimeout(() => {
      this.goToMealLoggingPage();
    }, 2000);
  }

  goToMealLoggingPage() {
    this.navCtrl.setRoot(MealLoggingPage, {}, {animate: true, direction: 'forward'});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Logging in...",
      dismissOnPageChange: true
    });

    loader.present();
    return loader;
  }



}
