import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import {TransactionPaidConverterPipeModule} from "../../pipes/transaction-paid-converter/transaction-paid-converter.module";

@NgModule({
  declarations: [
    TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
    TransactionPaidConverterPipeModule
  ],
  exports: [
    TransactionsPage
  ]
})
export class TransactionsPageModule {}
