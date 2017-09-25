import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliverySPage } from './delivery-s';

@NgModule({
  declarations: [
    DeliverySPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliverySPage),
  ],
  exports: [
    DeliverySPage
  ]
})
export class DeliverySPageModule {}
