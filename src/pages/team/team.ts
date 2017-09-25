import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";


@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  companyProfile: any;
  teamMembers: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public teamProvider: TeamProvider,
              public modalCtrl: ModalController) {}

  ionViewDidLoad() {
   this.teamMembers = this.teamProvider.companyMbers;
  }


  addTeamMember() {
    let myAddTeamMemberModal = this.modalCtrl.create('AddTeamMemberModalPage');

    myAddTeamMemberModal.onDidDismiss((data) => {
      this.teamProvider.getCompanyMembers(data);
      this.teamMembers = this.teamProvider.companyMbers;
    });
    myAddTeamMemberModal.present();
  }

  editTeamMember(fName, email, active, isAdmin, key) {

    let myTeamMemberProfile = {fullName: fName, email: email, active: active, admin: isAdmin, UID: key};
    let myEditTeamMemberModal = this.modalCtrl.create('EditTeamMemberModalPage', myTeamMemberProfile);

    myEditTeamMemberModal.onDidDismiss((data) => {
      this.teamProvider.getCompanyMembers(data);
      this.teamMembers = this.teamProvider.companyMbers;
    });
    myEditTeamMemberModal.present();

  }




}
