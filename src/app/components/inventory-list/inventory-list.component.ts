import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

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
  query ($ID: String!) {
    getRewardInvenById(id: $ID) {
      _id
      type
      is_approve
      active_flag
    }
  }
`;

const Delete_RewardInventory = gql`
mutation ($idRewardInventory: String!) {
  deleteRewardInventory(id: $idRewardInventory) {
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
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  reward_inventory: inventory[] = [];
  selectbyName = '';
  public status = "suscess"
  constructor(private apollo: Apollo,
    private router: Router,
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

  RemoveRewardInventory(inventoryid: string) {
    let confirmResult = confirm("Are you sure you want to remove this reward inventory");
    if (confirmResult) {
      this.apollo
        .mutate({
          mutation: Delete_RewardInventory,
          variables: {
            idRewardInventory: inventoryid,
          },
        })
        .subscribe((res: any) => {

          if (res) {


            // this.toastrService.success(res.data.reward_inventory, "Xóa thành công", );
            alert("Delete!!")
            this.loadData();
          }
        });
    }
  }
  addIventory() {
    this.router.navigate(['project', '']);
  }
  editRewardInventory(id: string) {
    this.apollo
      .watchQuery({
        query: Get_getRewardInvenById,
        variables: {
          ID: id,

        },
      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res.data.getRewardInvenById;
        // console.log('Search By ID: ', id);
        // console.log("Data: ", res.data.getRewardInvenById);
        // console.log("res data:",res.data.getRewardInvenById.name)

      });

    this.router.navigate(['project', id]);
  }

}
