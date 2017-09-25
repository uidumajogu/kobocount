import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  homeMenu: Array<{title: string, page: any, icon: any}>;
  transactionMenu: Array<{title: string, page: any, icon: any}>;
  reportMenu: Array<{title: string, page: any, icon: any}>;
  settingsMenu: Array<{title: string, page: any, icon: any}>;


  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
              private screenOrientation: ScreenOrientation, private afAuth: AngularFireAuth) {

    const authListener = afAuth.authState.subscribe( user => {
      if (user){
        this.rootPage = 'WelcomePage';
        authListener.unsubscribe();
      } else {
        this.rootPage = 'IntroPage';
        authListener.unsubscribe();
      }
    });


    this.homeMenu = [
      { title: 'Overview', page:'DashBoardPage', icon:'home' },
      { title: 'FeedBack & Complaint', page:'FeedbackAndComplaintPage', icon:'information-circle' }
    ];

    this.transactionMenu = [
      { title: 'Add Sale', page:'SalesPage', icon:'add-circle' },
      { title: 'Add Expense', page:'ExpensePage', icon:'add-circle' },
    ];

    this.reportMenu = [
      { title: 'All Transactions', page:'TransactionsPage', icon:'paper' },
      { title: 'Goods or Service', page:'ItemsAndStockPage', icon:'basket' },
      { title: 'List of Customers', page:'CustomerListPage', icon:'contacts' },
      { title: 'Delivery(s)', page:'DeliverySPage', icon:'cube' },
      { title: 'Outstanding Payment(s)', page:'OutstandingPaymentSPage', icon:'folder-open' },
      { title: 'Mini Statement', page:'IncomeStatementPage', icon:'copy' },
    ];

    this.settingsMenu = [
      { title: 'Add Team Member', page:'TeamPage', icon:'person-add' },
      { title: 'Edit Profile', page:'ProfilePage', icon:'options' }
    ];




    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      splashScreen.hide();
      statusBar.backgroundColorByHexString('#03a9f4');
    });

    window.addEventListener('orientationchange', () => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (typeof page === 'string') {
      this.nav.setRoot(page);
    }else{
    this.nav.setRoot(page.page);
    }

  }

  logout() {
    this.afAuth.auth.signOut().then(()=> {
      this.nav.setRoot('IntroPage');
    });
  }


}

