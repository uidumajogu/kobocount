import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";


@IonicPage()
@Component({
  selector: 'page-edit-team-member-modal',
  templateUrl: 'edit-team-member-modal.html',
})
export class EditTeamMemberModalPage {

  fullName: string;
  email: string;
  active: boolean;
  admin: boolean;
  uid: string;
  compID: string;
  userProfile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public teamProvider: TeamProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.fullName = this.navParams.get('fullName');
    this.email = this.navParams.get('email');
    this.active = this.navParams.get('active');
    this.uid = this.navParams.get('UID');
    this.admin= this.navParams.get('admin');
    this.userProfile = this.teamProvider.userP;
  }


  pwdrUser() {
  }

  dsblUser() {
    this.teamProvider.changeUserStatus(this.uid, false).then(()=> {
      this.active = false;

        let toast = this.toastCtrl.create({
          message: this.fullName+' has been disabled',
          duration: 6000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Close',
          dismissOnPageChange: true
        });
        toast.present();
    });
  }

  enblUser() {
    this.teamProvider.changeUserStatus(this.uid, true).then(()=> {
      this.active = true;

      let toast = this.toastCtrl.create({
        message: this.fullName+' has been enabled',
        duration: 6000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Close',
        dismissOnPageChange: true
      });
      toast.present();
    });
  }

  closeETModal() {
    this.compID = this.userProfile.companyId;
    this.viewCtrl.dismiss(this.compID);
  }


}
