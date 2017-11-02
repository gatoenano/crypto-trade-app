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
import { Item } from '../interfaces/item.interface';


@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  /**
   * Gets orders
   * @returns: Observable - array of objects
   */
  getOrders(): Observable<Item[]> {
    // API call
    return this._http.get(API.ordersUrl)
      .map((data: Item[]) => data)
      .catch(error => Observable.throw(error || APP.errors.msg));
  }
}

