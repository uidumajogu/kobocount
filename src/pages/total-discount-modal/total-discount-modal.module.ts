import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalDiscountModalPage } from './total-discount-modal';
import { AnyToNumberPipeModule } from '../../pipes/any-to-number/any-to-number.module';


@NgModule({
  declarations: [
    TotalDiscountModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TotalDiscountModalPage),
    AnyToNumberPipeModule,
  ],
  exports: [
    TotalDiscountModalPage
  ]
})
export class TotalDiscountModalPageModule {}
