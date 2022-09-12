import { Component, OnInit } from '@angular/core';
import { ShoppingCorp } from '../model.shopping-corp';
import { ShoppingCorpService } from '../shopping-corp.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  shoppinCorpList! : ShoppingCorp[];
  totalPrice:number = 0;

  constructor(private shoppingCorpSer : ShoppingCorpService) { }

  ngOnInit(): void {

    this.shoppinCorpList = this.shoppingCorpSer.getShoppingCorp()
    for(let item of this.shoppinCorpList){
      let priceOfItems = parseFloat(item.totalPrice).toFixed(2);
       this.totalPrice += Number(priceOfItems);
    }

    this.shoppingCorpSer.totalPrice
    .subscribe ( result =>{
      this.totalPrice = 0

      for(let item of result){
        let priceOfItems = parseFloat(item.totalPrice).toFixed(2);
         this.totalPrice += Number( priceOfItems);

      }
    });

  }


  addOneItem(item : ShoppingCorp) {

    this.shoppingCorpSer.increaseNbrOfItems(item);

  }

  deleteOneItem(item : ShoppingCorp) {

    this.shoppingCorpSer.decreaseNbrOfItems(item);
  }

}
