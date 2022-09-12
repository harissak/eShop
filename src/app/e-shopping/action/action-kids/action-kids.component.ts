import { Component, OnInit } from '@angular/core';
import { ActionService } from '../action.service';
import {ShoppingItem} from '../../model.shopping';
import { faForward, faBackward} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-action-kids',
  templateUrl: './action-kids.component.html',
  styleUrls: ['./action-kids.component.css']
})
export class ActionKidsComponent implements OnInit {


  itemsKids: ShoppingItem [] = [];
  itemsKids2: ShoppingItem [] = [];
  indexItem = 0;
  faForward = faForward;
  faBackward = faBackward;


  constructor(private actionService: ActionService) { }

  ngOnInit(): void {

    this.actionService.getActionsItems();

   this.actionService.getUpdatedList()
    .subscribe(actionList => {
      this.itemsKids = [];
      for(let item of actionList){
        if(item.category == 'Kids') {

          const object = this.itemsKids.find((itemOld, index, list) => {
            return item.id === itemOld.id;
          });
          if(object === undefined) {
            this.itemsKids.push(item);

          }

        }
      }
      this.setArray(0);
    });

  }

  setNext() {
    if(this.indexItem+4 < this.itemsKids.length)
    this.setArray(1);
  }

  setPrevious() {
      if(this.indexItem >0){
        this.setArray(-1);
      }
  }

  setArray(index : number) {
    this.indexItem += index;
    if(this.itemsKids.length>4){
      this.itemsKids2=[];
      for(let i=this.indexItem; i<this.indexItem+4;i++){

        this.itemsKids2.push(this.itemsKids[i]);
      }
    } else {
      this.itemsKids2=this.itemsKids;
    }

  }
}
