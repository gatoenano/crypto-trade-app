// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// Configs
import { API } from '../config/api';
import { APP } from '../config/app';
// Interfaces
import { Item, ListType, ListContentType } from '../interfaces';
// pipes
import { SortPipe } from '../pipes/sort.pipe';
import { DatePipe } from '@angular/common';


@Injectable()
export class ApiService {

  constructor(
    private _http: HttpClient,
    private sortPipe: SortPipe,
    private datePipe: DatePipe
  ) {
    // initialize localstorage var
    localStorage.setItem('cachedTradeDeals', JSON.stringify([]));
  }

  /**
   * Gets orders
   * @returns: Observable - object
   */
  getOrders(id: number, quantity: number): Observable<ListContentType> {
    // API call
    return this._http.get(API.ordersUrl + `?start=${id}&size=${quantity}`)
      .flatMap((data: Item[]) => data)
      .groupBy((data: Item) => data.type)
      .flatMap(data => data.reduce((prev, curr) => [...prev, curr], []))
      .toArray()
      .map((data: any[]) => {
        return this.setOrders(data);
      })
      .catch(error => Observable.throw(error || APP.errors.msg));
  }

  /**
   * Sets the order lists
   * @param data array
   */
  setOrders(data: any[]): ListContentType {
    console.log('ordersSubscription data: ', data);
    let list: ListContentType = {};

    if (data.length) {
      list = {
        buy: data.find(arr => arr[0].type === ListType[ListType.buy]),
        sell: data.find(arr => arr[0].type === ListType[ListType.sell])
      };
    }
    console.log('setOrders list: ', list);
    return list;
  }

  /**
   * Checks for trades
   * @param list object
   */
  checkForTrades(list: ListContentType): ListContentType {
    // new instance of buy list array
    const buyList: Item[] = Array.from(list.buy);
    // sort the array
    const buyListSorted: Item[] = this.sortPipe.transform(buyList, 'price');
    // initalize trade vars
    let tradeDeal: any = [];
    let tradeQuantity: number;
    list.trade = [];

    // filter possible trades
    buyListSorted.map((buyOrder: Item) => list.sell.map((sellOrder: Item) => {
      // for every buy order check all sell orders and their quantities
      if (buyOrder.price >= sellOrder.price && buyOrder.quantity !== 0 && sellOrder.quantity !== 0) {
        // cache the match in localstorage
        this.saveDataToLocalStorage(buyOrder, sellOrder);
        // calc average
        const avg = [buyOrder.price, sellOrder.price].reduce((p, c) => p + c, 0) / [buyOrder.price, sellOrder.price].length;
        // calc quantity
        const quantity = buyOrder.quantity - sellOrder.quantity;

        // if the buy order has quantity pending to buy yet but sell order is empty
        if (quantity > 0) {
          // set trade quantity
          tradeQuantity = quantity;
          // set the new quantity to the buy order
          buyOrder.quantity = quantity;
          // set the new quantity to the sell order
          sellOrder.quantity = 0;
        } else {
          // set trade quantity
          tradeQuantity = buyOrder.quantity;
          // set the new quantity to the buy order
          buyOrder.quantity = 0;
          // set the new quantity to the sell order
          sellOrder.quantity = Math.abs(quantity);
        }

        // set trade deal
        tradeDeal = {
          id: buyOrder.id.toString() + sellOrder.id.toString(),  // @TODO: set a random number
          type: this.datePipe.transform(new Date(), APP.defaults.dateFormat),
          price: avg,
          quantity: tradeQuantity
        };

        // set the trade deal to the trades list
        list.trade.push(tradeDeal);
      }
      return;
    }, []));

    return list;
  }

  /**
   * Sets the data related to trade deals
   * @param buyOrder object
   * @param sellOrder object
   */
  saveDataToLocalStorage(buyOrder: Item, sellOrder: Item): void {
    // initialize vars
    let currentStorage: Array<any> = [];
    let oldStorage: Array<any> = [];
    // get the old storage
    oldStorage = JSON.parse(localStorage.getItem('cachedTradeDeals'));
    // set the new data
    currentStorage = [{ id: buyOrder.id.toString() + sellOrder.id.toString(), buy: buyOrder, sell: sellOrder }];
    // set the new storage
    localStorage.setItem('cachedTradeDeals', JSON.stringify([].concat(currentStorage, oldStorage)));
  }

  /**
   * Return data related to a trade deal
   * @param id number
   */
  getDataFromLocalStorage(id: number): any {
    let storage: Array<any> = [];
    // get the storage
    storage = JSON.parse(localStorage.getItem('cachedTradeDeals'));
    return storage.filter(data => data.id === id)[0];
  }
}

