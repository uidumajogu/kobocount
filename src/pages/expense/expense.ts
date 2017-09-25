import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {TransactionsProvider} from "../../providers/transactions/transactions";
import {TeamProvider} from "../../providers/team/team";
import {DateFsProvider} from "../../providers/date-fs/date-fs";
import {ReportsProvider} from "../../providers/reports/reports";

@IonicPage()
@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class ExpensePage {

  private currentDate: any;
  private expenseType: string;
  private expenseItems: Array<{index: number, description: string, quantity: any, unitPrice: any}>;
  private expPayments: Array<{paymentDate: any, pAmount: number, pMode: string}>;
  private expenseCost: any = "";
  private enableExpenseCost: boolean;
  private expenseQty: any = "";
  private enableExpenseQty: boolean;
  private expenseTotal: number;
  private enableSubmitExpense: boolean;
  private userProfile: any;
  private expenseDay: any;
  private expenseMonth: any;
  private expenseYear: string;
  private expenseDate: string;
  private overlayHidden: boolean;
  private isNewExpType: boolean;
  private expenseWeekDay: any;
  private expenseWeek: any;
  private expenseYearMonth: any;


  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController,
              private transactionProvider: TransactionsProvider, private teamProvider: TeamProvider,
              private toastCtrl: ToastController, private modalCtrl: ModalController, private dateFS: DateFsProvider,
              private reportsProvider: ReportsProvider) {
  }

  ionViewDidLoad() {
    this.userProfile = this.teamProvider.userP;
    this.enableExpenseCost = true;
    this.enableExpenseQty = true;
    this.enableSubmitExpense = false;
    this.overlayHidden = true;
    this.expenseType = "";
    this.currentDate = new Date();
    this.expenseTotal = 0;
    this.expenseItems = [
      {index: 0, description: "Add Item", quantity: 1, unitPrice: 0},
    ];
  }

  hideOverlay() {
    this.overlayHidden = !this.overlayHidden;
  }

  openExpTypeModal() {
    let myExpTypeModal = this.modalCtrl.create('ExpenseTypeModalPage');
    myExpTypeModal.onDidDismiss((data) => {
      if (data) {
          this.isNewExpType = data.other;
          this.expenseType = data.type;
          this.activateExpenseCostInput();
        }
    });
    myExpTypeModal.present();
  }

  activateExpenseCostInput() {
    if (this.expenseType != "") {
      this.enableExpenseCost = false;
      this.runExpenseFunctions();
    }else {
      this.enableExpenseCost = true;
      this.enableExpenseQty = true;
      this.expenseTotal = 0;
      this.enableSubmitExpense = false;
    }
  }

  runExpenseFunctions() {
    this.activateExpenseQtyInput();
    this.calculateTotalExpense();
    this.activateSubmitExpense();
  }

  activateExpenseQtyInput() {
    if (this.expenseCost != ("" || 0)) {
      this.enableExpenseQty = false;
    }else {
      this.enableExpenseQty = true;
      this.expenseTotal = 0;
      this.enableSubmitExpense = false;
    }
  }


  calculateTotalExpense() {
    if (this.expenseCost != ("" || 0)) {
      if (this.expenseQty != ("" || 0)) {
        this.expenseTotal = this.expenseCost * this.expenseQty;

        }else{
          this.expenseTotal = 0;
          this.enableSubmitExpense = false;
        }
      } else {
        this.expenseTotal = 0;
        this.enableSubmitExpense = false;
      }
    }

  activateSubmitExpense() {
    if (this.expenseTotal != 0) {
      if (this.expenseTotal != 0) {
        this.enableSubmitExpense = true;
      } else {
        this.enableSubmitExpense = false;
      }
    }else{
      this.enableSubmitExpense = false;
    }
  }


  expenseDateString() {
    this.expenseYear = this.dateFS.yearNowFS;
    this.expenseMonth = this.dateFS.monthNowFS;
    this.expenseDay = this.dateFS.dayNowFS;
    this.expenseDate = this.dateFS.dateNowFS;
    this.expenseYearMonth = this.dateFS.yearMonthNowFS;
    this.expenseWeekDay = this.dateFS.dayNowFS;
    this.expenseWeek = this.dateFS.weekNowFS;
  }


  updateExpPayment() {
    this.expPayments = [{paymentDate: this.dateFS.dateNowFS, pAmount: this.expenseTotal, pMode: ""}];
  }


  addExpense() {
    const loading = this.loadingCtrl.create();

      this.expenseItems.splice(
        (this.expenseItems.length - 1), 0, {
          index: this.expenseItems.length, description: this.expenseType,
          quantity: this.expenseQty, unitPrice: this.expenseCost
        });
        this.expenseItems.pop();

    if (this.isNewExpType === true) {
      this.reportsProvider.addExpenseCategory(this.expenseType);
    }

    this.updateExpPayment();

    this.transactionProvider.addTransaction("Expense", "EXP300299", this.expenseDate, this.expenseYear, this.expenseMonth, this.expenseYearMonth,
                                              this.expenseDay, this.expenseWeekDay, this.expenseWeek, this.expenseItems, this.expenseTotal,
                                              0, 0, 0, this.expenseTotal, this.expenseTotal,0, "", "", "", "", "", "", "YES", true,
                                              this.userProfile.email, this.userProfile.fullName, this.userProfile.companyId, this.expPayments)
        .then(()=> {
          this.transactionProvider.addExpense("Expense", "EXP300299", this.expenseDate, this.expenseYear, this.expenseMonth, this.expenseYearMonth,
            this.expenseDay, this.expenseWeekDay, this.expenseWeek, this.expenseItems, this.expenseTotal, 0, 0, 0,
            this.expenseTotal, this.expenseTotal,0, "", "", "", "", "", "", "YES", true, this.userProfile.email,
            this.userProfile.fullName, this.userProfile.companyId, this.expPayments)
        })
        .then(() => {
          loading.dismiss().then(() => {
            this.navCtrl.setRoot('ExpensePage');
          });
        });
      loading.present();

  }



  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Expense saved successfully!',
      duration: 4000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }


  submitExpense() {
    this.expenseDateString();
    this.addExpense();
  }

  cancelExpense() {
    this.navCtrl.setRoot('ExpensePage');
  }

  goToTransactionsPage() {
    this.navCtrl.setRoot('TransactionsPage')
  }

  goToSalesPage() {
    this.navCtrl.setRoot('SalesPage')
  }

  goToHomePage() {
    this.navCtrl.setRoot('DashBoardPage')
  }

}
