import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCategoryModalPage } from './my-category-modal';

@NgModule({
  declarations: [
    MyCategoryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCategoryModalPage),
  ],
  exports: [
    MyCategoryModalPage
  ]
})
export class MyCategoryModalPageModule {}
