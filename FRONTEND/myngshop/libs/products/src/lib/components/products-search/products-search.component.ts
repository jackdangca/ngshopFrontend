/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'products-search',
	templateUrl: './products-search.component.html',
	styles: [],
})
export class ProductsSearchComponent implements OnInit {
	constructor() {
		console.log('test');
	}

	ngOnInit(): void {
		console.log('Test');
	}
}
