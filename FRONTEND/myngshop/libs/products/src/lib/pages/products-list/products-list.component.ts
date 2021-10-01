/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
	selector: 'products-list',
	templateUrl: './products-list.component.html',
	styles: [],
})
export class ProductsListComponent implements OnInit {
	products: Product[] = [];
	categories: Category[] = [];
	isCategoryPage;
	constructor(
		private prodService: ProductsService,
		private catService: CategoriesService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			params.categoryid
				? this._getProducts([params.categoryid])
				: this._getProducts();
			params.categoryid
				? (this.isCategoryPage = true)
				: (this.isCategoryPage = false);
		});
		this._getCategories();
	}

	private _getProducts(categoriesFilter?: any) {
		this.prodService
			.getProducts(categoriesFilter)
			.subscribe((resProducts) => {
				this.products = resProducts;
			});
	}

	private _getCategories() {
		this.catService.getCategories().subscribe((resCats) => {
			this.categories = resCats;
		});
	}

	categoryFilter() {
		const selectedCategories = this.categories
			.filter((category) => category.checked)
			.map((category) => category.id);

		this._getProducts(selectedCategories);
	}
}
