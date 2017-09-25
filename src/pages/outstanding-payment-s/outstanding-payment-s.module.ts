import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutstandingPaymentSPage } from './outstanding-payment-s';
import {DateDifferenceInDaysPipeModule} from "../../pipes/date-difference-in-days/date-difference-in-days.module";

@NgModule({
  declarations: [
    OutstandingPaymentSPage,
  ],
  imports: [
    IonicPageModule.forChild(OutstandingPaymentSPage),
    DateDifferenceInDaysPipeModule
  ],
  exports: [
    OutstandingPaymentSPage
  ]
})
export class OutstandingPaymentSPageModule {}
