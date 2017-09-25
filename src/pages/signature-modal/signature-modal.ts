import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SignaturePad} from "angular2-signaturepad/signature-pad";


@IonicPage()
@Component({
  selector: 'page-signature-modal',
  templateUrl: 'signature-modal.html',
})
export class SignatureModalPage {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 100
  };
  public signatureImage : string;
  isDrawing: boolean = false;
  notSigned: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignatureModalPage');
  }

  drawComplete() {
    this.isDrawing = true;
  }

  drawStart() {
    this.notSigned = false;
  }

  signClear() {
    this.isDrawing = false;
    this.signaturePad.clear();
  }

  signCancel() {
    this.viewCtrl.dismiss();
  }

  signComplete() {
    if (this.isDrawing === false ) {
      this.notSigned = true;
    } else {
        this.notSigned = false;
        this.signatureImage = this.signaturePad.toDataURL();
        this.viewCtrl.dismiss(this.signatureImage);
        console.log(this.signatureImage);
    }
  }

}
