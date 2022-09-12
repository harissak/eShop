import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingItem } from '../model.shopping';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private itemsAction : ShoppingItem[] = [];

  private itemsUpdateActionList = new Subject<ShoppingItem[]>();

  constructor(private http: HttpClient) { }


  getActionsItems() {
    this.http.get<{message:String, deals:any}>('http://localhost:3000/api/deals')
    .pipe(map ((dealsData) => {

      return dealsData.deals.map((deal:any) => {
        return {
          id: deal._id,
          title:deal.title,
          price : deal.price,
          category : deal.category,
          imageUrl: deal.imageUrl,
          sizeAvailable: deal.sizeAvailable,
          sale: deal.sale
        };
      });
    }))
    .subscribe((transformedDeals) => {
      this.itemsAction = transformedDeals;
      this.itemsUpdateActionList.next([...this.itemsAction]);

    });



  }

  getUpdatedList() {
    return this.itemsUpdateActionList.asObservable();
  }

  findByID (id: string) : ShoppingItem {
    return (this.itemsAction.find( itemFromList => itemFromList.id === id)) as ShoppingItem;
  }


}
