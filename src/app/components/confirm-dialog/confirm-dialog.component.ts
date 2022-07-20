import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
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
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  reward_inventory: inventory[] = [];
  public status = '';
  constructor(private apollo: Apollo,
    private toastrService: NbToastrService,) { }
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

      this.apollo
        .mutate({
          mutation: Delete_RewardInventory,
          variables: {
            idRewardInventory: inventoryid,
          },
        })
        .subscribe((res: any) => {

          if (res) {
            this.toastrService.success(this.status, `Delete completed successfully`,)
            // console.log("res", res);

            // this.toastrService.success(res.data.reward_inventory, "Xóa thành công", );
            // alert( )

          }
          this.loadData();
        });

  }
  ngOnInit(): void {
    this.loadData();
  }

}
