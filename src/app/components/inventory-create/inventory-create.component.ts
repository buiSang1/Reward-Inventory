import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
    type
    total
    price
    shipping
    sold
  }
}
`
const Get_getRewardInvenById = gql`
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
    type
    is_approve
    active_flag
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
  selectedItem: string = '01';

  selectedItem1: string = '01';

  selectedItem2: string = '01';
  data = {};
  registerForm: FormGroup;
  reward_inventory: inventory[] = [];
  names: string[] = [];
  public id: any;
  isCard: boolean = true;



  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder

  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      active_flag: new FormControl('', Validators.required),
      shipping: new FormControl('', Validators.required),
      sold: new FormControl('', Validators.required),
      is_approve: new FormControl('', Validators.required),
      image: new FormControl(''),

    });
  }



  RegisterInventory() {
    this.apollo
      .mutate({
        mutation: Posts_register,
        variables: {
          NAME: this.registerForm.controls['name'].value,
          DESCRIPTION: this.registerForm.controls['description'].value,
          PRICE: this.registerForm.controls['price'].value,
          TYPE: this.registerForm.controls['type'].value,
          TOTAL: this.registerForm.controls['total'].value,
          ACTIVEFLAG: this.registerForm.controls['active_flag'].value,
          SHIPPING: this.registerForm.controls['shipping'].value,
          SOLD: this.registerForm.controls['sold'].value,
          ISAPPROVE: this.registerForm.controls['is_approve'].value,
          IMAGE: this.registerForm.controls['image'].value,
        },
      })
      .subscribe((res: any) => {
        let reward_inventory = Object.assign([], this.reward_inventory);
        reward_inventory.unshift(res['Register']);
        this.reward_inventory = reward_inventory;
        // console.log('Register inventory', this.inventory);


        this.router.navigate(['/']);
      });



  }
  getRewardInventory(id: string) {

    this.apollo
      .watchQuery({
        query: Get_getRewardInvenById,
        variables: {
          ID: id,

        },
      })
      .valueChanges.subscribe((res: any) => {
        this.data = res.data.getRewardInvenById
        this.registerForm.patchValue({ ...this.data })
        // console.log(this.data);
        // console.log(this.selectedItem)

      });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != '') {
      this.getRewardInventory(this.id);
    }

    // console.log(this.selectedItem)
  }
  updateRewardInventory() {
    const data = this.registerForm.value
    console.log('update', data);
    this.apollo
      .mutate({
        mutation: Update_RewardInventory,
        variables: {
          ID: this.id,
          NAME: this.registerForm.controls['name'].value,
          DESCRIPTION: this.registerForm.controls['description'].value,
          PRICE: this.registerForm.controls['price'].value,
          TYPE: this.registerForm.controls['type'].value,
          TOTAL: this.registerForm.controls['total'].value,
          ACTIVEFLAG: this.registerForm.controls['active_flag'].value,
          SHIPPING: this.registerForm.controls['shipping'].value,
          SOLD: this.registerForm.controls['sold'].value,
          ISAPPROVE: this.registerForm.controls['is_approve'].value,
          IMAGE: this.registerForm.controls['image'].value,
        },

      })
      .subscribe((res: any) => {
        let reward_inventory = Object.assign([], this.reward_inventory);
        reward_inventory.unshift(res['Update']);
        this.reward_inventory = reward_inventory;
        // console.log('Update', this.inventory);
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
