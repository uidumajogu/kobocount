import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackAndComplaintPage } from './feedback-and-complaint';

@NgModule({
  declarations: [
    FeedbackAndComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackAndComplaintPage),
  ],
  exports: [
    FeedbackAndComplaintPage
  ]
})
export class FeedbackAndComplaintPageModule {}
