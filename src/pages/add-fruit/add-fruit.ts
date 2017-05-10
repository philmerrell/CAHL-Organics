import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { minPortionValidator, maxPortionValidator } from './portion.validator';
import { ApiService } from '../../services/api.service';

/*
  Generated class for the AddFruit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-fruit',
  templateUrl: 'add-fruit.html'
})
export class AddFruitPage implements OnInit {
  fruit = {
    name: '',
    portion: null,
    provided: false,
    organic: false,
    description: '',
  };
  fruitForm: FormGroup;
  name: AbstractControl;
  portion: AbstractControl;
  provided: AbstractControl;
  organic: AbstractControl;
  description: AbstractControl;
  public produceValues = [];
  public showDescription: boolean = false;

  public portionTip = '';
  public portions = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    public fb: FormBuilder,
    private apiService: ApiService) {             
  }

  ngOnInit() {
    this.getProduceValues();
    for(let i = 1;i <= 40;i++) {
      let w = Math.floor(i/4);
      let q = i%4
      let s = '';
      if(w > 0) {
        s += w + ' ';
      }
      if(q > 0) {
          if(q == 2) {
              s += '1/2';
          } else {
            s += q + '/4';
          }
      }
      let p = {k:s, v:i*0.25};
      this.portions.push(p);
    }
    this.createForm();
  }

  ionViewDidLoad() {}

  addFruit() {
    console.log(this.fruit);
    this.viewCtrl.dismiss(this.fruit);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getProduceValues() {
    this.apiService.getProduceValues()
      .subscribe(produce => this.produceValues = produce);
  }
  
  subscribeToFormChanges() {
    this.fruitForm.valueChanges
      .subscribe(data => {
        console.log(data);
        this.fruit = {
          name: data.name,
          portion: parseFloat(data.portion),
          provided: data.provided,
          organic: data.organic,
          description: data.description
        };

        this.portionTip = '';
        for(let i = 0; i < this.produceValues.length; i++) {
          if(data.name == this.produceValues[i].name) {
            this.portionTip = 'One portion is: ' + this.produceValues[i].tip;
          }
        }

        if(data.name === 'Not Listed') {
          this.createFormWithDescription();
        } else if(data.name !== 'Not Listed' && this.showDescription){
          this.createForm();
        }
      });
  }

  createForm() {
    this.fruitForm = this.fb.group({
      'name'      : [this.fruit.name, [ Validators.required ]],
      'portion'   : [this.fruit.portion, [ Validators.required ]],
      'provided'  : [this.fruit.provided],
      'organic'   : [this.fruit.organic]
    });
    this.showDescription = false;
    this.subscribeToFormChanges();
  }

  createFormWithDescription() {
    this.fruitForm = this.fb.group({
      'name'        : [this.fruit.name, [ Validators.required ]],
      'description' : [this.fruit.description, [Validators.required]],
      'portion'     : [this.fruit.portion, [ Validators.required ]],
      'provided'    : [this.fruit.provided],
      'organic'     : [this.fruit.organic]
    });
    this.showDescription = true;
    this.subscribeToFormChanges()
  }

}
