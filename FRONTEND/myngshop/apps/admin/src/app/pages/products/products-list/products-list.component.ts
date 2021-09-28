/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@myngshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'admin-products-list',
	templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy{
	products: Product[] = [];
	endsubs$: Subject<any> = new Subject();
	constructor(
		private productsService: ProductsService,
		private router: Router,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {}

	ngOnInit(): void {
		this._getProducts();
	}

	ngOnDestroy() {
		this.endsubs$.next();
		this.endsubs$.complete();
	}

	private _getProducts() {
		this.productsService
			.getProducts()
			.pipe(takeUntil(this.endsubs$))
			.subscribe((products) => {
				this.products = products;
			});
	}

	updateProduct(productid: string) {
		this.router.navigateByUrl(`products/form/${productid}`);
	}

	deleteProduct(productId: string) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this Product?',
			header: 'Delete Product',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.productsService
					.deleteProduct(productId)
					.pipe(takeUntil(this.endsubs$))
					.subscribe(
						() => {
							this._getProducts();
							this.messageService.add({
								severity: 'success',
								summary: 'Success',
								detail: 'Product is deleted!',
							});
						},
						() => {
							this.messageService.add({
								severity: 'error',
								summary: 'Error',
								detail: 'Product is not deleted!',
							});
						}
					);
			},
		});
	}
}
