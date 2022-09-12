import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { AddNewItemComponent } from '../add-new-item/add-new-item.component';
import { GeneralService } from '../categories/services/general.service';
import { ShoppingItem } from '../model.shopping';
import { ShoppingCorp } from '../shopping-corp/model.shopping-corp';
import { ShoppingCorpService } from '../shopping-corp/shopping-corp.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  faTrashCan= faTrashCan;
  faPenToSquare = faPenToSquare;
  isLogedIn:boolean=false;
  selectedSize:any;
  nbrOfItems: number = 0;
  size:any;
  imgUrl="https://www.shirts-bedrukken.be/wp-content/uploads/sites/2/2021/06/61023036.jpg";
  @Input() itemsArray?:any;



  constructor(private service: GeneralService, private serShopCorp: ShoppingCorpService, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {

    this.checkLogin();

    this.authService.isLogedIn
    .subscribe(result => {
      this.isLogedIn=result
    });
  }

  deleteItem(id: string) {
    this.service.deleteItem(id);

  }

  editItem(id: string, sale :boolean) {
    this.dialog.open(AddNewItemComponent, {
      height:'auto',
      width:'auto',
      data:{id: id}
    });



  }

  checkLogin() {
   this.isLogedIn = this.authService.getLogInStatus();

  }
  selectChangeHandler (event: any) {
    this.selectedSize = event.target.value;
  }

  onBuyItem(item : ShoppingItem) {
    const sizeInitial= item.sizeAvailable[0];
    let size='';
    if(this.selectedSize == null) {
      size = sizeInitial;
    } else {
      size = this.selectedSize;
    }
    const title = item.title;
    const price = item.price;
    const imageUrl = item.imageUrl;

    const newCorpItem = new ShoppingCorp(item.id,title,price,price,imageUrl,size,1);


    if(!this.serShopCorp.updateShoppingCorp(newCorpItem)){
      this.serShopCorp.addToShoppingCorp(newCorpItem);
    } else {


    }


  }

}
