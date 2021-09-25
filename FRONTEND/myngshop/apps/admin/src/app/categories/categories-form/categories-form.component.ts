import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@myngshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  editmode = false;
  // currentCategoryId: string;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private location: Location) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const category : Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category is created!'});
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created!'});
    });
  }

  get categoryForm() { return this.form.controls }

}
