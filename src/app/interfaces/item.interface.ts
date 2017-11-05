export interface Item {
  id: number;
  type: string;
  quantity: number;
  price: number;
}

export interface ItemsGroupOptions {
  title: string;
  price: string;
  quantity: string;
  currency: string;
  date: number;
  dateFormat: string;
}
