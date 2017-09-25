import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingModalPage } from './shipping-modal';
import { AnyToNumberPipeModule } from '../../pipes/any-to-number/any-to-number.module';

@NgModule({
  declarations: [
    ShippingModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingModalPage),
    AnyToNumberPipeModule,
  ],
  exports: [
    ShippingModalPage
  ]
})
export class ShippingModalPageModule {}
