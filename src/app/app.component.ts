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

  // UI loading
  reloadingData = false;
  count = 0;
  timerSubscription: any;
  tradeDealInfo: Item;

  constructor(
    private apiService: ApiService,
    private sortPipe: SortPipe,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.init();
  }

  /**
   * Init function
   */
  init(): void {

    // start a timer after one second
    /*
    const timer = Observable.timer(2000, 3000);
    this.timerSubscription = timer.subscribe((t: any) => {
      // call your getPowerBlock function here
      console.log('you t: ', t);
      // subscribe to orders list
      this.list$ = this.apiService.getOrders(this.count, 20).share();
      console.log('this.list$: ', this.list$);
      // check for trades
      this.list$.subscribe((data: ListContentType) => {
        console.log('this.list$ subscribe data: ', data);
        this.checkForTrades(data);
        this.count = this.count + 10;
      });
    });
    */
    // subscribe to orders list
    this.list$ = this.apiService.getOrders(this.count, 20).share();

    // check for trades
    this.list$.subscribe((data: ListContentType) => {
      console.log('this.list$ subscribe data: ', data);
      // check for trades
      const list = this.apiService.checkForTrades(data);
      // set the show to display
      this.showLatestResults(list);
      this.count = this.count + 10;
    });
  }

  /**
   * Sets the maximum results to display for every type
   * @param list object
   */
  showLatestResults(list: ListContentType): ListContentType {
    list = {
      buy: list.buy.slice(Math.max(list.buy.length - 20, 0)),
      sell: list.sell.slice(Math.max(list.sell.length - 20, 0)),
      trade: list.trade.slice(Math.max(list.trade.length - 30, 0)),
    };

    return list;
  }

  /**
   * Shows info related to a trade deal
   * @param id number
   */
  showData(id: number): void {
    this.tradeDealInfo = this.apiService.getDataFromLocalStorage(id);
  }
}
