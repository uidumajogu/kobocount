import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignatureModalPage } from './signature-modal';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    SignatureModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SignatureModalPage),
    SignaturePadModule,
  ],
  exports: [
    SignatureModalPage
  ]
})
export class SignatureModalPageModule {}
