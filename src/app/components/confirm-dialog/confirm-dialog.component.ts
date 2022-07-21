import { Component, Input, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
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
mutation ($id: String!) {
  deleteRewardInventory(id: $id) {
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
  @Input() reward_id = '';
  public status = '';
  public idRewardInventory: any ;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;


  constructor(private apollo: Apollo,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<ConfirmDialogComponent>
     ) { }
  private loadData() {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,
        fetchPolicy: 'network-only'

      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res?.data?.getAllRewardInventory;

      })
  }




  showToast(position: NbGlobalPosition, status: NbComponentStatus, duration: any ) {
     this.toastrService.show('', 'Inventory deleted successfully', {
       position,
       status,
       duration
     });
   }

  cancel() {
    this.dialogRef.close();
  }
  RemoveRewardInventory() {

    this.apollo
        .mutate({
          mutation: Delete_RewardInventory,
          variables: {
            id: this.reward_id,
          },
        })
        .subscribe((res: any) => {
          this.cancel();
          this.loadData();
        });

  }
  ngOnInit(): void {
    this.loadData();
  }

}
// this.toastrService.success(this.status, `Delete completed successfully`,)
