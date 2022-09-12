import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingItem } from '../model.shopping';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GeneralService } from '../categories/services/general.service';
import { ActionService } from '../action/action.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  addNewItemForm!: FormGroup;
  categories= ['Kids','Women', 'Man'];
  buttonTitle = 'ADD NEW ITEM';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string},
              private service: GeneralService,
              private newItemDialog: MatDialogRef<AddNewItemComponent>,
              private actionService : ActionService) { }

  ngOnInit(): void {
    if(this.data.id === ''){

      this.addNewItemForm = new FormGroup ({
        'title': new FormControl (null),
        'price': new FormControl (null),
        'sale': new FormControl (null),
        'category': new FormControl (null),
        'imageUrl': new FormControl (null),

        'size':new FormGroup({
          's': new FormControl (null),
          'sm': new FormControl (null),
          'm': new FormControl (null),
          'l': new FormControl (null),
          'xl': new FormControl (null),
          'xxl': new FormControl (null)
        })
      });

    } else {
      this.buttonTitle = 'UPDATE ITEM';
     let  item : ShoppingItem  = this.service.findByID(this.data.id);
     if(item == null) {
      item = this.actionService.findByID(this.data.id);

     }
       this.setUpForm(item);
    }

  }

  setUpForm(item :ShoppingItem) {

    let s = null;
    let sm = null;
    let m = null;
    let l = null;
    let xl = null;
    let xxl = null;

    for(let i=0; i< item.sizeAvailable.length; i++) {
      if(item.sizeAvailable[i] === 's') {
        s= item.sizeAvailable[i];
      } else if(item.sizeAvailable[i] === 'sm') {
        sm= item.sizeAvailable[i];
      } else if(item.sizeAvailable[i] === 'm') {
        m= item.sizeAvailable[i];
      } else if(item.sizeAvailable[i] === 'l') {
        l= item.sizeAvailable[i];
      } else if(item.sizeAvailable[i] === 'xl') {
        xl= item.sizeAvailable[i];
      } else if(item.sizeAvailable[i] === 'xxl') {
        xxl= item.sizeAvailable[i];
      }
    }


    this.addNewItemForm = new FormGroup ({
      'title': new FormControl (item.title),
      'price': new FormControl (item.price),
      'sale': new FormControl (item.sale),
      'category': new FormControl (item.category),
      'imageUrl': new FormControl (item.imageUrl),

      'size':new FormGroup({
        's': new FormControl (s),
        'sm': new FormControl (sm),
        'm': new FormControl (m),
        'l': new FormControl (l),
        'xl': new FormControl (xl),
        'xxl': new FormControl (xxl)
      })
    });

  }


  addNewItem() {

   const sizeArray = [];

   let newItem! : ShoppingItem;
   const s = (this.addNewItemForm.controls['size'] as FormGroup).controls['s'].value;
   const sm = (this.addNewItemForm.controls['size'] as FormGroup).controls['sm'].value;
   const m = (this.addNewItemForm.controls['size'] as FormGroup).controls['m'].value;
   const l = (this.addNewItemForm.controls['size'] as FormGroup).controls['l'].value;
   const xl = (this.addNewItemForm.controls['size'] as FormGroup).controls['xl'].value;
   const xxl = (this.addNewItemForm.controls['size'] as FormGroup).controls['xxl'].value;
   let sale = this.addNewItemForm.value['sale'];
   const title = this.addNewItemForm.value['title'];
   const price = this.addNewItemForm.value['price'];
   const category = this.addNewItemForm.value['category'];
   const imageUrl = this.addNewItemForm.value['imageUrl'];

   if(s){
    sizeArray.push('s');
   }
   if(sm){
    sizeArray.push('sm');
   }
   if(l){
    sizeArray.push('l');
   }
   if(xl){
    sizeArray.push('xl');
   }
   if(xxl){
    sizeArray.push('xxl');
   }
   if(m){
    sizeArray.push('m');
   }

   if(!sale) {
    sale = false;
   }

   if(this.buttonTitle === 'ADD NEW ITEM'){
      newItem = {id:'',title:title,price:price, category:category,imageUrl:imageUrl,sizeAvailable:sizeArray,sale:sale};
      this.service.addNewItem(newItem);

   } else  {
    const updatedItem : ShoppingItem = {id: this.data.id,title:title, price:price, category:category,imageUrl:imageUrl,sizeAvailable:sizeArray,sale:sale};
     this.service.updateItem(updatedItem);
   }

   this.newItemDialog.close();
   this.service.getItems(category);
   this.service.getUpdatedList();
   this.actionService.getUpdatedList();
   this.actionService.getActionsItems();
  }


}
