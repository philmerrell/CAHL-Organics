import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MealLoggingPage } from '../meal-logging/meal-logging';
import { LoadingController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';

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
  authChecked: boolean = false;

  constructor(private apiService: ApiService, 
              public fb: FormBuilder, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

    this.loginForm = fb.group({
      'username'  : ['', Validators.required],
      'password'  : ['', Validators.required]
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    let loader = this.presentLoading("Loading...");
    this.apiService.userIsValid()
      .subscribe(result => {
        // User has a cookie...
        loader.dismiss();
        this.authChecked = true;
        this.goToMealLoggingPage();
      },
      (error) => {
        // User is not logged in...
        loader.dismiss();
        this.authChecked = true;
      });
  }

  public onSubmit() {
    let loader = this.presentLoading("Logging in...");
    let creds = {
      username: this.username.value,
      password: this.password.value
    };
    
    this.apiService.login(creds)
      .subscribe(result => {
        if(result.status === 200) {
          this.goToMealLoggingPage();
        }
      },
      err => {
        loader.dismiss();
        this.presentToast();
      })
    // this.goToMealLoggingPage();
  }

  public goToMealLoggingPage() {
    this.navCtrl.setRoot(MealLoggingPage, {}, {animate: true, direction: 'forward'});
  }

  private presentLoading(message) {
    let loader = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });

    loader.present();
    return loader;
  }

  private presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Invalid Username or Password',
      duration: 3000
    });
    toast.present();
  }
}
