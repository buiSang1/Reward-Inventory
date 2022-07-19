import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
// const Get_getRewardInvenById = gql`
//   query ($ID: String!) {
//     getRewardInvenById(id: $ID) {
//       _id
//       name
//       description
//       type
//       price
//       total
//       shipping
//       sold
//       is_approve
//       image
//       active_flag
//     }
//   }
// `;
const Get_getRewardInventory = gql`
  query ($ID: String!) {
    getRewardInvenById(id: $ID) {
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
  }
`;
const Update_RewardInventory = gql`
mutation(
  $ID: String!,
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
){
  updateRewardInventory(
    id:$ID,
    RewardInventoryData:{
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
    _id
    name
    description
    create_at
    total
    price
  }
}`
@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss']
})
export class InventoryCreateComponent implements OnInit {
  selectedItem = '01';
  selectedItem1 = '01';
  selectedItem2 = '01';

  reward_inventory: inventory[] = [];
  names: string[] = [];
  public id: any;
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
    private route: ActivatedRoute

  ) { }



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
        let reward_inventory = Object.assign([], this.reward_inventory);
        reward_inventory.unshift(res['Register']);
        this.reward_inventory = reward_inventory;
        this.router.navigate(['/']);
      });



  }
  getRewardInventory(id: string) {

    this.apollo
      .watchQuery({
        query: Get_getRewardInventory,
        variables: {
          ID: id,

        },
      })
      .valueChanges.subscribe((res: any) => {

        console.log("Data: ", res.data.getRewardInvenById);
        for (const controlName in this.registerForm.controls) {
            if (controlName) {
              this.registerForm.controls['Name'].setValue(res.data.getRewardInvenById.name);
              this.registerForm.controls['Description'].setValue(res.data.getRewardInvenById.description);
              this.registerForm.controls['Type'].setValue(res.data.getRewardInvenById.type);
              this.registerForm.controls['Price'].setValue(res.data.getRewardInvenById.price);
              this.registerForm.controls['Active_flag'].setValue(res.data.getRewardInvenById.active_flag);
              this.registerForm.controls['Is_approve'].setValue(res.data.getRewardInvenById.is_approve);
              this.registerForm.controls['Total'].setValue(res.data.getRewardInvenById.total);
              this.registerForm.controls['Shipping'].setValue(res.data.getRewardInvenById.shipping);
              this.registerForm.controls['Sold'].setValue(res.data.getRewardInvenById.sold);
              this.registerForm.controls['Image'].setValue(res.data.getRewardInvenById.image);

            }

          }
      });

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID Here', this.id);
    if (this.id != '') {
      this.getRewardInventory(this.id);
    }

  }
  updateRewardInventory() {
    const data =  this.registerForm.value
    console.log(data);
    this.apollo
      .mutate({
        mutation: Update_RewardInventory,
        variables: {
          ID: this.id,
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
        let reward_inventory = Object.assign([], this.reward_inventory);
        reward_inventory.unshift(res['Update']);
        this.reward_inventory = reward_inventory;
        console.log('Update', this.reward_inventory);
        this.router.navigate(['/']);

      });
  }
  refresh(): void {
    window.location.reload();
  }


  clearForm() {
    this.registerForm.reset();
  }
  backInventoryList() {
    this.router.navigate(['/']);
  }
  toggleCard() {
    this.isCard = !this.isCard;
  }
}
