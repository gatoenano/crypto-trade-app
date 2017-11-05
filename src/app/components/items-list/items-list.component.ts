// Core
import { Component, Input, Output, EventEmitter } from '@angular/core';
// Interfaces
import { ItemsGroupOptions, ListContentType } from '../../interfaces';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html'
})
export class ItemsListComponent {
  // input to get the items
  @Input() list: ListContentType;

  // options for the component
  @Input() options: ItemsGroupOptions;

  // event of the selected item
  @Output() selected = new EventEmitter<number>();

  // index of the selected item
  selectedItem: number;

  constructor() { }

  /**
   * Set element to active state
   * @param index
   */
  activeItem(index: number) {
    this.selectedItem = index;
    console.log('selected item index: ', this.selectedItem);
  }
}
