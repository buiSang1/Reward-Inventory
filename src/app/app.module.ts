import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbCardModule, NbThemeModule, NbIconModule, NbSelectModule, NbDialogModule, NbDatepickerModule, NbInputModule, NbActionsModule, NbCheckboxModule, NbAlertModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryCreateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    RouterModule.forRoot([]),
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbThemeModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbSelectModule,
    NbDialogModule.forRoot(),
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    NbDatepickerModule,
    NbActionsModule,
    GraphQLModule,
    HttpClientModule,
    NbCheckboxModule,
    NbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
