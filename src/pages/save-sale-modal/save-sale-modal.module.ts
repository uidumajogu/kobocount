import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveSaleModalPage } from './save-sale-modal';

@NgModule({
  declarations: [
    SaveSaleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SaveSaleModalPage),
  ],
  exports: [
    SaveSaleModalPage
  ]
})
export class SaveSaleModalPageModule {}
