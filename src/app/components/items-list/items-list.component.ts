// Core
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
// Interfaces
import { ItemsGroupOptions, ListContentType } from '../../interfaces';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  animations: [
    trigger('easeInOut', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('0.5s ease-in-out', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('0.5s ease-in-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
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
  }
}
