import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {}

  launchSignIn (): void {
    this.navCtrl.push('SignInPage');
  }

  launchRegister () : void{
    this.navCtrl.push('RegisterPage');
  }

}
