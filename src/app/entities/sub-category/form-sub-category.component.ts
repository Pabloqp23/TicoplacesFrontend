import { Component, OnInit } from '@angular/core';
import { SubCategoryClass } from './sub-category-class';
import { SubCategoryService } from './sub-category.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
@Component({
  selector: 'app-form-sub-category',
  templateUrl: './form-sub-category.component.html'
})
export class FormSubCategoryComponent implements OnInit {

  private subCategory: SubCategoryClass = new SubCategoryClass();
  private titulo: string = "Crear SubCategoria"
    constructor(private subCategoryService: SubCategoryService,  private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.subCategoryService.getSubCategory(id).subscribe( (subCategory) => this.subCategory = subCategory)
        }
      })
    }
  public create(): void{
    this.subCategoryService.create(this.subCategory)
        .subscribe(subCategory => {
          this.router.navigate(['/subCategory'])
        }
        );
  }
  update():void{
    this.subCategoryService.update(this.subCategory)
    .subscribe( subCategory => {
      this.router.navigate(['/subCategory'])
      swal.fire('SubCategoria Actualizado', `SubCategoria ${subCategory.description} actualizado con éxito!`, 'success')
    }
    )
  }
  }
