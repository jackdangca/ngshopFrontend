/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '@myngshop/orders';
import { MessageService } from 'primeng/api';

const ORDER_STATUS = {
	0: {
		label: 'Pending',
		color: 'primary',
	},
	1: {
		label: 'Processed',
		color: 'warning',
	},
	2: {
		label: 'Shipped',
		color: 'warning',
	},
	3: {
		label: 'Delivered',
		color: 'success',
	},
	4: {
		label: 'Failed',
		color: 'danger',
	},
};

@Component({
	selector: 'admin-orders-detail',
	templateUrl: './orders-detail.component.html',
	styles: [],
})
export class OrdersDetailComponent implements OnInit {
	order: any;
	orderStatuses = [];
	selectedStatus: any;
	orderItems: any;

	constructor(
		private orderService: OrdersService,
		private messageService: MessageService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._mapOrderStatus();
    	this._getOrder();
	}

	private _mapOrderStatus() {
		this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
			return {
				id: key,
				name: ORDER_STATUS[key].label,
			};
		});
	}

	private _getOrder() {
		this.route.params.subscribe((params) => {
			if (params.id) {
				this.orderService.getOrder(params.id).subscribe((order) => {
					this.order = order;
					this.orderItems = order.orderItems;
					this.selectedStatus = order.status;
				});
			}
		});
	}

	onStatusChange(event) {
		this.orderService
			.updateOrder({ status: event.value }, this.order.id)
			.subscribe(
				() => {
					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						detail: 'Order is updated!',
					});
				},
				() => {
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: 'Order is not updated!',
					});
				}
			);
	}
}
