import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GeneralService } from '../categories/services/general.service';
import { ShoppingItem } from '../model.shopping';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchItems: ShoppingItem []=[];

  searchItems2!: ShoppingItem [];
  searchedTerm!:string;


  constructor( private route: ActivatedRoute, private service: GeneralService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params : Params) => {
        this.searchedTerm = params['searchTerm'];
        this.service.getSearchedItems();
      }
    );

    this.service.getSearchedUpdatedList()
    .subscribe(actionList => {
      this.searchItems = [];
      for(let item of actionList) {
        const titleItem= item.title.toLowerCase();
        if(titleItem.includes(this.searchedTerm.toLowerCase())) {
          this.searchItems.push(item);
        }
      }
      this.searchItems2 = actionList;

     });


  }



}
