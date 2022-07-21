import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {  NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';

import { Apollo, gql } from 'apollo-angular';
import { inventory } from 'src/app/models/inventory';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


const Get_getAllRewardInventory = gql`query{
  getAllRewardInventory{
    _id
    name
    description
    type
    price
    total
    shipping
    sold
    is_approve
    image
    active_flag
  }

}`
const Get_getRewardInvenById = gql`
  query ($id: String!) {
    getRewardInvenById(id: $id) {
      _id
      type
      is_approve
      active_flag
    }
  }
`;

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  reward_inventory: inventory[] = [];
  selectbyName = '';
  public status = '';
  reward_id = '';
  constructor(private apollo: Apollo,
    private router: Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {

    this.loadData();

  }
  private loadData() {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,
        fetchPolicy: 'network-only'

      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res?.data?.getAllRewardInventory;
        // console.log("data Reward Inventory", res);
      })
  }

  RemoveRewardInventory(id: string) {
    this.reward_id = id;
      this.apollo
        .mutate({
          mutation: Get_getRewardInvenById,
          variables: {
             id : id,
          },
        })
        .subscribe((res: any) => {
          this.open();
        });
    }

  addIventory() {
    this.router.navigate(['project', '']);
  }
  editRewardInventory(id: string) {
    this.apollo
      .watchQuery({
        query: Get_getRewardInvenById,
        variables: {
          id : id,

        },
      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res.data.getRewardInvenById;
      });

    this.router.navigate(['project', id]);
  }
  open() {
    this.dialogService.open(ConfirmDialogComponent, {
      context:
      {
        reward_id : this.reward_id
      }
    })
  }
}
