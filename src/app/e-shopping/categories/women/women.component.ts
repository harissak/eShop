import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../../model.shopping';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  itemsWomen!: ShoppingItem [];

  constructor(private service : GeneralService) { }

  ngOnInit(): void {

    this.service.getItems('Women');
    this.service.getUpdatedList()
    .subscribe(actionList => {
      this.itemsWomen = actionList;
     });




  }

}
