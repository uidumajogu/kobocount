import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public registerForm:FormGroup;
  public registerPasswordInputType: string;
  public toggleRegisterPasswordInputType: boolean;
  public registerPasswordFieldIcon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController,
              public formBuilder:FormBuilder, public authProvider:AuthProvider, public alertCtrl: AlertController) {
    this.registerForm = formBuilder.group({
      fullName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.registerPasswordInputType = "password";
    this.toggleRegisterPasswordInputType = false;
    this.registerPasswordFieldIcon = "eye-off";
  }

  goToSignIn(): void {
    this.navCtrl.push('SignInPage');
  }

  register(): void {
    const loading = this.loadingCtrl.create();
    if (!this.registerForm.valid){
    } else {
      this.authProvider.createAdminAccount(this.registerForm.value.email, this.registerForm.value.password,
        this.registerForm.value.fullName, this.registerForm.value.companyName)
        .then( () => {
          loading.dismiss().then( () => {
            this.navCtrl.setRoot('GetStartedPage');
          })
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

}
