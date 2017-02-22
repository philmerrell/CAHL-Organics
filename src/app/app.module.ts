import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MealLoggingPage } from '../pages/meal-logging/meal-logging';
import { AddFruitPage } from '../pages/add-fruit/add-fruit';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MealLoggingPage,
    AddFruitPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MealLoggingPage,
    AddFruitPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiService]
})
export class AppModule {}
