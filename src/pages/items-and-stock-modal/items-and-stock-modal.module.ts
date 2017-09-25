import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsAndStockModalPage } from './items-and-stock-modal';

@NgModule({
  declarations: [
    ItemsAndStockModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsAndStockModalPage),
  ],
  exports: [
    ItemsAndStockModalPage
  ]
})
export class ItemsAndStockModalPageModule {}
