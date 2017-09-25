import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaidSaleModalPage } from './paid-sale-modal';

@NgModule({
  declarations: [
    PaidSaleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PaidSaleModalPage),
  ],
  exports: [
    PaidSaleModalPage
  ]
})
export class PaidSaleModalPageModule {}
