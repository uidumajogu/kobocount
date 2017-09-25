import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BizTypeModalPage } from './biz-type-modal';

@NgModule({
  declarations: [
    BizTypeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BizTypeModalPage),
  ],
  exports: [
    BizTypeModalPage
  ]
})
export class BizTypeModalPageModule {}
