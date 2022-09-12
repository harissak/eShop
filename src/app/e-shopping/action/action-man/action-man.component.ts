import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../../model.shopping';
import { ActionService } from '../action.service';
import { faForward, faBackward} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-action-man',
  templateUrl: './action-man.component.html',
  styleUrls: ['./action-man.component.css']
})
export class ActionManComponent implements OnInit {

  itemsMan: ShoppingItem []=[];
  itemsMan2: ShoppingItem [] = [];
  indexItem = 0;
  faForward = faForward;
  faBackward = faBackward;

  constructor(private actionService: ActionService) { }

  ngOnInit(): void {
   this.actionService.getActionsItems();

   this.actionService.getUpdatedList()
    .subscribe(actionList => {
      this.itemsMan = [];
      for(let itemMan of actionList){
        if(itemMan.category == 'Man') {

          const object = this.itemsMan.find((itemOld, index, list) => {
            return itemMan.id === itemOld.id;
          });
          if(object === undefined) {
            this.itemsMan.push(itemMan);

          }

        }
      }
      this.setArray(0);
    });

  }

  setNext() {
    if(this.indexItem+4 < this.itemsMan.length)
    this.setArray(1);
  }

  setPrevious() {
      if(this.indexItem >0){
        this.setArray(-1);
      }
  }

  setArray(index : number) {
    this.indexItem += index;
    if(this.itemsMan.length>4){
      this.itemsMan2=[];
      for(let i=this.indexItem; i<this.indexItem+4;i++){

        this.itemsMan2.push(this.itemsMan[i]);
      }
    } else {
      this.itemsMan2=this.itemsMan;
    }

  }

}
