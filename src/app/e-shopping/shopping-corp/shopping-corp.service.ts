import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingItem } from '../model.shopping';
import { ShoppingCorp } from './model.shopping-corp';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCorpService {

  private shoppingCorp : ShoppingCorp[]=[];
  numberOfItems = new Subject<number>();
  totalPrice = new Subject<ShoppingCorp[]>();

  constructor() { }


  getShoppingCorp () {
    return this.shoppingCorp;
  }

  setShoppinCartToEmpry() {
    this.shoppingCorp=[];
    this.numberOfItems.next(0);
  }


  addToShoppingCorp(item: ShoppingCorp) {
    this.shoppingCorp.push(item);
    this.numberOfItems.next(this.shoppingCorp.length);
    this.totalPrice.next([...this.shoppingCorp]);
  }

  updateShoppingCorp(item: ShoppingCorp): boolean {

    let isTrue!:boolean;

    if(this.checkArray(item) !== undefined ) {

      let oldItem = this.checkArray(item);
      let nbrItem = Number(oldItem!.numberOfItems);
      nbrItem ++;
      oldItem!.numberOfItems = nbrItem;

      let singlePrice:any = parseFloat(item.totalPrice).toFixed(2);
      let price: any = singlePrice * oldItem!.numberOfItems;
      oldItem!.totalPrice = price.toString();

      isTrue = true;
    } else {
      isTrue = false;
    }


    this.totalPrice.next([...this.shoppingCorp]);
    return isTrue;

  }
  getTotalPriceOfCart():number {


    let totalPrice: number=0;

    for (let item of this.shoppingCorp) {
      let singlePrice= parseFloat(item.totalPrice).toFixed(2);
      totalPrice += Number(singlePrice);
    }

    return totalPrice;
  }

  checkArray(item: ShoppingCorp) {

   const object= this.shoppingCorp.find((itemOld, index, list) => {
      return itemOld.title == item.title && itemOld.sizeChoosen == item.sizeChoosen
    });
     return object;
  }

  increaseNbrOfItems( item : ShoppingCorp) {

    let nbrItem = item.numberOfItems;
    nbrItem ++;
    item.numberOfItems = nbrItem;

    let singlePrice : any = parseFloat(item.pricOfSingleItem).toFixed(2);
    let totalPrice = singlePrice * nbrItem;
    item.totalPrice = totalPrice.toString();

    this.totalPrice.next([...this.shoppingCorp]);
    return item;
  }

  decreaseNbrOfItems( item : ShoppingCorp) {

    let nbrItem = item.numberOfItems;
    if(nbrItem === 1){
      let object = this.shoppingCorp.find((itemOld, index, list) => {
        return itemOld.id == item.id
      });

      const index = this.shoppingCorp.indexOf(object as ShoppingCorp);
      this.shoppingCorp.splice(index,1);
      this.totalPrice.next([...this.shoppingCorp]);
    } else {

    nbrItem --;
    item.numberOfItems = nbrItem;
    let singlePrice : any = parseFloat(item.pricOfSingleItem).toFixed(2);
    let totalPrice = singlePrice * nbrItem;
    item.totalPrice = totalPrice.toString();

    this.totalPrice.next([...this.shoppingCorp]);
    }
    this.numberOfItems.next(this.shoppingCorp.length);

    return item;
  }




}
