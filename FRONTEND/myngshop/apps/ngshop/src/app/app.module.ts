import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

import { AccordionModule } from 'primeng/accordion';
import { UiModule } from '@myngshop/ui';
import { CategoriesService, ProductsModule, ProductsService } from '@myngshop/products';

const routes: Routes = [
	{ path: '', component: HomePageComponent },
	// { path: 'products', component: ProductListComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		HeaderComponent,
		FooterComponent,
		NavComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		AccordionModule,
		ProductsModule,
		UiModule,
	],
	providers: [CategoriesService, ProductsService],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
