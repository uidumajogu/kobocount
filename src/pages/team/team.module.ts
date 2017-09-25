import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamPage } from './team';
import {AdminStatusPipeModule} from "../../pipes/admin-status/admin-status.module";

@NgModule({
  declarations: [
    TeamPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamPage),
    AdminStatusPipeModule
  ],
  exports: [
    TeamPage
  ]
})
export class TeamPageModule {}
