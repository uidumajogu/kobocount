import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomeStatementPage } from './income-statement';

@NgModule({
  declarations: [
    IncomeStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomeStatementPage),
  ],
  exports: [
    IncomeStatementPage
  ]
})
export class IncomeStatementPageModule {}
