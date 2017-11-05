// Core
import { Component, OnInit } from '@angular/core';
// rxjs
import { Observable } from 'rxjs/Rx';
// App config
import { APP } from './config/app';
// Interfaces
import { Item, ItemsGroupOptions, ListType, ListContentType } from './interfaces';
// pipes
import { SortPipe } from './pipes/sort.pipe';
import { DatePipe } from '@angular/common';
// Services
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // defaults
  sellOrdersListTitle: string = APP.defaults.sellOrdersListTitle;
  buyOrdersListTitle: string = APP.defaults.buyOrdersListTitle;
  priceTitle: string = APP.defaults.priceTitle;
  quantityTitle: string = APP.defaults.quantityTitle;
  currencySymbol: string = APP.defaults.currency;
  creationDate: any = Date.now();

  // items list options
  options: ItemsGroupOptions = {
    title: this.sellOrdersListTitle,
    price: this.priceTitle,
    quantity: this.quantityTitle,
    currency: this.currencySymbol,
    date: this.creationDate,
    dateFormat: APP.defaults.dateFormat
  };

  // lists
  list$: Observable<ListContentType>;
  // trades related
  tradeDealInfo: Item;
  showTradeInfo: boolean;

  // UI loading
  reloadingData = false;
  countdown$: Observable<any>;
  tmp = 10;
  count = 0;

  constructor(
    private apiService: ApiService,
    private sortPipe: SortPipe,
    private datePipe: DatePipe
  ) {
    // once
    this.init();
    this.countDown();
  }

  ngOnInit() {
    // @TODO: just for development, remove when websockets are ready
    setInterval(() => {
      this.init();
      this.tmp = 10;
      this.countDown();
    }, 10000);
  }

  /**
   * Init function
   */
  init(): void {
    // subscribe to orders list
    this.list$ = this.apiService.getOrders(this.count, 30).share();

    this.list$.subscribe((data: ListContentType) => {
      // update counter
      this.count = this.count + 10;
      // check for trades
      // @TODO: remove delays when websockets are ready
      setTimeout(() => this.apiService.checkForTrades(data), 1500);
    });
  }

  /**
   * Shows info related to a trade deal
   * @param id number
   */
  showData(id: number): void {
    const tradeDealInfo = this.apiService.getDataFromLocalStorage(id);
    if (tradeDealInfo) {
      this.tradeDealInfo = tradeDealInfo;
      this.showTradeInfo = true;
    } else {
      this.showTradeInfo = false;
    }
  }

  /**
   * Closes the trade deals info box
   */
  closeInfoBox(): void {
    this.tradeDealInfo = null;
  }

  /**
   * Countdown timer (development purposes)
   */
  countDown() {
    this.countdown$ = Observable.timer(0, 1000)
      .take(this.tmp)
      .map(() => --this.tmp);
  }
}
