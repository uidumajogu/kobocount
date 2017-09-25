import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleInvoiceOrReceiptPage } from './sale-invoice-or-receipt';
import {TitleCasePipeModule} from "../../pipes/title-case/title-case.module";
//import {AnyToNumberPipe} from "../../pipes/any-to-number/any-to-number";

@NgModule({
  declarations: [
    SaleInvoiceOrReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleInvoiceOrReceiptPage),
    TitleCasePipeModule,
    //AnyToNumberPipe,
  ],
  exports: [
    SaleInvoiceOrReceiptPage
  ]
})
export class SaleInvoiceOrReceiptPageModule {}
