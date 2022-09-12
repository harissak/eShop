import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../../model.shopping';
import { ActionService } from '../action.service';
import { faForward, faBackward} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-action-women',
  templateUrl: './action-women.component.html',
  styleUrls: ['./action-women.component.css']
})
export class ActionWomenComponent implements OnInit {


  itemsWomen: ShoppingItem [] = [];
  itemsWomen2: ShoppingItem [] = [];
  indexItem = 0;
  faForward = faForward;
  faBackward = faBackward;

  constructor(private actionService: ActionService) { }

  ngOnInit(): void {
    this.actionService.getActionsItems();

    this.actionService.getUpdatedList()
     .subscribe(actionList => {
      this.itemsWomen = [];
       for(let item of actionList){
         if(item.category == 'Women') {

           const object = this.itemsWomen.find((itemOld, index, list) => {
             return item.id === itemOld.id;
           });
           if(object === undefined) {
             this.itemsWomen.push(item);

           }

         }
       }
       this.setArray(0);
     });


  }


  setNext() {
    if(this.indexItem+4 < this.itemsWomen.length)
    this.setArray(1);
  }

  setPrevious() {
      if(this.indexItem >0){
        this.setArray(-1);
      }
  }

  setArray(index : number) {
    this.indexItem += index;
    if(this.itemsWomen.length>4){
      this.itemsWomen2=[];
      for(let i=this.indexItem; i<this.indexItem+4;i++){

        this.itemsWomen2.push(this.itemsWomen[i]);
      }
    } else {
      this.itemsWomen2=this.itemsWomen;
    }

  }


}
