import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../../model.shopping';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.css']
})
export class ManComponent implements OnInit {


  itemsMan?: ShoppingItem [];

  constructor(private service : GeneralService) { }

  ngOnInit(): void {

    this.service.getItems('Man');

    this.service.getUpdatedList()
    .subscribe(actionList => {
      this.itemsMan = actionList;
     });

  }

}
