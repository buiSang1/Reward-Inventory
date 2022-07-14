import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  users: any[] = [
    {
      "_id": "62cd328d59748f9f0b0b5aa8",
      "email": "hinata@gmail.com",
      "name": "Hinata",
      "password": "$2b$10$8Q.U8zL/C8J5gafCGYwE7.YX8THGKSK1nm2w9xXvBLdhEOJYe1Uc2",
      "username": "hinata"
    },
    {
      "_id": "62ce1aa023a80dc211d99182",
      "email": "naruto@gmail.com",
      "name": "Naruto",
      "password": "$2b$10$vcNjWsH/YCxOffoPQRjaAOvH2NmCpYeHHcg1L4RPLUmqvQQezoGSS",
      "username": "Naruto"
    },
    {
      "_id": "62ce6e9d23a80dc211d99221",
      "email": "vegeta@gmail.com",
      "name": "Vegeta",
      "password": "$2b$10$goaPq8VTPzML4mhRQVrnQuJ02OMY.VkgweCo5JjiKuJHvCDxHc6eO",
      "username": "vegeta"
    },
    {
      "_id": "62ce7c2723a80dc211d9924d",
      "email": "songoku@gmail.com",
      "name": "Son Goku",
      "password": "$2b$10$6NB3W0LJyyj1x0FOFQ6Wq.laj/o/i5XK/OE4q6nh1yCIkKXT6Dxhq",
      "username": "goku"
    },
    {
      "_id": "62ce822cdab8076717d209b1",
      "email": "sakura@gmail.com",
      "name": "Haruno Sakura",
      "password": "$2b$10$Qc9AuJSiKfHDnINjvjNlyuooqJfWVDRBp9In5YTKovN4V1xW8omDC",
      "username": "sakura"
    },
    {
      "_id": "62ce8244dab8076717d209b5",
      "email": "sasuke@gmail.com",
      "name": "Uchiha Sasuke",
      "password": "$2b$10$alVQXNZPnvIfhTehj.quAutIQ4g9EutVOI3rKYgtLffGe.Dv9DbrC",
      "username": "sasuke"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
