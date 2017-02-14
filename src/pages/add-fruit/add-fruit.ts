import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the AddFruit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-fruit',
  templateUrl: 'add-fruit.html'
})
export class AddFruitPage {
  fruit = {};
  fruitForm: FormGroup;
  name: AbstractControl;
  portion: AbstractControl;
  provided: AbstractControl;
  organic: AbstractControl;


  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private viewCtrl: ViewController,
              public fb: FormBuilder) 
              {

                this.fruitForm = fb.group({
                  'name'      : ['', Validators.required],
                  'portion'   : ['', Validators.required],
                  'provided'  : [false],
                  'organic'   : [false]
                });

                this.name = this.fruitForm.controls['name'];
                this.portion = this.fruitForm.controls['portion'];
                this.provided = this.fruitForm.controls['provided'];
                this.organic = this.fruitForm.controls['organic'];
              }

  ionViewDidLoad() {}

  addFruit() {
    let fruit = { 
      name: this.name.value, 
      portion: this.portion.value, 
      provided: this.provided.value, 
      organic: this.organic.value 
    };
    console.log(fruit);
    this.viewCtrl.dismiss(fruit);
  }

}
