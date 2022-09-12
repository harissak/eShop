import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './e-shopping/action/action.component';
import { KidsComponent } from './e-shopping/categories/kids/kids.component';
import { ManComponent } from './e-shopping/categories/man/man.component';
import { WomenComponent } from './e-shopping/categories/women/women.component';
import { SearchComponent } from './e-shopping/search/search.component';
import { PlaceOrderComponent } from './e-shopping/shopping-corp/place-order/place-order.component';

const routes: Routes = [
  {path:'', redirectTo:'deals', pathMatch:'full'},
  {path:'deals', component:ActionComponent},
  {path:'women', component:WomenComponent},
  {path:'man', component:ManComponent},
  {path:'kids', component:KidsComponent},
  {path:'contact', component:KidsComponent},
  {path:'order/finish', component:PlaceOrderComponent},
  {path:'search/:searchTerm', component:SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
