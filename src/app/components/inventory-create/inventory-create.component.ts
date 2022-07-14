import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss']
})
export class InventoryCreateComponent implements OnInit {
  selectedItem = '0';
  selectedItem1 = '0';
  users: any[] = [];
  names: string[] = [];
  inputname = '';
  isCard: boolean = true;
  registerForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
  });
  constructor() { }

  ngOnInit(): void {
  }
  toggleCard (){
    this.isCard = !this.isCard;
  }
}
