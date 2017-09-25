import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTeamMemberModalPage } from './edit-team-member-modal';

@NgModule({
  declarations: [
    EditTeamMemberModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTeamMemberModalPage),
  ],
  exports: [
    EditTeamMemberModalPage
  ]
})
export class EditTeamMemberModalPageModule {}
