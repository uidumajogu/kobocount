import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemPopoverPage } from './item-popover';
import {ObjToArrPipeModule} from "../../pipes/obj-to-arr/obj-to-array.module";

@NgModule({
  declarations: [
    ItemPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemPopoverPage),
    ObjToArrPipeModule
  ],
  exports: [
    ItemPopoverPage
  ]
})
export class ItemPopoverPageModule {}
