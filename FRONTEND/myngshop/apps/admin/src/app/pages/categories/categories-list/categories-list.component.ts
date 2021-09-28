import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@myngshop/products';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'admin-categories-list',
	templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit, OnDestroy {
	categories: Category[] = [];
	endsubs$: Subject<any> = new Subject();

	constructor(
		private categoriesService: CategoriesService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this._getCategories();
		this.endsubs$.complete();
	}

	ngOnDestroy() {
		this.endsubs$.next();
		this.endsubs$.complete();
	}

	deleteCategory(categoryId: string) {
		this.confirmationService.confirm({
			message: 'Do you want to Delete this Category?',
			header: 'Delete Category',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.categoriesService.deleteCategory(categoryId).subscribe(
					() => {
						this._getCategories();
						this.messageService.add({
							severity: 'success',
							summary: 'Success',
							detail: 'Category is deleted!',
						});
					},
					() => {
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: 'Category is not deleted!',
						});
					}
				);
			},
		});
	}

	updateCategory(categoryid: string) {
		this.router.navigateByUrl(`categories/form/${categoryid}`);
	}

	private _getCategories() {
		this.categoriesService
			.getCategories()
			.pipe(takeUntil(this.endsubs$))
			.subscribe((cats) => {
				this.categories = cats;
			});
	}
}
