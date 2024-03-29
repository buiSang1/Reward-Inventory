import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbCardModule, NbThemeModule, NbIconModule, NbSelectModule, NbDialogModule, NbDatepickerModule, NbInputModule, NbActionsModule, NbCheckboxModule, NbAlertModule, NbToastrModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryCreateComponent,
    ConfirmDialogComponent,

  ],
  imports: [
    BrowserAnimationsModule,
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
    NbAlertModule,
    NbToastrModule.forRoot(),
    Ng2SmartTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
