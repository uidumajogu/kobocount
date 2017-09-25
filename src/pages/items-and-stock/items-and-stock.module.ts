import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsAndStockPage } from './items-and-stock';
import {AnyToNumberPipeModule} from "../../pipes/any-to-number/any-to-number.module";
import {ObjToArrPipeModule} from "../../pipes/obj-to-arr/obj-to-array.module";

@NgModule({
  declarations: [
    ItemsAndStockPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsAndStockPage),
    AnyToNumberPipeModule,
    ObjToArrPipeModule
  ],
  exports: [
    ItemsAndStockPage
  ]
})
export class ItemsAndStockPageModule {}
