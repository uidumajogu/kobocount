import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TeamProvider} from "../../providers/team/team";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-sale-invoice',
  templateUrl: 'sale-invoice-or-receipt.html',
})
export class SaleInvoiceOrReceiptPage {

  bizProfile: any;
  saleIRTag: string;
  saleIRNumber: string;
  customerName: string = "";
  customerPhoneNumber: string = "";
  customerEmail: string = "";
  cdStreet1: string = "";
  cdStreet2: string = "";
  cdCity: string = "";
  cdState: string = "";
  cdCountry: string = "";
  saleIRDate: string;
  saleItems: Array<{
    index: number, description: string, quantity: any, unitPrice: any, saleDiscountType: string,
    saleDiscountTag: boolean, saleDiscountAmount: any, saleDiscount: number, itemClass: boolean
  }>;
  saleVAT: number;
  saleShipping: number;
  paidSaleTotal: number;
  saleDDate: string = "";
  saleDueDate: string = "";
  //totalSaleDiscountPerItem: number;
  globalSaleDiscount: number;
  saleSubTotalIRP: number;
  saleTotal: number;
  paymentMode: string;
  salePaidValid: boolean = false;
  noCustomerDetails: boolean = true;
  saleDueDateValid: boolean = false;
  customerDetailsValid: boolean = false;
  deliveryDetailsValid: boolean = false;
  isInvoice: boolean = false;
  salePaymentDate: any = "";
  signatureImage: any = "";
  signedBy: any = "";
  irPdf:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public teamProvider: TeamProvider,
              public modalCtrl: ModalController, private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        console.log("Yes email can be sent..");
      }
    });

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.bizProfile = this.teamProvider.companyP;

    this.saleIRTag = this.navParams.get('saleInRecTag');
    this.saleIRNumber = this.navParams.get('saleInRecNumber');
    this.customerName = this.navParams.get('customerName');
    this.customerPhoneNumber = this.navParams.get('customerPhoneNumber');
    this.customerEmail = this.navParams.get('customerEmail');
    this.cdStreet1 = this.navParams.get('dStreet1');
    this.cdStreet2 = this.navParams.get('dStreet2');
    this.cdCity = this.navParams.get('dCity');
    this.cdState = this.navParams.get('dState');
    this.cdCountry = this.navParams.get('dCountry');
    this.saleIRDate = this.navParams.get('saleInReDate');
    this.saleItems = this.navParams.get('saleItems');
    this.saleVAT = Number(this.navParams.get('saleVAT'));
    this.saleShipping = Number(this.navParams.get('saleShipping'));
    this.paidSaleTotal = Number(this.navParams.get('paidSaleTotal'));
    this.saleDDate = this.navParams.get('dDate');
    //this.totalSaleDiscountPerItem = Number(this.navParams.get('totalSaleDiscount'));
    this.globalSaleDiscount = Number(this.navParams.get('globalSaleDiscount'));
    this.saleSubTotalIRP = Number(this.navParams.get('saleSubTotal'))
    this.paymentMode = this.navParams.get('paymentMode');
    this.salePaymentDate = this.navParams.get('salePaymentDate');

    if (this.paidSaleTotal > 0) {
      this.salePaidValid = true;
    } else {
      this.salePaidValid = false;
    }

    if (this.saleIRTag === "Invoice") {
      this.isInvoice = true;
    } else {
      this.isInvoice = false;
      this.saleDueDate = this.saleIRDate;
      if (this.customerName != "" && this.customerEmail != "" && this.customerPhoneNumber != "" && (this.cdStreet1 + this.cdStreet2) != ""
        && this.cdCity != "" && this.cdState != "" && this.cdCountry != "" && this.saleDDate != "") {
        this.noCustomerDetails = false;
      } else {
        this.noCustomerDetails = true;
      }
    }


  }


  openSignatureModal() {
    let mySignatureModal = this.modalCtrl.create('SignatureModalPage');
    mySignatureModal.onDidDismiss((data) => {
      if (data) {
        console.log(data);
        this.signatureImage = data;
      }
    });
    mySignatureModal.present();
  }


  submitCustomerDetails() {
    if (this.saleDueDate === "") {
      this.saleDueDateValid = true;
    } else {
      this.saleDueDateValid = false;
      if (this.customerName === "" || this.customerEmail === "" || this.customerPhoneNumber === "") {
        this.customerDetailsValid = true;
      } else {
        this.customerDetailsValid = false;
        this.noCustomerDetails = false;
        // if ((this.cdStreet1 + this.cdStreet2) === "" || this.cdCity === "" || this.cdState === "" || this.cdCountry === "" || this.saleDDate === "") {
        //   this.deliveryDetailsValid = false;
        // } else {
        //   this.noCustomerDetails = false;
        // }
      }
    }
  }

  dwnldPdf() {
    console.log("Downloaded...");

    var fileName = this.saleIRTag + " " + this.saleIRNumber + ".pdf";
    var addressLine1 = this.bizProfile.companyAddress.street;
    var addressLine2 = this.bizProfile.companyAddress.city + ", " + this.bizProfile.companyAddress.state;
    var addressLine3 = this.bizProfile.companyAddress.country;

    if (this.signatureImage === "") {
      this.signedBy =   {
        text : [{text: ''}]
      };
    } else {
      this.signedBy = [
        {
          image: this.signatureImage,
          width: 150,
          height: 80,
          alignment: 'right',
          margin: [0, 50, 20, 0]
        },
        {
          canvas: [{type: 'line', x1: 350, y1: 0, x2: 570, y2: 0, lineWidth: 0.5}],
          alignment: 'right',
          lineHeight: 1.5
        },
        {
          columns: [
            {
              width: '60%',
              text: '',
            },
            {
              width: '40%',
              text : [{text: 'Company Representative', fontSize: 12, color: '#333', alignment: 'center', margin: [0, 0, 60, 0] }]
            },
          ],
          columnGap: 10
        }
      ];
    }

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    if (this.isInvoice === true) {
      var date1 = "Created On: " + formatDate(new Date(this.saleIRDate).toDateString());
      var date2 = "Due On: " + this.saleDueDate;
    } else {
      var date1 = "Date: " + formatDate(new Date(this.saleIRDate).toDateString());
      var date2 = "Paid On: " + formatDate(new Date(this.saleDueDate).toDateString());
    }



    var tableBody = [];

    var tableHeader = [{text: 'DESCRIPTION', alignment: 'center', style: 'filledHeader'},
      {text: 'QTY', style: 'filledHeader'},
      {text: 'RATE', style: 'filledHeader'},
      {text: 'DISCOUNT', style: 'filledHeader'},
      {text: 'AMOUNT', alignment: 'right', style: 'filledHeader'}];

    tableBody[0] = tableHeader;

    var items = this.saleItems;
    for (var i = 0; i < items.length-1; i++) {

      var rowData;

      var qty = Number(items[i].quantity);
      var rate = Number(items[i].unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      var discount = Number(items[i].saleDiscount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      var total = Number(((items[i].quantity * items[i].unitPrice) - items[i].saleDiscount)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');


      rowData = [{text: items[i].description, alignment: 'center', color: '#555'},
        {text: "₦" + qty, color: '#555'},
        {text: "₦" + rate, color: '#555'},
        {text: "₦" + discount, color: '#555'},
        {text: "₦" + total, alignment: 'right', color: '#555'}];

      tableBody[i+1] = rowData;

    }

    var subtotal = Number(this.saleSubTotalIRP).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var discount = Number(this.globalSaleDiscount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var shipping = Number(this.saleShipping).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var vat = Number(this.saleVAT).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    var total = Number(((this.saleSubTotalIRP - this.globalSaleDiscount) + this.saleShipping + this.saleVAT)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var paid = Number(this.paidSaleTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var balanceDue = Number(((this.saleSubTotalIRP - this.globalSaleDiscount) + this.saleShipping + this.saleVAT) - this.paidSaleTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');


    var docDefinition = {

      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: 10,

      styles: {
        filledHeader: {
          bold: true,
          fontSize: 14,
          color: 'black',
          fillColor: '#eee',
        }
      },

        content: [
          //Company and Address
          {
            columns: [
              {
                width: '50%',
                text: this.bizProfile.companyName,
                fontSize: 40,
                alignment: 'left',
                margin: [20, 40, 0, 0],
                color: 'blue'
              },
              {
                width: '50%',
                text: [
                  {text: addressLine1, lineHeight: 1.5}, '\n',
                  {text: addressLine2, lineHeight: 1.5}, '\n',
                  {text: addressLine3, lineHeight: 1.5},
                ],
                fontSize: 12,
                alignment: 'right',
                margin: [0, 20, 10, 0],
                color: '#555'
              },
            ],
            columnGap: 10
          },

          //Sale Receipt or Invoice Number
          {
            text: this.saleIRTag + " " + this.saleIRNumber,
            alignment: 'center',
            fontSize: 20,
            margin: [0, 60, 0, 0],
            color: '#555'
          },

          //Line separator
          {
            canvas: [{type: 'line', x1: 0, y1: 0, x2: 560, y2: 0, lineWidth: 0.5}],
            alignment: 'center',
            margin: [0, 20, 0, 0]
          },

          // Billing Information
          {
            columns: [
              {
                width: '50%',
                text: [
                  {text: 'Bill to:', bold: true, lineHeight: 1.5}, '\n',
                  {image: 'pdfmake/images/person_icon.png', width: 10, height: 10}, {text: this.customerName, color: '#333'}, '\n',
                  {image: 'pdfmake/images/mail_icon.png', width: 150, height: 150}, this.customerEmail, '\n',
                  {image: 'pdfmake/images/call_icon.png', width: 150, height: 150}, {text: this.customerPhoneNumber, lineHeight: 1.5}, '\n',
                  this.cdStreet1 + " " + this.cdStreet2, '\n',
                  this.cdCity, '\n',
                  this.cdState, '\n',
                  this.cdCountry, '\n',
                ],
                fontSize: 12,
                alignment: 'left',
                margin: [10, 30, 0, 20],
                color: '#555'
              },
              {
                width: '50%',
                text: [
                  {text: date1, lineHeight: 1.5}, '\n',
                  date2,
                ],
                alignment: 'right',
                margin: [0, 30, 10, 0],
                color: '#555'
              },
            ],
            columnGap: 10
          },

          // Item details table
          {
            table: {
              headerRows: 1,
              widths: ['30%', '10%', '20%', '20%', '20%'],

              body: tableBody
            },
            layout: 'headerLineOnly'
          },

          // Subtotal item details table
          {
            table: {
              headerRows: 1,
              widths: ['50%', '20%', '30%'],

              body: [
                ['', '', '',],
                ['',{text: 'Subtotal', color: '#555', alignment: 'right'},{text: "₦" + subtotal, color: '#555', alignment: 'right'}],
                ['',{text: 'Discount', color: '#555', alignment: 'right'},{text: "₦" + discount, color: '#555', alignment: 'right'}],
                ['',{text: 'Shipping', color: '#555', alignment: 'right'},{text: "₦" + shipping, color: '#555', alignment: 'right'}],
                ['',{text: 'VAT', color: '#555', alignment: 'right'},{text: "₦" + vat, color: '#555', alignment: 'right'}],
              ]
            },
            layout: 'headerLineOnly'
          },

          // Total item details table
          {
            columns: [
              {
                width: '50%',
                text: '',

              },
              {
                width: '50%',
                table: {
                  headerRows: 1,
                  widths: ['40%', '60%'],

                  body: [
                    ['', '',],
                    [{text: 'Total', color: '#555', alignment: 'right'},{text: "₦" + total, color: '#555', alignment: 'right'}],
                    [{text: 'Paid', color: '#555', alignment: 'right'},{text: "₦" + paid, color: '#555', alignment: 'right'}],
                    [{text: 'Balance Due', color: '#555', alignment: 'right'},{text: "₦" + balanceDue, color: '#555', alignment: 'right'}],
                  ]
                },
                layout: 'headerLineOnly'


              },
            ],
            columnGap: 10
          },
          this.signedBy
        ]

      };

    pdfMake.createPdf(docDefinition).download(fileName);

  }

  sendEmail(){
    console.log(this.irPdf);

    let email = {
      to: 'idumajogu@gmail.com',
      //cc: 'erika@mustermann.de',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        this.irPdf
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }

}

