import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../../model.shopping';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {


  itemsKids?: ShoppingItem [];

  constructor(private service : GeneralService) { }

  ngOnInit(): void {

    this.service.getItems('Kids');
    this.service.getUpdatedList()
    .subscribe(actionList => {
      this.itemsKids = actionList;
     });

  }

}
