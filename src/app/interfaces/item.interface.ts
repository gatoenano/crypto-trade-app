export interface Item {
  id: number;
  side: string;
  quantity: number;
  price: number;
}

export interface ItemsListInfo {
  title: string;
  price: string;
  quantity: string;
  currency: string;
  date: number;
}

export interface ItemsGroup {
  info?: ItemsListInfo;
  items?: Item[];
}

export interface ItemsGroupOptions {
  dateFormat: string;
}
