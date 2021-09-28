/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '@myngshop/orders';
import { ProductsService } from '@myngshop/products';
import { UsersService } from '@myngshop/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'admin-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
	statistics = [];
	endsubs$: Subject<any> = new Subject();
	constructor(
		private userService: UsersService,
		private productService: ProductsService,
		private ordersService: OrdersService
	) {}

	ngOnInit(): void {
		combineLatest([
			this.ordersService.getOrdersCount(),
			this.productService.getProductsCount(),
			this.userService.getUsersCount(),
			this.ordersService.getTotalSales(),
		])
			.pipe(takeUntil(this.endsubs$))
			.subscribe((values) => {
				this.statistics = values;
			});
	}

	ngOnDestroy() {
		this.endsubs$.next();
		this.endsubs$.complete();
	}
}
