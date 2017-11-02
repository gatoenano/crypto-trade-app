// Core
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// Interfaces
import { ItemsGroupOptions, ItemsGroup } from '../../interfaces/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html'
})
export class ItemsListComponent implements OnInit {
  // input to get the items
  @Input() list: ItemsGroup;

  // options for the component
  @Input() options: ItemsGroupOptions;

  // event of the selected item
  @Output() selected = new EventEmitter<number>();

  // index of the selected item
  selectedItem: number;

  constructor() { }

  ngOnInit(): void {
    console.log('ItemsListComponent loaded');
  }

  /**
   * Set element to active state
   * @param index
   */
  activeItem(index: number) {
    this.selectedItem = index;
    console.log('selected item index: ', this.selectedItem);
  }
}
