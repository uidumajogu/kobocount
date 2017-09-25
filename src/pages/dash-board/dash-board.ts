import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, App, LoadingController, FabContainer} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import {DateFsProvider} from "../../providers/date-fs/date-fs";
import { Chart } from 'chart.js';
import {TransactionsProvider} from "../../providers/transactions/transactions";


@IonicPage()
@Component({
  selector: 'page-dash-board',
  templateUrl: 'dash-board.html',
})
export class DashBoardPage {

  @ViewChild('chartCanvas') chartCanvas;
  @ViewChild('chartAreaDiv') chartAreaDiv;
  @ViewChild('chartCanvasDaily') chartCanvasDaily;

  barChart: any;
  barChartDaily: any;
  bizProfile: any;
  summaryAmountcolor: string;
  sYbtn: boolean = true;
  sMbtn: boolean = false;
  sWbtn: boolean = false;
  sDbtn: boolean = false;
  userProfile: any;
  saleTxn: Array<any> = [];
  expenseTxn: Array<any> = [];
  unpaidTxn: Array<any> = [];
  dDate: any;
  dYear: any;
  dWeek: any;
  totalExpense: any = 0;
  totalSale: any = 0;
  totalUnpaid: any = 0;
  netBalance: any;
  dYearMonth: any;
  dateDescription: string;
  dMonth: any;
  dDay: any;
  yDescription: any;
  mDescription: any;
  wDescription: any;
  dDescription: any;
  dDayStr: any;
  dMonthStr: any;
  dWeekStr: any;
  dYearStr: any;
  dFwdBtn: boolean = false;
  barChartLabels: Array<any> = [];
  expenseChartData: Array<any> = [];
  salesChartData: Array<any> = [];
  dataPeriod: any;
  periodDetail: boolean = true;
  monthToString: any = {m1: "Jan", m2: "Feb", m3: "Mar", m4: "Apr", m5: "May", m6: "Jun", m7: "Jul", m8: "Aug", m9: "Sep", m10: "Oct",
                        m11: "Nov", m12: "Dec"};
  weekChartData: Array<any> = [];
  barChartType: any;
  isHidden: boolean;
  dailyChartData: Array<any> = [];
  noData: boolean;
  dCData: boolean;
  oCData: boolean;
  overlayHidden: boolean;
  isAdmin: boolean;
  profileState: boolean;



  constructor(private navCtrl: NavController, private teamProvider: TeamProvider,
              private app: App, private loadingCtrl: LoadingController, private dfs: DateFsProvider,
              private transactionProvider: TransactionsProvider) {}

  ionViewDidLoad() {

    this.overlayHidden = true;
    this.summaryAmountcolor = "white";

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
          //this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
          this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
        });
      });
    } else {
      this.userProfile = this.teamProvider.userP;
      this.bizProfile = this.teamProvider.companyP;
      this.profileState = this.bizProfile.profileComplete;
      this.isAdmin = this.userProfile.companyAdmin;
      //this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
      this.dBtn(this.userProfile.companyId, 'Date', this.dDate);
    }
  }

  hideOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }


  activateBarChart() {

    if (this.barChart != undefined) {
      this.barChart.destroy();
    }

    if (this.barChartDaily != undefined) {
      this.barChartDaily.destroy();
    }

    Chart.defaults.global.defaultFontColor = '#76A3E1';
    this.barChart = new Chart(this.chartCanvas.nativeElement, {

      type: this.barChartType,
      data: {
        labels: this.barChartLabels,

        datasets: [
          {
            label: 'Sales',
            data: this.salesChartData,
            backgroundColor: '#45b91f',
          },

          {
            label: 'Expenses',
            data: this.expenseChartData,
            backgroundColor: '#f37271',
          },
        ]
      },
      options: {
        legend: {
          //display: false,
          position: 'bottom',
          labels: {
            boxWidth: 4,
            fontColor: '#8995A5',
            //padding: 20,
          },
        },
        scales: {
          yAxes: [{
            //stacked: true,
            ticks: {
              display: false,
              drawTicks: false,
            },
            gridLines: {
              //display: false,
              color: "#D8DFE8",
              lineWidth: 0.2,
              drawBorder: false,
            }
          }],

          xAxes: [{
            //stacked: true,
            gridLines: {
              //display: false,
              color: "#D8DFE8",
              lineWidth: 0.2,
              drawBorder: false,
            }
          }

          ]
        }
      }

    });
  }


  activateBarChartDaily() {

    if (this.barChart != undefined) {
      this.barChart.destroy();
    }

    if (this.barChartDaily != undefined) {
      this.barChartDaily.destroy();
    }
    Chart.defaults.global.defaultFontColor = '#76A3E1';
    this.barChartDaily = new Chart(this.chartCanvasDaily.nativeElement, {

      type: this.barChartType,
      data: {
        labels: this.barChartLabels,

        datasets: [
          {
            data: this.dailyChartData,
            backgroundColor: ['#45b91f', '#f37271',],
            display: this.isHidden,
          },

        ]
      },
      options: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 4,
            fontColor: '#8995A5',
            //padding: 20,
          },
        },
        scales: {
          yAxes: [{
            //stacked: true,
            ticks: {
              display: false,
              drawTicks: false,
            },
            gridLines: {
              //display: false,
              color: "#D8DFE8",
              lineWidth: 0.2,
              drawBorder: false,
            }
          }],

          xAxes: [{
            // //barThickness: 15,
            // categoryPercentage: 0.2,
            // barPercentage: 1,
            //stacked: true,
            gridLines: {
              //display: false,
              color: "#D8DFE8",
              lineWidth: 0.2,
              drawBorder: false,
            }
          }

          ]
        }
      }

    });
  }



  yBtn(ID, YS, CY) {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Computing...'
    });
    loading.present();

    this.summaryAmountcolor = "white";
    this.expenseChartData.length = 0;
    this.salesChartData.length = 0;
    this.barChartLabels.length = 0;
    this.dailyChartData.length = 0;
    this.weekChartData.length = 0;
    this.expenseTxn.length = 0;
    this.saleTxn.length = 0;
    this.unpaidTxn.length = 0;
    this.isHidden = false;
    this.oCData = true;
    this.dCData = false;
    this.noData = false;

    this.barChartType = 'bar';
    this.sYbtn = true;
    this.sMbtn = false;
    this.sWbtn = false;
    this.sDbtn = false;
    this.dataPeriod = "Year";

    this.aFwdBtn();

    this.netBalance = 0;
    this.totalExpense = 0;
    this.totalSale = 0;
    this.totalUnpaid = 0;
    this.dateDescription = this.yDescription;

    var yearNum = this.dYear;
    if (yearNum === this.dfs.yearNowFS) {
      var monthNum = +this.dfs.monthNowFS;
    } else {
       monthNum = 12;
    }

    for (var i: any = 1; i <= monthNum; i++) {
      this.barChartLabels.push(this.monthToString["m"+i]);
      this.expenseChartData.push(0);
      this.salesChartData.push(0);
    }


    this.transactionProvider.getExpenseTxns(ID, YS, CY).subscribe( data => {
      this.expenseTxn = data;
      for (let txn of this.expenseTxn){
        this.totalExpense = (+this.totalExpense) + (+txn.TotalAmount);
        var x = 1;
        for (var i: any = x; i <= monthNum; i++) {
          if (i === +txn.Month) {
              this.expenseChartData[i-1] = this.expenseChartData[i-1] + txn.TotalAmount;
              break;
          }
        }
      }

      this.transactionProvider.getSalesTxns(ID, YS, CY).subscribe( data => {
        this.saleTxn = data;
        for (let txn of this.saleTxn){
          this.totalSale = Number(this.totalSale) + Number(txn.TotalAmount) - txn.VAT;
          var x = 1;
          for (var i: any = x; i <= monthNum; i++) {
            if (i === +txn.Month) {
              this.salesChartData[i-1] = this.salesChartData[i-1] + txn.TotalAmount - txn.VAT;
              break;
            }
          }
        }

        this.netBalance = this.totalSale - this.totalExpense;

        if (this.netBalance < 0) {
          this.summaryAmountcolor = "#9a0001";
        }

        if (this.netBalance === 0) {
          this.noData = true;
        } else{
          this.activateBarChart();
        }

        this.transactionProvider.getSalesTxns(ID, YS, CY).subscribe( data => {
          this.unpaidTxn = data;
          for (let txn of this.unpaidTxn){
            if (txn.IsPaid != "YES") {
              this.totalUnpaid = (+this.totalUnpaid) + (+txn.UnPaidAmount);
            }
          }

          loading.dismiss();
        });
      });
    });
  }

  mBtn(ID, YMS, CYM) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Computing...'
    });
    loading.present();

    this.summaryAmountcolor = "white";
    this.expenseChartData.length = 0;
    this.salesChartData.length = 0;
    this.barChartLabels.length = 0;
    this.dailyChartData.length = 0;
    this.weekChartData.length = 0;
    this.expenseTxn.length = 0;
    this.saleTxn.length = 0;
    this.unpaidTxn.length = 0;
    this.isHidden = false;
    this.oCData = true;
    this.dCData = false;
    this.noData = false;


    this.barChartType = 'bar';
    this.sYbtn = false;
    this.sMbtn = true;
    this.sWbtn = false;
    this.sDbtn = false;
    this.dataPeriod = "Month";

    this.aFwdBtn();

    this.netBalance = 0;
    this.totalExpense = 0;
    this.totalSale = 0;
    this.totalUnpaid = 0;
    this.dateDescription = this.mDescription;


    var dayInMonth = this.dfs.daysInMonth(this.dMonthStr);

    var monthNum = this.dMonth;
    if (monthNum === this.dfs.monthNowFS) {
      var dayNum = this.dfs.dayNowFS;
    } else {
      dayNum = dayInMonth;
    }

    for (var i: any = 1; i <= dayNum; i++) {
      if (i<10) {
        var j = "0"+i;
      } else {
        j=i;
      }
      this.barChartLabels.push(j);
      this.expenseChartData.push(0);
      this.salesChartData.push(0);
    }

    this.transactionProvider.getExpenseTxns(ID, YMS, CYM).subscribe( data => {
      this.expenseTxn = data;
      for (let txn of this.expenseTxn){
        this.totalExpense = (+this.totalExpense) + (+txn.TotalAmount);
        var x = 1;
        for (var i: any = x; i <= dayNum; i++) {
          if (i === +txn.Day) {
              this.expenseChartData[i-1] = this.expenseChartData[i-1] + txn.TotalAmount;
              break;
          }
        }
      }

      this.transactionProvider.getSalesTxns(ID, YMS, CYM).subscribe( data => {
        this.saleTxn = data;
        for (let txn of this.saleTxn){
          this.totalSale = Number(this.totalSale) + Number(txn.TotalAmount) - txn.VAT;
          var x = 1;
          for (var i: any = x; i <= dayNum; i++) {
            if (i === +txn.Day) {
              this.salesChartData[i-1] = this.salesChartData[i-1] + txn.TotalAmount - txn.VAT;
              break;
            }
          }
        }

        this.netBalance = this.totalSale - this.totalExpense;

        if (this.netBalance < 0) {
          this.summaryAmountcolor = "#9a0001";
        }

        if (this.netBalance === 0) {
          this.noData = true;
        } else{
          this.activateBarChart();
        }

        this.transactionProvider.getSalesTxns(ID, YMS, CYM).subscribe( data => {
          this.unpaidTxn = data;
          for (let txn of this.unpaidTxn){
            if (txn.IsPaid != "YES") {
              this.totalUnpaid = (+this.totalUnpaid) + (+txn.UnPaidAmount);
            }
          }

          loading.dismiss();
        });
      });
    });
  }



  wBtn(ID, WS, CW) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Computing...'
    });
    loading.present();

    this.summaryAmountcolor = "white";
    this.expenseChartData.length = 0;
    this.salesChartData.length = 0;
    this.barChartLabels.length = 0;
    this.dailyChartData.length = 0;
    this.weekChartData.length = 0;
    this.expenseTxn.length = 0;
    this.saleTxn.length = 0;
    this.unpaidTxn.length = 0;
    this.isHidden = false;
    this.oCData = true;
    this.dCData = false;
    this.noData = false;

    this.barChartType = 'bar';
    this.sYbtn = false;
    this.sMbtn = false;
    this.sWbtn = true;
    this.sDbtn = false;
    this.dataPeriod = "Week";

    this.aFwdBtn();

    this.netBalance = 0;
    this.totalExpense = 0;
    this.totalSale = 0;
    this.totalUnpaid = 0;
    this.dateDescription = this.wDescription;


    var weekStartDate = this.dfs.startDateOfWeek(this.dWeekStr);

    var weekEndDate = this.dfs.endDateOfWeek(this.dWeekStr);

    var diffInDays = this.dfs.daysDiff(weekEndDate, weekStartDate);

    var datesInWeek = this.dfs.daysInRange(weekStartDate, weekEndDate);

    datesInWeek.forEach( (item)=> {
        var wkDay = this.dfs.wkDaySlctS(item);
        this.barChartLabels.push(wkDay);

        var day = this.dfs.daySlctS(item);
        this.weekChartData.push(+day);

        this.expenseChartData.push(0);
        this.salesChartData.push(0);
    });


    this.transactionProvider.getExpenseTxns(ID, WS, CW).subscribe( data => {
      this.expenseTxn = data;
      for (let txn of this.expenseTxn){
        this.totalExpense = (+this.totalExpense) + (+txn.TotalAmount);
        var x = 1;
        for (var i: any = x; i <= +diffInDays+1; i++) {
          if (this.weekChartData[i-1] === +txn.Day) {
              this.expenseChartData[i-1] = this.expenseChartData[i-1] + txn.TotalAmount;
              break;
          }
        }
      }

      this.transactionProvider.getSalesTxns(ID, WS, CW).subscribe( data => {
        this.saleTxn = data;
        for (let txn of this.saleTxn){
          this.totalSale = Number(this.totalSale) + Number(txn.TotalAmount) - txn.VAT;
          var x = 1;
          for (var i: any = x; i <= +diffInDays+1; i++) {
            if (this.weekChartData[i-1] === +txn.Day) {
              this.salesChartData[i-1] = this.salesChartData[i-1] + txn.TotalAmount - txn.VAT;
              break;
            }
          }
        }

        this.netBalance = this.totalSale - this.totalExpense;

        if (this.netBalance < 0) {
          this.summaryAmountcolor = "#9a0001";
        }

        if (this.netBalance === 0) {
          this.noData = true;
        } else {
          this.activateBarChart();
        }

        this.transactionProvider.getSalesTxns(ID, WS, CW).subscribe( data => {
          this.unpaidTxn = data;
          for (let txn of this.unpaidTxn){
            if (txn.IsPaid != "YES") {
              this.totalUnpaid = (+this.totalUnpaid) + (+txn.UnPaidAmount);
            }
          }
          loading.dismiss();
        });
      });
    });
  }

  dBtn(ID, DS, CD) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Computing...'
    });
    loading.present();

    this.summaryAmountcolor = "white";
    this.expenseChartData.length = 0;
    this.salesChartData.length = 0;
    this.barChartLabels.length = 0;
    this.dailyChartData.length = 0;
    this.weekChartData.length = 0;
    // this.expenseTxn.length = 0;
    // this.saleTxn.length = 0;
    // this.unpaidTxn.length = 0;
    this.isHidden = true;
    this.oCData = false;
    this.dCData = true;
    this.noData = false;


    this.barChartType = 'bar';
    this.sYbtn = false;
    this.sMbtn = false;
    this.sWbtn = false;
    this.sDbtn = true;
    this.dataPeriod = "Day";

    this.aFwdBtn();

    this.netBalance = 0;
    this.totalExpense = 0;
    this.totalSale = 0;
    this.totalUnpaid = 0;
    this.dateDescription = this.dDescription;

    this.barChartLabels = ['Sales', 'Expense'];

    this.dailyChartData[0] = 0;
    this.dailyChartData[1] = 0;

    this.transactionProvider.getExpenseTxns(ID, DS, CD).subscribe( data => {
      this.expenseTxn = data;
      for (let txn of this.expenseTxn){
        this.totalExpense = Number(this.totalExpense) + Number(txn.TotalAmount);
      }
      this.dailyChartData[1] = this.totalExpense;

      this.transactionProvider.getSalesTxns(ID, DS, CD).subscribe( data => {
        this.saleTxn = data;
        for (let txn of this.saleTxn){
          this.totalSale = Number(this.totalSale) + Number(txn.TotalAmount) - txn.VAT;
        }
        this.dailyChartData[0] = this.totalSale;

        this.netBalance = this.totalSale - this.totalExpense;

        if (this.netBalance < 0) {
          this.summaryAmountcolor = "#9a0001";
        }

        if (this.netBalance === 0) {
          this.noData = true;
        } else {
          this.activateBarChartDaily();
        }

        this.transactionProvider.getSalesTxns(ID, DS, CD).subscribe( data => {
          this.unpaidTxn = data;
          for (let txn of this.unpaidTxn){
            if (txn.IsPaid != "YES") {
              this.totalUnpaid = (+this.totalUnpaid) + (+txn.UnPaidAmount);
            }
          }
          loading.dismiss();
        });
      });
    });
  }

  dFoward() {
    this.dFwdBtn = false;

    if (this.sYbtn) {
      this.dYearStr = this.dfs.yearAdd(this.dYearStr, 1);
      this.yDescription = this.dfs.dateYear(this.dYearStr);
      this.dYear = this.dfs.yearSlct(this.dYearStr);
      this.aFwdBtn();


      this.yBtn(this.userProfile.companyId, 'Year', this.dYear);
    }

    if (this.sMbtn) {
      this.dMonthStr = this.dfs.monthAdd(this.dMonthStr, 1);
      this.mDescription = this.dfs.dateMonthYear(this.dMonthStr);
      this.dMonth = this.dfs.monthSlct(this.dMonthStr);
      this.dYearMonth = this.dfs.yearMonthSlct(this.dMonthStr);
      this.aFwdBtn();


      this.mBtn(this.userProfile.companyId, 'YearMonth', this.dYearMonth);
    }

    if (this.sWbtn) {
      this.dWeekStr = this.dfs.weekAdd(this.dWeekStr, 1);
      this.wDescription = this.dfs.dateWeekRange(this.dWeekStr);
      this.dWeek = this.dfs.weekSlct(this.dWeekStr);
      this.aFwdBtn();


      this.wBtn(this.userProfile.companyId, 'Week', this.dWeek);
    }

    if (this.sDbtn) {
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

  switchPeriod() {
    this.periodDetail = !this.periodDetail;
  }


  summaryDetails() {
    if (this.sYbtn) {
      this.goToMiniStatementPage(this.userProfile.companyId, this.dYearStr, this.dateDescription);
    }

    if (this.sMbtn) {
      this.goToMiniStatementPage(this.userProfile.companyId, this.dMonthStr, this.dateDescription);
    }


    if (this.sWbtn) {
      this.goToMiniStatementPage(this.userProfile.companyId, this.dWeekStr, this.dateDescription);
    }

    if (this.sDbtn) {
      this.goToMiniStatementPage(this.userProfile.companyId, this.dDayStr, this.dateDescription);
    }
  }

  goToMiniStatementPage(ID, PS, D) {
    if (this.sYbtn) {
      this.navCtrl.setRoot('IncomeStatementPage', {CID: ID, qPeriod: "Year", pString: PS, dDescription: D});
    }

    if (this.sMbtn) {
      this.navCtrl.setRoot('IncomeStatementPage', {CID: ID, qPeriod: "YearMonth", pString: PS, dDescription: D});
    }

    if (this.sWbtn) {
      this.navCtrl.setRoot('IncomeStatementPage', {CID: ID, qPeriod: "Week", pString: PS, dDescription: D});
    }

    if (this.sDbtn) {
      this.navCtrl.setRoot('IncomeStatementPage', {CID: ID, qPeriod: "Date", pString: PS, dDescription: D});
    }
  }


  goToExpensePage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('ExpensePage');
  }

  goToSalesPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('SalesPage');
  }

  goToTransactionsPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('TransactionsPage');
  }

  goToOutstandingPayments(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('OutstandingPaymentSPage');
  }

  goToGoodsOrServices(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('ItemsAndStockPage');
  }

  goToTeamPage(fab: FabContainer) {
    this.overlayHidden = true;
    fab.close();
    this.navCtrl.setRoot('TeamPage');
  }
}
