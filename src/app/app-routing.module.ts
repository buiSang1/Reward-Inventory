import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';

const routes: Routes = [
  { path: '', component: InventoryListComponent },

  { path: 'project/:id', component: InventoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
