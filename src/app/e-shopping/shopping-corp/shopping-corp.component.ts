import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingCorp } from './model.shopping-corp';
import { ShoppingCorpService } from './shopping-corp.service';

@Component({
  selector: 'app-shopping-corp',
  templateUrl: './shopping-corp.component.html',
  styleUrls: ['./shopping-corp.component.css']
})
export class ShoppingCorpComponent implements OnInit {

  shoppinCorpList! : ShoppingCorp[];
  totalPrice:number = 0;
  orderInformation = true;

  constructor(private shoppingCorpSer : ShoppingCorpService,private router: Router, private newItemDialog: MatDialogRef<ShoppingCorpComponent>) { }

  ngOnInit(): void {



  }




  placeOrder() {
    this.newItemDialog.close();
    this.router.navigate(['order/finish']);

  }

}
