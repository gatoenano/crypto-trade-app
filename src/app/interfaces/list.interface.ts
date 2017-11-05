import { Item } from './index';

export enum ListType {
  buy,
  sell,
  trade
}

export interface ListContentType {
  buy?: Item[];
  sell?: Item[];
  trade?: Item[];
}
