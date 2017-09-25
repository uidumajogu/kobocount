import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseTypeModalPage } from './expense-type-modal';

@NgModule({
  declarations: [
    ExpenseTypeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseTypeModalPage),
  ],
  exports: [
    ExpenseTypeModalPage
  ]
})
export class ExpenseTypeModalPageModule {}
