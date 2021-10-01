import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { OrdersModule } from '@myngshop/orders';
import { UiModule } from '@myngshop/ui';



const routes: Routes = [
	{
		path: 'products',
		component: ProductsListComponent,
	},
	{
		path: 'category/:categoryid',
		component: ProductsListComponent,
	},
	// {
	// 	path: 'products/:productid',
	// 	component: ProductPageComponent,
	// },
];

@NgModule({
	imports: [
		CommonModule,
		OrdersModule,
		RouterModule.forChild(routes),
		ButtonModule,
		InputNumberModule,
		FormsModule,
		RatingModule,
		CheckboxModule,
		UiModule
	],
	declarations: [
		ProductsSearchComponent,
		CategoriesBannerComponent,
		ProductItemComponent,
		FeaturedProductsComponent,
		ProductsListComponent,
	],
	exports: [
		ProductsSearchComponent,
		CategoriesBannerComponent,
		ProductItemComponent,
		FeaturedProductsComponent,
		ProductsListComponent,
	],
})
export class ProductsModule {}
