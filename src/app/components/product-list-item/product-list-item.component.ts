import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../core/types/models/product';

@Component({
  selector: '[app-product-list-item]',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
