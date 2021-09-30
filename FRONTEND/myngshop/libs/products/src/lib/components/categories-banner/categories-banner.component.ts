/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
	selector: 'products-categories-banner',
	templateUrl: './categories-banner.component.html',
	styles: [],
})
export class CategoriesBannerComponent implements OnInit {
	categories: Category[] = [];
	endSubs$: Subject<any> = new Subject();
	constructor(private categoriesService: CategoriesService) {}

	ngOnInit(): void {
		this.categoriesService
			.getCategories()
			.pipe(takeUntil(this.endSubs$))
			.subscribe((categories) => {
				this.categories = categories;
			});
	}
}
