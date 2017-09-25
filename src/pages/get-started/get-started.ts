import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";


@IonicPage()
@Component({
  selector: 'page-get-started',
  templateUrl: 'get-started.html',
})
export class GetStartedPage {
  @ViewChild(Slides) slides: Slides;
  bTypeSelected: string = "";
  otherData: string = "";
  companyProfile:any;
  businessAddressQ: string = "";
  businessAddress = {Street:"",City:"",State:"",Country:""};
  street: string = "";
  streetSplit = [];
  street1: string = "";
  street2: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  phoneNumber: string = "";
  currentSlideIndex: number;
  slidesHeight: string = "";
  userProfile: any;

  constructor(private navCtrl: NavController,private alertCtrl: AlertController, private teamProvider:TeamProvider,
              private modalCtrl: ModalController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    this.businessAddressQ = "Tap to enter Your Business Address";
    this.userProfile = this.teamProvider.userP;
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  previousSlide(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }


  othersPrompt() {
  let alert = this.alertCtrl.create({
    // title: 'Type of Business',
    message: 'Enter your type of Business?',
    inputs: [
      {
        name: 'bType',
        placeholder: 'Type of Business'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        text: 'Submit',
        handler: data => {
          this.bTypeSelected = data.bType;

        }
      }
    ]
  });
  alert.present();
}

  openAddressModal() {
    this.streetSplit = this.street.split('~');
    this.street1 = this.streetSplit[0];
    this.street2 = this.streetSplit[1];

    let obj = {Street1: this.street1, Street2: this.street2, City: this.city, State: this.state, Country: this.country};
    let myAddressModal = this.modalCtrl.create('AddressModalPage',obj);
    myAddressModal.onDidDismiss((data) => {
      if (data) {
        this.businessAddress = data;
        this.street = data.Street;
        this.city = data.City;
        this.state = data.State;
        this.country = data.Country;
      }
    });
    myAddressModal.present();
  }

  openBizTypeModal() {
    let myBizTypeModal = this.modalCtrl.create('BizTypeModalPage');
      myBizTypeModal.onDidDismiss((data) => {
          if (data === undefined) {
            this.bTypeSelected = "";
          }else {
            if (data === "Not in the list") {
              this.othersPrompt();
            } else {
              this.bTypeSelected = data;
            }
          }
      });
    myBizTypeModal.present();
  }

  openPhoneNumberModal(){
    let pNum = {PhoneNumber: this.phoneNumber};
    let myPhoneNumberModal = this.modalCtrl.create('PhoneNumberModalPage',pNum);
    myPhoneNumberModal.onDidDismiss((data) => {
      if (data !="") {
        this.phoneNumber = data;
        this.nextSlide();
      }else{
        this.phoneNumber = data;
      }
    });
    myPhoneNumberModal.present();
  }

  goToSlide1() {
    this.openBizTypeModal();
    // this.slides.lockSwipes(false);
    // this.slides.slideTo(this.currentSlideIndex-3, 500);
    // this.slides.lockSwipes(true);
  }

  goToSlide2() {
    this.openAddressModal();
    // this.slides.lockSwipes(false);
    // this.slides.slideTo(this.currentSlideIndex-2, 500);
    // this.slides.lockSwipes(true);
  }

  goToSlide3() {
    this.openPhoneNumberModal();
    // this.slides.lockSwipes(false);
    // this.slides.slideTo(this.currentSlideIndex-1, 500);
    // this.slides.lockSwipes(true);
  }

  slideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
    if (this.slides.isEnd()===true) {
      this.slidesHeight = "auto";
    }else{
      this.slidesHeight = "";
    }

    if (this.currentSlideIndex === 1) {
      if (this.bTypeSelected === "") {
        this.openBizTypeModal();
      }
    }

    if (this.currentSlideIndex === 2) {
      if (this.street1=== "") {
        this.openAddressModal();
      }
    }

    if (this.currentSlideIndex === 3) {
      if (this.phoneNumber === "") {
        this.openPhoneNumberModal();
      }
    }

  }

  goToDash() {
    this.updateCompanyProfile();
  }


  updateCompanyProfile(){
    this.teamProvider.updateCompanyProfile(this.bTypeSelected, this.phoneNumber, this.street, this.city, this.state, this.country).then(()=> {
      this.teamProvider.getUserProfile().then( () => {
      }).then(()=> {
        this.userProfile = this.teamProvider.userP;
      }).then(()=> {
        this.teamProvider.getCompanyProfile(this.userProfile.companyId).then(() => {
          this.companyProfile = this.teamProvider.companyP;
        }).then(()=> {
          this.navCtrl.setRoot('DashBoardPage');
        });
      });
    }).catch((error)=> {
      console.log(error);
    });
  }
}




