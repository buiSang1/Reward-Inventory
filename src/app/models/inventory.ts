export interface inventory {
  _id : string;
  name : string;
  description : string;
  type: string;
  price: number;
  total: number;
  shipping: number;
  sold:number;
  is_approve: boolean;
  image:[string];
  active_flag: boolean;
}
