import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  reward_inventory: inventory[] = [];
  selectbyName = '';



  constructor(private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger
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

        this.reward_inventory = res?.data?.getRewardInvenByName;
        console.log("Search By Name: ", this.reward_inventory)
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
        this.reward_inventory = res.data.Delete_RewardInventory;
      });

    console.log('ID', inventoryid);
    this.refresh();

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
        console.log('Search By ID: ', id);
        console.log("Data: ", res.data.getRewardInvenById);
        // console.log("res data:",res.data.getRewardInvenById.name)
        setTimeout(() => {
          // this.refresh();
        }, 0);
      });

    this.router.navigate(['project', id]);
  }
  refresh(): void {
    window.location.reload();
  }
}
