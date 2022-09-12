import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faUser,faCartShopping, faBars} from '@fortawesome/free-solid-svg-icons';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AddNewItemComponent } from 'src/app/e-shopping/add-new-item/add-new-item.component';
import { ShoppingCorpComponent } from 'src/app/e-shopping/shopping-corp/shopping-corp.component';
import { ShoppingCorpService } from 'src/app/e-shopping/shopping-corp/shopping-corp.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  faUser = faUser;
  faCartShopping = faCartShopping;
  faBars = faBars;
  categories=['Deals','Women', 'Man', 'Kids'];
  selected:string ='Deals';
  isLogedIn= false;
  totalNumberOfItems = 0;
  @ViewChild('f') searchForm! : NgForm;


  constructor(private shoppingCorpSer: ShoppingCorpService, private router: Router,public dialog:MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLogedIn
    .subscribe(result => {
      this.isLogedIn= result;

    });

    this.shoppingCorpSer.numberOfItems
    .subscribe( nbrTotal => {

      this.totalNumberOfItems = nbrTotal;
    });

  }

  changeCategory(){
    this.router.navigate([this.selected.toLowerCase()]);
  }

  login() {
    this.dialog.open(AuthComponent, {
      height:'auto',
      width:'auto'
    });
  }

  logOut() {
    this.authService.logout();
  }

  addNewItem() {
    this.dialog.open(AddNewItemComponent, {
      height:'auto',
      width:'auto',
      data:{id:''}
    });
  }

  shoppingList() {
    this.dialog.open(ShoppingCorpComponent, {
      height:'auto',
      width:'AUTO'
    });
  }

  onSubmit(form: NgForm) {
    const searchTerm = form.value['search'];
    this.router.navigate(['search',searchTerm]);
    this.searchForm.reset();
  }
}
