import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import {TeamProvider} from "../../providers/team/team";


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  profileState: boolean;
  loginForm:FormGroup;
  loading:Loading;
  loginPasswordInputType: string;
  loginPasswordFieldIcon: string;
  toggleLoginPasswordInputType: boolean;
  userProfile: any;
  companyProfile: any;
  isAdmin: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl:LoadingController, public formBuilder:FormBuilder,
              public authProvider:AuthProvider, public teamProvider:TeamProvider, public alertCtrl: AlertController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  ionViewDidLoad() {
    this.loginPasswordInputType = "password";
    this.toggleLoginPasswordInputType = false;
    this.loginPasswordFieldIcon = "eye-off";
  }


  signInUser(): void {
    const loading = this.loadingCtrl.create();
    loading.present();
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( () => {
          this.navCtrl.setRoot('WelcomePage');
          loading.dismiss();
          // this.teamProvider.getUserProfile().then( userProfile => {
          //   this.userProfile = userProfile;
          //   this.isAdmin = userProfile.companyAdmin;
          // }).then(()=> {
          //   this.teamProvider.getCompanyProfile(this.userProfile.companyId)
          //     .then( companyProfile => {
          //       this.companyProfile = companyProfile;
          //       this.profileState = companyProfile.profileComplete;
          //     }).then(()=> {
          //     if (!this.isAdmin){
          //       this.navCtrl.setRoot('WaitingPage');
          //     } else {
          //       if (!this.profileState){
          //         this.navCtrl.setRoot('GetStartedPage');
          //       } else {
          //         this.navCtrl.setRoot('DashBoardPage');
          //       }
          //     }
          //   }).then(()=> {
          //     loading.dismiss();
          //   });
          // });
        }).catch(error => {
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

  showHideLoginPassword() {
    if (this.loginPasswordFieldIcon === "eye-off") {
      this.toggleLoginPasswordInputType = true;
      this.loginPasswordFieldIcon = "eye";
      this.loginPasswordInputType = "text";
    } else {
      this.toggleLoginPasswordInputType = false;
      this.loginPasswordFieldIcon = "eye-off";
      this.loginPasswordInputType = "password";
    }
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  goToRegister(): void {
    this.navCtrl.push('RegisterPage');
  }


}
