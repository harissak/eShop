import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';
import { SalesMenuComponent } from './menu/sales-menu/sales-menu.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EShoppingComponent } from './e-shopping/e-shopping.component';
import { ActionKidsComponent } from './e-shopping/action/action-kids/action-kids.component';
import { ActionWomenComponent } from './e-shopping/action/action-women/action-women.component';
import { ActionManComponent } from './e-shopping/action/action-man/action-man.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActionComponent } from './e-shopping/action/action.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './e-shopping/template/template.component';
import { KidsComponent } from './e-shopping/categories/kids/kids.component';
import { ManComponent } from './e-shopping/categories/man/man.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WomenComponent } from './e-shopping/categories/women/women.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from './auth/auth.service';
import { ActionService } from './e-shopping/action/action.service';
import {MatInputModule} from '@angular/material/input';
import { ShoppingCorpComponent } from './e-shopping/shopping-corp/shopping-corp.component';
import {HttpClientModule} from '@angular/common/http';
import { ShoppingCartListComponent } from './e-shopping/shopping-corp/shopping-cart-list/shopping-cart-list.component';
import { PlaceOrderComponent } from './e-shopping/shopping-corp/place-order/place-order.component';
import { AddNewItemComponent } from './e-shopping/add-new-item/add-new-item.component';
import { GeneralService } from './e-shopping/categories/services/general.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchComponent } from './e-shopping/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MenuComponent,
    SalesMenuComponent,
    MainMenuComponent,
    EShoppingComponent,
    ActionKidsComponent,
    ActionWomenComponent,
    ActionManComponent,
    ActionComponent,
    FooterComponent,
    TemplateComponent,
    KidsComponent,
    ManComponent,
    WomenComponent,
    AddNewItemComponent,
    ShoppingCorpComponent,
    ShoppingCartListComponent,
    PlaceOrderComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule

  ],
  providers: [AuthService, ActionService, GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
