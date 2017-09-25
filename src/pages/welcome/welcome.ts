import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import {TransactionsProvider} from "../../providers/transactions/transactions";


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  userProfile: any;
  bizProfile: any;
  profileState: boolean;
  isAdmin: boolean;
  isActive: boolean;

  constructor(private navCtrl: NavController, private teamProvider: TeamProvider, private transactionProvider: TransactionsProvider) {

  }

  ionViewDidLoad() {

    if (this.userProfile === undefined) {
      this.teamProvider.getUserProfile().then( () => {
      }).then(()=> {
        this.userProfile = this.teamProvider.userP;
      }).then(()=> {
        this.teamProvider.getCompanyMembers(this.userProfile.companyId);
        this.teamProvider.getCompanyProfile(this.userProfile.companyId).then(() => {
          this.bizProfile = this.teamProvider.companyP;
        }).then(()=> {
          this.profileState = this.bizProfile.profileComplete;
          this.isAdmin = this.userProfile.companyAdmin;
          this.isActive = this.userProfile.active;
        }).then(()=> {
          if (!this.isActive){
            this.navCtrl.setRoot('WaitingPage');
          } else {
            if (!this.profileState){
              this.navCtrl.setRoot('GetStartedPage');
            } else {
              this.navCtrl.setRoot('DashBoardPage');
            }
          }
        });
      });
    } else {
      this.userProfile = this.teamProvider.userP;
      this.bizProfile = this.teamProvider.companyP;
      this.profileState = this.bizProfile.profileComplete;
      this.isAdmin = this.userProfile.companyAdmin;
      this.isActive = this.userProfile.active;
      if (!this.isActive){
        this.navCtrl.setRoot('WaitingPage');
      } else {
        if (!this.profileState){
          this.navCtrl.setRoot('GetStartedPage');
        } else {
          this.navCtrl.setRoot('DashBoardPage');
        }
      }
    }
  }
}
