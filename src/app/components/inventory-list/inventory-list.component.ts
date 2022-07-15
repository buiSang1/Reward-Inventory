import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { inventory } from 'src/app/models/inventory';


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
const Get_getRewardInvenByName = gql`
query($NAME: String!){
  getRewardInvenByName(name:$NAME){
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

const Delete_RewardInventory = gql`
mutation ($idRewardInventory: String!) {
  removeRewardInventory(id: $idRewardInventory) {
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
  reward_inventor: inventory[] = [];
  names: string[] = [];
  selectbyName = '';

  constructor(private apollo: Apollo,

    ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,

      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.getAllRewardInventory;
        console.log("data Reward Inventory", res);
      })
  }

  SearchRewardInvenByName() {
    this.apollo
      .watchQuery({
        query: Get_getRewardInvenByName,
        variables:
        {
          NAME: this.selectbyName,
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.getRewardInvenByName;
        console.log("Search By Name: ", this.reward_inventor)
      })
  }
  RemoveRewardInventory(inventoryid: string) {
    this.apollo
      .mutate({
        mutation: Delete_RewardInventory,
        variables: {
          idRewardInventory: inventoryid,
        },
      })
      .subscribe((res: any) => {
        this.reward_inventor = res.data.Delete_RewardInventory;
      });

    console.log('ID', inventoryid);
    this.refresh();

  }
  refresh(): void {
    window.location.reload();
  }

}
