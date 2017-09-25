import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddItemModalPage } from './add-item-modal';

@NgModule({
  declarations: [
    AddItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddItemModalPage),
  ],
  exports: [
    AddItemModalPage
  ]
})
export class AddItemModalPageModule {}
