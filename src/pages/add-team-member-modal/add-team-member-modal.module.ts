import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTeamMemberModalPage } from './add-team-member-modal';

@NgModule({
  declarations: [
    AddTeamMemberModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTeamMemberModalPage),
  ],
  exports: [
    AddTeamMemberModalPage
  ]
})
export class AddTeamMemberModalPageModule {}
