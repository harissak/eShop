import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { ActionService } from '../../action/action.service';
import { ShoppingItem } from '../../model.shopping';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private items : ShoppingItem[] = [];
  private itemsUpdateList = new Subject<ShoppingItem[]>();

  private itemsSearched : ShoppingItem[] = [];
  private itemsSearchedUpdateList = new Subject<ShoppingItem[]>();

  constructor(private http: HttpClient, private actionService : ActionService) { }

  getItems(category:string) {
    this.http.get<{message:String, deals:any}>('http://localhost:3000/api/'+category)
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
      this.items = transformedDeals;
      this.itemsUpdateList.next([...this.items]);

    });

  }


  getUpdatedList() {
    return this.itemsUpdateList.asObservable();
  }


  getSearchedItems() {
    this.http.get<{message:String, deals:any}>('http://localhost:3000/api/search')
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
      this.itemsSearched = transformedDeals;
      this.itemsSearchedUpdateList.next([...this.itemsSearched]);

    });
  }
  getSearchedUpdatedList() {
    return this.itemsSearchedUpdateList.asObservable();
  }

  addNewItem(newItem: ShoppingItem) {


    this.http.post<{message:string, itemID: string}>('http://localhost:3000/api/new/item',newItem)
    .subscribe( (responseMessage) => {

      const id = responseMessage.itemID;
      newItem.id = id;
      this.items.push(newItem);
      this.itemsUpdateList.next([...this.items]);
    });


   this.getItems(newItem.category);
   this.getUpdatedList();
   this.actionService.getUpdatedList();
   this.actionService.getActionsItems();
  }

  deleteItem( id:string) {
    this.http.delete('http://localhost:3000/api/item/delete/'+id)
    .subscribe(() => {
      const updatedItem = this.items.filter( item => item.id !== id);
      this.items = updatedItem;
      this.itemsUpdateList.next([...this.items])
      this.actionService.getActionsItems();
      this.actionService.getUpdatedList();

    });
  }

  findByID (id: string) : ShoppingItem {
    return (this.items.find( itemFromList => itemFromList.id === id)) as ShoppingItem;
  }


  updateItem(updatedItem : ShoppingItem) {

    this.http.put('http://localhost:3000/api/update/item/'+updatedItem.id, updatedItem)
    .subscribe ( response => {
      const updatedItems = [...this.items];
      const oldItemIndex = updatedItems.findIndex( idx => idx.id === updatedItem.id);

      const itemNew : ShoppingItem = {
        id: updatedItem.id,
        title:updatedItem.title,
        price : updatedItem.price,
        category : updatedItem.category,
        imageUrl: updatedItem.imageUrl,
        sizeAvailable: updatedItem.sizeAvailable,
        sale: updatedItem.sale

      };
      updatedItems[oldItemIndex] = itemNew;
      this.items = updatedItems;
      this.itemsUpdateList.next([...this.items]);

    })

    this.getItems(updatedItem.category);
    this.getUpdatedList();
    this.actionService.getUpdatedList();
    this.actionService.getActionsItems();

  }



}
