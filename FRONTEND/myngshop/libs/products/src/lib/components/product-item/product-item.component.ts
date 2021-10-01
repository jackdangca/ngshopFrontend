/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
	selector: 'products-product-item',
	templateUrl: './product-item.component.html',
	styles: [],
})
export class ProductItemComponent implements OnInit {
	@Input()
	product: Product = new Product;
	constructor() {}

	ngOnInit(): void {}
}
