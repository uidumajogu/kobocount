import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { TeamProvider } from '../providers/team/team';
import { Sim } from '@ionic-native/sim';
import { TransactionsProvider } from '../providers/transactions/transactions';
import {SignaturePadModule} from "angular2-signaturepad";
import {EmailComposer} from "@ionic-native/email-composer";
import { ReportsProvider } from '../providers/reports/reports';
import { DateFsProvider } from '../providers/date-fs/date-fs';
//import { ObjToArrPipe } from '../pipes/obj-to-arr/obj-to-arr';
//import { DateDifferenceInDaysPipe } from '../pipes/date-difference-in-days/date-difference-in-days';
//import { AdminStatusPipe } from '../pipes/admin-status/admin-status';
//import { TransactionPaidConverterPipe } from '../pipes/transaction-paid-converter/transaction-paid-converter';
//import { TitleCasePipe } from '../pipes/title-case/title-case';
//import { AnyToNumberPipe } from '../pipes/any-to-number/any-to-number';


export const firebaseConfig = {
  apiKey: "AIzaSyCVlGN95faVDfCE22lt0EDogW6LP181db0",
  authDomain: "kobocount.firebaseapp.com",
  databaseURL: "https://kobocount.firebaseio.com",
  projectId: "kobocount",
  storageBucket: "kobocount.appspot.com",
  messagingSenderId: "332088180234"
};


@NgModule({
  declarations: [
    MyApp,
    //ObjToArrPipe,
    //DateDifferenceInDaysPipe,
    //AdminStatusPipe,
    //TransactionPaidConverterPipe,
    //TitleCasePipe,
    //AnyToNumberPipe,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SignaturePadModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TeamProvider,
    Sim,
    TransactionsProvider,
    EmailComposer,
    ReportsProvider,
    DateFsProvider,
  ]
})
export class AppModule {}
