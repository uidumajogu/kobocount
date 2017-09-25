import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportsProvider} from "../../providers/reports/reports";


@IonicPage()
@Component({
  selector: 'page-expense-type-modal',
  templateUrl: 'expense-type-modal.html',
})
export class ExpenseTypeModalPage {
  private expTypes: Array<string>;
  private myExpType: string;
  private notInList: boolean;
  private expTypeObj: any;
  public expenseTypeForm: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private reportsProvider: ReportsProvider,
              private viewCtrl: ViewController, private formBuilder: FormBuilder) {

    this.expenseTypeForm = formBuilder.group({
      expType: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    this.notInList = false;
    this.getExpenseTypes();
  }

  getExpenseTypes(){
    this.reportsProvider.getExpenseCategories().subscribe( data => {
      this.expTypes = data;
    });
  }

  activateNotInList() {
    this.myExpType = "";
    this.notInList = true;
  }

  deactivateNotInList() {
    this.notInList = false;
  }

  submitExpTypeModal(){
    this.expTypeObj = {type: this.myExpType, other: this.notInList};
    this.viewCtrl.dismiss(this.expTypeObj);
  }

  closeExpTypeModal(){
    this.viewCtrl.dismiss();
  }

}
