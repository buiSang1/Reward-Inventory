import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NbDialogRef } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { inventory } from 'src/app/models/inventory';

const Posts_register = gql`
mutation(
  $NAME: String!,
  $DESCRIPTION:String!,
  $PRICE:Float!,
  $TYPE:String!,
  $TOTAL:Float!,
  $ACTIVEFLAG:Boolean!
  $SHIPPING:Float!,
  $SOLD:Float!,
  $ISAPPROVE: Boolean!,
  $IMAGE:[String!]
)
{
  creareRewardInventory(
    createRewardInventoryData:{
      name:$NAME,
      description:$DESCRIPTION,
      price:$PRICE,
      type:$TYPE,
      total:$TOTAL,
      active_flag:$ACTIVEFLAG,
      shipping:$SHIPPING,
      sold:$SOLD,
      is_approve:$ISAPPROVE,
      image:$IMAGE,
    }
  ){
    name
    description
    create_at
    total
    price
  }
}
`

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss']
})
export class InventoryCreateComponent implements OnInit {
  selectedItem = '01';
  selectedItem1 = '01';
  selectedItem2 = '01';
  inventory: inventory[] = [];
  names: string[] = [];

  isCard: boolean = true;

  registerForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    Total: new FormControl('', Validators.required),
    Active_flag: new FormControl('', Validators.required),
    Shipping: new FormControl('', Validators.required),
    Sold: new FormControl('', Validators.required),
    Is_approve: new FormControl('', Validators.required),
    Image: new FormControl('', Validators.required),

  });

  constructor(
    private apollo: Apollo,
    private router: Router,
    // protected dialogRef: NbDialogRef<InventoryCreateComponent>
  ) { }
  ngOnInit(): void { }


  RegisterInventory() {
    this.apollo
      .mutate({
        mutation: Posts_register,
        variables: {
          NAME: this.registerForm.controls['Name'].value,
          DESCRIPTION: this.registerForm.controls['Description'].value,
          PRICE: this.registerForm.controls['Price'].value,
          TYPE: this.registerForm.controls['Type'].value,
          TOTAL: this.registerForm.controls['Total'].value,
          ACTIVEFLAG: this.registerForm.controls['Active_flag'].value,
          SHIPPING: this.registerForm.controls['Shipping'].value,
          SOLD: this.registerForm.controls['Sold'].value,
          ISAPPROVE: this.registerForm.controls['Is_approve'].value,
          IMAGE: this.registerForm.controls['Image'].value,
        },
      })
      .subscribe((res: any) => {
        let inventory = Object.assign([], this.inventory);
        inventory.unshift(res['Register']);
        this.inventory = inventory;
        console.log('Register inventory', this.inventory);
        this.router.navigate(['/']);
        // this.refresh();


      });

  }
  // refresh(): void {
  //   window.location.reload();
  // }


  toggleCard (){
    this.isCard = !this.isCard;
  }
}
