import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavParams} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import {DateFsProvider} from "../../providers/date-fs/date-fs";
import {TransactionsProvider} from "../../providers/transactions/transactions";
import {ReportsProvider} from "../../providers/reports/reports";


@IonicPage()
@Component({
  selector: 'page-income-statement',
  templateUrl: 'income-statement.html',
})
export class IncomeStatementPage {

  private bizProfile: any;
  private sYbtn: boolean = true;
  private sMbtn: boolean = false;
  private sWbtn: boolean = false;
  private sDbtn: boolean = false;
  private userProfile: any;
  private dDate: any;
  private dYear: any;
  private dWeek: any;
  private dYearMonth: any;
  private dMonth: any;
  private dDay: any;
  private yDescription: any;
  private mDescription: any;
  private wDescription: any;
  private dDescription: any;
  private dDayStr: any;
  private dMonthStr: any;
  private dWeekStr: any;
  private dYearStr: any;
  private isAdmin: boolean;
  private profileState: boolean;
  private expenseTxn: any;
  private saleTxn: any;
  private bizItems: any;
  private saleStmt: Array<{category: any, totalAmount: any}>;
  private expStmt: Array<{category: any, totalAmount: any}>;
  private saleDiscount: number;
  private saleVAT: number;
  private saleTotal: number;
  private saleSubtotal: number;
  private netIncome: number;
  private expCategories: any;
  private expenseTotal: number;
  private dFwdBtn: boolean;
  private periodDescription: any;
  private saleShipping: any;
  private miniStmt: boolean;
  private cashRpt: boolean;
  private reportType: string;
  private cashSale: number;
  private POSSale: number;
  private transferSale: number;
  private totalCashRpt: number = 0;


  constructor(private teamProvider: TeamProvider, private loadingCtrl: LoadingController,
              private navParams: NavParams, private dfs: DateFsProvider, private transactionProvider: TransactionsProvider,
              private reportsProvider: ReportsProvider) {
  }

  ionViewDidLoad() {

    this.miniStmt = true;
    this.cashRpt = false;
    this.reportType = "Mini Statement";

    this.reportsProvider.getItems().subscribe( data => {
      this.bizItems = data;

      this.reportsProvider.getExpenseCategories().subscribe( data => {
        this.expCategories = data;

        this.saleStmt = [{category: "", totalAmount: 0},];
        this.expStmt = [{category: "", totalAmount: 0},];

        if (this.userProfile === undefined) {
          this.teamProvider.getUserProfile().then( () => {
          }).then(()=> {
            this.userProfile = this.teamProvider.userP;
          }).then(()=> {
            this.teamProvider.getCompanyProfile(this.userProfile.companyId).then(() => {
              this.bizProfile = this.teamProvider.companyP;
            }).then(()=> {
              this.profileState = this.bizProfile.profileComplete;
              this.isAdmin = this.userProfile.companyAdmin;
            }).then(()=> {
              this.pagePreload();
            });
          });
        } else {
          this.userProfile = this.teamProvider.userP;
          this.bizProfile = this.teamProvider.companyP;
          this.profileState = this.bizProfile.profileComplete;
          this.isAdmin = this.userProfile.companyAdmin;
          this.pagePreload();
        }
      });
    });
  }

  pagePreload() {

    if (this.navParams.get('CID')) {
      this.initializeVariables();
      if (this.navParams.get('qPeriod') === "Year") {
        this.dYearStr = this.navParams.get('pString');
        this.dYear = this.dfs.yearSlct(this.dYearStr);
        this.yDescription = this.navParams.get('dDescription');
        this.aFwdBtn();
        this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
      }

      if (this.navParams.get('qPeriod') === "YearMonth") {
        this.dMonthStr = this.navParams.get('pString');
        this.mDescription = this.navParams.get('dDescription');
        this.dMonth = this.dfs.monthSlct(this.dMonthStr);
        this.dYearMonth = this.dfs.yearMonthSlct(this.dMonthStr);
        this.aFwdBtn();
        this.mBtn(this.userProfile.companyId, 'YearMonth', this.dYearMonth);
      }

      if (this.navParams.get('qPeriod') === "Week") {
        this.dWeekStr = this.navParams.get('pString');
        this.wDescription = this.navParams.get('dDescription');
        this.dWeek = this.dfs.weekSlct(this.dWeekStr);
        this.aFwdBtn();
        this.wBtn(this.userProfile.companyId, 'Week', this.dWeek);
      }

      if (this.navParams.get('qPeriod') === "Date") {
        this.dDayStr = this.navParams.get('pString');
        this.dDescription = this.navParams.get('dDescription');
        this.dDate = this.dfs.daySlct(this.dDayStr);
        this.aFwdBtn();
        this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
      }

    } else {
      this.initializeVariables();
      //this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
      this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
    }
  }


  initializeVariables(){
    this.dYear = this.dfs.yearNowFS;
    this.dDate = this.dfs.dateNowFS;
    this.dWeek = this.dfs.weekNowFS;
    this.dMonth = this.dfs.monthNowFS;
    this.dYearMonth = this.dfs.yearMonthNowFS;
    this.dDay = this.dfs.dayNowFS;

    this.dDayStr = this.dfs.dayNowSFS;
    this.dMonthStr = this.dfs.dayNowSFS;
    this.dWeekStr = this.dfs.dayNowSFS;
    this.dYearStr = this.dfs.dayNowSFS;

    this.yDescription = this.dfs.dateYear(this.dYearStr);
    this.mDescription = this.dfs.dateMonthYear(this.dMonthStr);
    this.wDescription = this.dfs.dateWeekRange(this.dWeekStr);
    this.dDescription = this.dfs.dateFullString(this.dDayStr);
  }


  yBtn(ID, YS, CY) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Generating '+this.reportType+'...'
    });
    loading.present();

    this.sYbtn = true;
    this.sMbtn = false;
    this.sWbtn = false;
    this.sDbtn = false;
    this.expStmt.length = 0;
    this.saleStmt.length = 0;
    this.periodDescription = this.yDescription;

    this.transactionProvider.getExpenseTxns(ID, YS, CY).subscribe( expData => {
      this.expenseTxn = expData;

      for (let cat of this.expCategories) {

        var expCat = cat.expenseType;
        var expCatTotal = 0;
        for (let exp of this.expenseTxn) {
          for (let item of exp.Items) {
            if (item.description === expCat) {
              expCatTotal = expCatTotal + (item.unitPrice * item.quantity);
            }
          }
        }

        if (expCatTotal != 0) {
          if (this.expStmt) {
            this.expStmt.push({category: expCat, totalAmount: expCatTotal},)
          } else {
            this.expStmt = [{category: expCat, totalAmount: expCatTotal},]
          }
        }
      }


      this.transactionProvider.getSalesTxns(ID, YS, CY).subscribe( saleData => {
        this.saleTxn = saleData;



        var subTotal = 0;
        var globalDiscount = 0;
        var saleVat = 0;
        var saleAmount = 0;
        var saleShipping = 0;
        var cashAmt = 0;
        var POSAmt = 0;
        var trfAmt = 0;

        for (let sale of this.saleTxn) {
          subTotal = subTotal + +sale.SubTotal;
          globalDiscount = globalDiscount + +sale.GlobalDiscount;
          saleVat = saleVat + +sale.VAT;
          saleShipping = saleShipping + +sale.ShippingFee;
          saleAmount = saleAmount + +sale.TotalAmount;

          for (let pymt of sale.payments) {
            if (pymt.pMode === "Cash") {
              cashAmt = cashAmt + +pymt.pAmount;
            }
            if (pymt.pMode === "POS") {
              POSAmt = POSAmt + +pymt.pAmount;
            }
            if (pymt.pMode === "Transfer") {
              trfAmt = trfAmt + +pymt.pAmount;
            }
          }
        }

        for (let cat of this.bizItems) {
          var itemCat = cat.$key;
          var itemCatTotal = 0;

          for (let sale of this.saleTxn) {
            for (let item of sale.Items) {
              if (item.itemCategory === itemCat) {
                itemCatTotal = itemCatTotal + (+item.unitPrice * +item.quantity);
              }
            }
          }

          if (itemCatTotal != 0) {
            if (this.saleStmt) {
              this.saleStmt.push({category: itemCat, totalAmount: itemCatTotal},);
            } else {
              this.saleStmt = [{category: itemCat, totalAmount: itemCatTotal},];
            }
          }
        }


        var expTotalAmt = 0;
        for (let exp of this.expStmt) {
          expTotalAmt = expTotalAmt + +exp.totalAmount;
        }
        this.expenseTotal = expTotalAmt;


        var saleTotalAmt = 0;
        for (let item of this.saleStmt) {
          saleTotalAmt = saleTotalAmt + +item.totalAmount;
        }
        this.saleDiscount = (saleTotalAmt - subTotal) + +globalDiscount;
        this.saleVAT = saleVat;
        this.saleShipping = saleShipping;
        this.saleSubtotal = saleTotalAmt;
        this.saleTotal = saleTotalAmt - this.saleDiscount + this.saleShipping;
        this.netIncome = this.saleTotal - this.expenseTotal;

        this.cashSale = cashAmt;
        this.POSSale = POSAmt;
        this.transferSale = trfAmt;
        this.totalCashRpt = this.cashSale + this.POSSale + this.transferSale;

        loading.dismiss();
      });
    });
  }


  mBtn(ID, YMS, CYM) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Generating '+this.reportType+'...'
    });
    loading.present();

    this.sYbtn = false;
    this.sMbtn = true;
    this.sWbtn = false;
    this.sDbtn = false;
    this.expStmt.length = 0;
    this.saleStmt.length = 0;
    this.periodDescription = this.mDescription;

    this.transactionProvider.getExpenseTxns(ID, YMS, CYM).subscribe( expData => {
      this.expenseTxn = expData;

      for (let cat of this.expCategories) {

        var expCat = cat.expenseType;
        var expCatTotal = 0;
        for (let exp of this.expenseTxn) {
          for (let item of exp.Items) {
            if (item.description === expCat) {
              expCatTotal = expCatTotal + (item.unitPrice * item.quantity);
            }
          }
        }

        if (expCatTotal != 0) {
          if (this.expStmt) {
            this.expStmt.push({category: expCat, totalAmount: expCatTotal},)
          } else {
            this.expStmt = [{category: expCat, totalAmount: expCatTotal},]
          }
        }
      }


      this.transactionProvider.getSalesTxns(ID, YMS, CYM).subscribe( saleData => {
        this.saleTxn = saleData;

        var subTotal = 0;
        var globalDiscount = 0;
        var saleVat = 0;
        var saleAmount = 0;
        var saleShipping = 0;
        var cashAmt = 0;
        var POSAmt = 0;
        var trfAmt = 0;

        for (let sale of this.saleTxn) {
          subTotal = subTotal + +sale.SubTotal;
          globalDiscount = globalDiscount + +sale.GlobalDiscount;
          saleVat = saleVat + +sale.VAT;
          saleShipping = saleShipping + +sale.ShippingFee;
          saleAmount = saleAmount + +sale.TotalAmount;

            for (let pymt of sale.payments) {
              if (pymt.pMode === "Cash") {
                cashAmt = cashAmt + +pymt.pAmount;
              }
              if (pymt.pMode === "POS") {
                POSAmt = POSAmt + +pymt.pAmount;
              }
              if (pymt.pMode === "Transfer") {
                trfAmt = trfAmt + +pymt.pAmount;
              }
            }
        }


        for (let cat of this.bizItems) {
          var itemCat = cat.$key;
          var itemCatTotal = 0;

          for (let sale of this.saleTxn) {
            for (let item of sale.Items) {
              if (item.itemCategory === itemCat) {
                itemCatTotal = itemCatTotal + (+item.unitPrice * +item.quantity);
              }
            }
          }

          if (itemCatTotal != 0) {
            if (this.saleStmt) {
              this.saleStmt.push({category: itemCat, totalAmount: itemCatTotal},);
            } else {
              this.saleStmt = [{category: itemCat, totalAmount: itemCatTotal},];
            }
          }
        }


        var expTotalAmt = 0;
        for (let exp of this.expStmt) {
          expTotalAmt = expTotalAmt + +exp.totalAmount;
        }
        this.expenseTotal = expTotalAmt;


        var saleTotalAmt = 0;
        for (let item of this.saleStmt) {
          saleTotalAmt = saleTotalAmt + +item.totalAmount;
        }
        this.saleDiscount = (saleTotalAmt - subTotal) + +globalDiscount;
        this.saleVAT = saleVat;
        this.saleShipping = saleShipping;
        this.saleSubtotal = saleTotalAmt;
        this.saleTotal = saleTotalAmt - this.saleDiscount + this.saleShipping;
        this.netIncome = this.saleTotal - this.expenseTotal;

        this.cashSale = cashAmt;
        this.POSSale = POSAmt;
        this.transferSale = trfAmt;
        this.totalCashRpt = this.cashSale + this.POSSale + this.transferSale;

        loading.dismiss();
      });
    });
  }


  wBtn(ID, WS, CW) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Generating '+this.reportType+'...'
    });
    loading.present();

    this.sYbtn = false;
    this.sMbtn = false;
    this.sWbtn = true;
    this.sDbtn = false;
    this.expStmt.length = 0;
    this.saleStmt.length = 0;
    this.periodDescription = this.wDescription;

    this.transactionProvider.getExpenseTxns(ID, WS, CW).subscribe( expData => {
      this.expenseTxn = expData;

      for (let cat of this.expCategories) {

        var expCat = cat.expenseType;
        var expCatTotal = 0;
        for (let exp of this.expenseTxn) {
          for (let item of exp.Items) {
            if (item.description === expCat) {
              expCatTotal = expCatTotal + (item.unitPrice * item.quantity);
            }
          }
        }

        if (expCatTotal != 0) {
          if (this.expStmt) {
            this.expStmt.push({category: expCat, totalAmount: expCatTotal},);
          } else {
            this.expStmt = [{category: expCat, totalAmount: expCatTotal},];
          }
        }
      }


      this.transactionProvider.getSalesTxns(ID, WS, CW).subscribe( saleData => {
        this.saleTxn = saleData;

        var subTotal = 0;
        var globalDiscount = 0;
        var saleVat = 0;
        var saleAmount = 0;
        var saleShipping = 0;
        var cashAmt = 0;
        var POSAmt = 0;
        var trfAmt = 0;

        for (let sale of this.saleTxn) {
          subTotal = subTotal + +sale.SubTotal;
          globalDiscount = globalDiscount + +sale.GlobalDiscount;
          saleVat = saleVat + +sale.VAT;
          saleShipping = saleShipping + +sale.ShippingFee;
          saleAmount = saleAmount + +sale.TotalAmount;

          for (let pymt of sale.payments) {
            if (pymt.pMode === "Cash") {
              cashAmt = cashAmt + +pymt.pAmount;
            }
            if (pymt.pMode === "POS") {
              POSAmt = POSAmt + +pymt.pAmount;
            }
            if (pymt.pMode === "Transfer") {
              trfAmt = trfAmt + +pymt.pAmount;
            }
          }
        }

        for (let cat of this.bizItems) {
          var itemCat = cat.$key;
          var itemCatTotal = 0;

          for (let sale of this.saleTxn) {
            for (let item of sale.Items) {
              if (item.itemCategory === itemCat) {
                itemCatTotal = itemCatTotal + (+item.unitPrice * +item.quantity);
              }
            }
          }

          if (itemCatTotal != 0) {
            if (this.saleStmt) {
              this.saleStmt.push({category: itemCat, totalAmount: itemCatTotal},);
            } else {
              this.saleStmt = [{category: itemCat, totalAmount: itemCatTotal},];
            }
          }
        }


        var expTotalAmt = 0;
        for (let exp of this.expStmt) {
          expTotalAmt = expTotalAmt + +exp.totalAmount;
        }
        this.expenseTotal = expTotalAmt;


        var saleTotalAmt = 0;
        for (let item of this.saleStmt) {
          saleTotalAmt = saleTotalAmt + +item.totalAmount;
        }
        this.saleDiscount = (saleTotalAmt - subTotal) + +globalDiscount;
        this.saleVAT = saleVat;
        this.saleShipping = saleShipping;
        this.saleSubtotal = saleTotalAmt;
        this.saleTotal = saleTotalAmt - this.saleDiscount + this.saleShipping;
        this.netIncome = this.saleTotal - this.expenseTotal;

        this.cashSale = cashAmt;
        this.POSSale = POSAmt;
        this.transferSale = trfAmt;
        this.totalCashRpt = this.cashSale + this.POSSale + this.transferSale;

        loading.dismiss();
      });
    });
  }


  dBtn(ID, DS, CD) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Generating '+this.reportType+'...'
    });
    loading.present();

    this.sYbtn = false;
    this.sMbtn = false;
    this.sWbtn = false;
    this.sDbtn = true;
    this.expStmt.length = 0;
    this.saleStmt.length = 0;
    this.periodDescription = this.dDescription;


    this.transactionProvider.getExpenseTxns(ID, DS, CD).subscribe( expData => {
      this.expenseTxn = expData;

      for (let cat of this.expCategories) {
        var expCat = cat.expenseType;
        var expCatTotal = 0;

        for (let exp of this.expenseTxn) {
          for (let item of exp.Items) {
            if (item.description === expCat) {
              expCatTotal = expCatTotal + (+item.unitPrice * +item.quantity);
            }
          }
        }

        if (expCatTotal != 0) {
          if (this.expStmt) {
            this.expStmt.push({category: expCat, totalAmount: expCatTotal},);
          } else {
            this.expStmt = [{category: expCat, totalAmount: expCatTotal},];
          }
        }
      }

      this.transactionProvider.getSalesTxns(ID, DS, CD).subscribe( saleData => {
        this.saleTxn = saleData;

        var subTotal = 0;
        var globalDiscount = 0;
        var saleVat = 0;
        var saleAmount = 0;
        var saleShipping= 0;
        var cashAmt = 0;
        var POSAmt = 0;
        var trfAmt = 0;

        for (let sale of this.saleTxn) {
          subTotal = subTotal + +sale.SubTotal;
          globalDiscount = globalDiscount + +sale.GlobalDiscount;
          saleVat = saleVat + +sale.VAT;
          saleShipping = saleShipping + +sale.ShippingFee;
          saleAmount = saleAmount + +sale.TotalAmount;

          for (let pymt of sale.payments) {
            if (pymt.pMode === "Cash") {
              cashAmt = cashAmt + +pymt.pAmount;
            }
            if (pymt.pMode === "POS") {
              POSAmt = POSAmt + +pymt.pAmount;
            }
            if (pymt.pMode === "Transfer") {
              trfAmt = trfAmt + +pymt.pAmount;
            }
          }
        }

        for (let cat of this.bizItems) {
          var itemCat = cat.$key;
          var itemCatTotal = 0;

          for (let sale of this.saleTxn) {
            for (let item of sale.Items) {
              if (item.itemCategory === itemCat) {
                itemCatTotal = itemCatTotal + (+item.unitPrice * +item.quantity);
              }
            }
          }

          if (itemCatTotal != 0) {
            if (this.saleStmt) {
              this.saleStmt.push({category: itemCat, totalAmount: itemCatTotal},);
            } else {
              this.saleStmt = [{category: itemCat, totalAmount: itemCatTotal},];
            }
          }
        }


        var expTotalAmt = 0;
        for (let exp of this.expStmt) {
          expTotalAmt = expTotalAmt + +exp.totalAmount;
        }
        this.expenseTotal = expTotalAmt;


        var saleTotalAmt = 0;
        for (let item of this.saleStmt) {
          saleTotalAmt = saleTotalAmt + +item.totalAmount;
        }
        this.saleDiscount = (saleTotalAmt - subTotal) + +globalDiscount;
        this.saleVAT = saleVat;
        this.saleShipping = saleShipping;
        this.saleSubtotal = saleTotalAmt;
        this.saleTotal = saleTotalAmt - this.saleDiscount + this.saleShipping;
        this.netIncome = this.saleTotal - this.expenseTotal;

        this.cashSale = cashAmt;
        this.POSSale = POSAmt;
        this.transferSale = trfAmt;
        this.totalCashRpt = this.cashSale + this.POSSale + this.transferSale;

        loading.dismiss();
      });
    });
  }


  dFoward() {
    this.dFwdBtn = false;

    if (this.sYbtn) {
      console.log(this.dYearStr);
      this.dYearStr = this.dfs.yearAdd(this.dYearStr, 1);
      this.yDescription = this.dfs.dateYear(this.dYearStr);
      this.dYear = this.dfs.yearSlct(this.dYearStr);
      this.aFwdBtn();


      this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
    }

    if (this.sMbtn) {
      console.log(this.dMonthStr);
      this.dMonthStr = this.dfs.monthAdd(this.dMonthStr, 1);
      this.mDescription = this.dfs.dateMonthYear(this.dMonthStr);
      this.dMonth = this.dfs.monthSlct(this.dMonthStr);
      this.dYearMonth = this.dfs.yearMonthSlct(this.dMonthStr);
      this.aFwdBtn();

      this.mBtn(this.userProfile.companyId, 'YearMonth', this.dYearMonth);
    }

    if (this.sWbtn) {
      console.log(this.dWeekStr);
      this.dWeekStr = this.dfs.weekAdd(this.dWeekStr, 1);
      this.wDescription = this.dfs.dateWeekRange(this.dWeekStr);
      this.dWeek = this.dfs.weekSlct(this.dWeekStr);
      this.aFwdBtn();

      this.wBtn(this.userProfile.companyId, 'Week', this.dWeek);
    }

    if (this.sDbtn) {
      console.log(this.dDayStr);
      this.dDayStr = this.dfs.dateAdd(this.dDayStr, 1);
      this.dDescription = this.dfs.dateFullString(this.dDayStr);
      this.dDate = this.dfs.daySlct(this.dDayStr);
      this.aFwdBtn();

      this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
    }
  }


  dFFoward() {
    this.dFwdBtn = false;

    if (this.sYbtn) {
      this.dYearStr = this.dfs.dayNowSFS;
      this.yDescription = this.dfs.dateYear(this.dYearStr);
      this.dYear = this.dfs.yearNowFS;
      this.aFwdBtn();

      this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
    }

    if (this.sMbtn) {
      this.dMonthStr = this.dfs.dayNowSFS;
      this.mDescription = this.dfs.dateMonthYear(this.dMonthStr);
      this.dMonth = this.dfs.monthSlct(this.dMonthStr);
      this.dYearMonth = this.dfs.yearMonthSlct(this.dMonthStr);
      this.aFwdBtn();

      this.mBtn(this.userProfile.companyId, 'YearMonth', this.dYearMonth);
    }


    if (this.sWbtn) {
      this.dWeekStr = this.dfs.dayNowSFS;
      this.wDescription = this.dfs.dateWeekRange(this.dWeekStr);
      this.dWeek = +this.dfs.weekNowFS;
      this.aFwdBtn();

      this.wBtn(this.userProfile.companyId, 'Week', this.dWeek);
    }

    if (this.sDbtn) {
      this.dDayStr = this.dfs.dayNowSFS;
      this.dDescription = this.dfs.dateFullString(this.dDayStr);
      this.dDate = this.dfs.dateNowFS;
      this.aFwdBtn();

      this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
    }
  }


  dBackward() {
    this.dFwdBtn = false;

    if (this.sYbtn) {
      this.dYearStr = this.dfs.yearSub(this.dYearStr, 1);
      this.yDescription = this.dfs.dateYear(this.dYearStr);
      this.dYear = this.dfs.yearSlct(this.dYearStr);
      this.aFwdBtn();

      this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
    }

    if (this.sMbtn) {
      this.dMonthStr = this.dfs.monthSub(this.dMonthStr, 1);
      this.mDescription = this.dfs.dateMonthYear(this.dMonthStr);
      this.dMonth = this.dfs.monthSlct(this.dMonthStr);
      this.dYearMonth = this.dfs.yearMonthSlct(this.dMonthStr);
      this.aFwdBtn();


      this.mBtn(this.userProfile.companyId, 'YearMonth', this.dYearMonth);
    }

    if (this.sWbtn) {
      this.dWeekStr = this.dfs.weekSub(this.dWeekStr, 1);
      this.wDescription = this.dfs.dateWeekRange(this.dWeekStr);
      this.dWeek = this.dfs.weekSlct(this.dWeekStr);
      this.aFwdBtn();

      this.wBtn(this.userProfile.companyId, 'Week', this.dWeek);
    }

    if (this.sDbtn) {
      this.dDayStr = this.dfs.dateSub(this.dDayStr, 1);
      this.dDescription = this.dfs.dateFullString(this.dDayStr);
      this.dDate = this.dfs.daySlct(this.dDayStr);
      this.aFwdBtn();

      this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
    }
  }


  aFwdBtn() {
    this.dFwdBtn = false;

    if (this.sYbtn) {
      if (this.dYearStr != this.dfs.dayNowSFS) {
        this.dFwdBtn = true;
      } else  {
        this.dFwdBtn = false;
      }
    }

    if (this.sMbtn) {
      if (this.dMonthStr != this.dfs.dayNowSFS) {
        this.dFwdBtn = true;
      } else  {
        this.dFwdBtn = false;
      }
    }

    if (this.sWbtn) {
      if (this.dWeekStr != this.dfs.dayNowSFS) {
        this.dFwdBtn = true;
      } else  {
        this.dFwdBtn = false;
      }
    }

    if (this.sDbtn) {
      if (this.dDayStr != this.dfs.dayNowSFS) {
        this.dFwdBtn = true;
      } else  {
        this.dFwdBtn = false;
      }
    }
  }

  generateMiniStatement() {
    this.miniStmt = true;
    this.cashRpt = false;
    this.reportType = "Mini Statement";
  }

  generateCashReport() {
    this.miniStmt = false;
    this.cashRpt = true;
    this.reportType = "Cash Report";
  }





}
