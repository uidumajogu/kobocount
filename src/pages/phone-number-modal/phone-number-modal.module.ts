import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNumberModalPage } from './phone-number-modal';

@NgModule({
  declarations: [
    PhoneNumberModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneNumberModalPage),
  ],
  exports: [
    PhoneNumberModalPage
  ]
})
export class PhoneNumberModalPageModule {}
