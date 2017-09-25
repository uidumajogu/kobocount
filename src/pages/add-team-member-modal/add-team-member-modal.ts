import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {AuthProvider} from "../../providers/auth/auth";
import {TeamProvider} from "../../providers/team/team";
import {AngularFireAuth} from "angularfire2/auth";


@IonicPage()
@Component({
  selector: 'page-add-team-member-modal',
  templateUrl: 'add-team-member-modal.html',
})
export class AddTeamMemberModalPage {

  public registerForm:FormGroup;
  public registerPasswordInputType: string;
  public toggleRegisterPasswordInputType: boolean;
  public registerPasswordFieldIcon: string;
  public compID: string;
  userProfile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder,
              public loadingCtrl:LoadingController, public authProvider:AuthProvider, public alertCtrl: AlertController,
              public teamProvider: TeamProvider, public viewCtrl: ViewController,private afAuth: AngularFireAuth) {
    this.registerForm = formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.userProfile = this.teamProvider.userP;
    this.registerPasswordInputType = "password";
    this.toggleRegisterPasswordInputType = false;
    this.registerPasswordFieldIcon = "eye-off";
    this.compID = this.userProfile.companyId;
  }

  showHideRegisterPassword() {
    if (this.registerPasswordFieldIcon === "eye-off") {
      this.toggleRegisterPasswordInputType = true;
      this.registerPasswordFieldIcon = "eye";
      this.registerPasswordInputType = "text";
    } else {
      this.toggleRegisterPasswordInputType = false;
      this.registerPasswordFieldIcon = "eye-off";
      this.registerPasswordInputType = "password";
    }
  }


  createTeamMember() {
    const loading = this.loadingCtrl.create();
    if (!this.registerForm.valid){
    } else {
      this.authProvider.createMember(this.registerForm.value.email, this.registerForm.value.password,
        this.registerForm.value.fullName, this.compID)
        .then( () => {
          loading.dismiss().then( () => {
            //this.viewCtrl.dismiss(this.compID);
            this.afAuth.auth.signOut().then(()=> {
              this.navCtrl.setRoot('IntroPage');
            });
          });
        }).catch( error => {
        loading.dismiss().then( () => {
          var errorMessage = error.toString();
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
    }
    loading.present();
  }

  dismissModal() {
    this.viewCtrl.dismiss(this.compID);
  }

}
