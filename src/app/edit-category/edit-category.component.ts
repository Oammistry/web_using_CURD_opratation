import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{
  form!: FormGroup;
  id:any;
  name!:string;

  constructor(
    private formBuilder: FormBuilder, 
    private customer:CustomerService,
    private routes:ActivatedRoute,
     private messageService: MessageService,
      private route: Router) {}

  ngOnInit() {

    this.routes.queryParams.subscribe((params) => {
      this.id = this.routes.snapshot.params['id'];
      this.name = params['name'] || '';
      console.log(this.id)
      console.log(this.name)

    });
    
    this.form = this.formBuilder.group({
      name: [this.name, Validators.required]
    });
  }

  updateProduct() {

    this.customer.editcategory(this.form.value, this.id).subscribe({
      next: (res: any) => {
        alert("Product Updated Successfully!!");
        this.route.navigate(['/categorys']);
      },
      error: () => {
        alert("Error while updating the product!!");
      }
    });
  }


  
}