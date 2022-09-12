import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCorpService } from '../shopping-corp.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {


  shoppingCartList?:any;
  totalPrice: number=0;
  deliveryInformationsForm!: FormGroup;

  constructor(private cartService : ShoppingCorpService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCartList = this.cartService.getShoppingCorp();

    this.deliveryInformationsForm = new FormGroup ({
      'fName': new FormControl (null, Validators.required),
        'lName': new FormControl (null, Validators.required),
        'email': new FormControl (null, Validators.required),
        'rEmail': new FormControl (null, Validators.required),
        'address': new FormControl (null, Validators.required),
        'address2': new FormControl (null),
        'country': new FormControl (null, Validators.required),
        'city': new FormControl (null, Validators.required),
        'zip': new FormControl (null, Validators.required),
    });


  this.totalPrice = Number(this.cartService.getTotalPriceOfCart());

  }


  sendMyOrder() {

    this.router.navigate(['deals']);
    alert("Your order has been successfuly placed. We will contact you as soon as possible");
    this.cartService.setShoppinCartToEmpry();
  }



}
