import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountModalPage } from './discount-modal';

@NgModule({
  declarations: [
    DiscountModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountModalPage),
  ],
  exports: [
    DiscountModalPage
  ]
})
export class DiscountModalPageModule {}
