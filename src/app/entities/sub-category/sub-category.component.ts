import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryClass } from './sub-category-class';
import swal from 'sweetalert2'
import { AuthService } from '../../user/auth.service';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {
  subCategories : SubCategoryClass[];
    constructor(private subCategoryService: SubCategoryService,private authService: AuthService) { }

    ngOnInit() {
      this.subCategoryService.getSubCategories().subscribe(
      subCategories => this.subCategories = subCategories
    );
    }
    delete(subCategory : SubCategoryClass): void {
        swal.fire({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar al cliente ${ subCategory.description } ?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
          reverseButtons: true
        }).then((result) => {
          if (result.value) {

            this.subCategoryService.delete(subCategory.id).subscribe(
              response => {
                this.subCategories = this.subCategories.filter(sub => sub !== subCategory)
                swal.fire(
                  'Provincia Eliminado!',
                  `Provincia ${subCategory.description} eliminado con éxito.`,
                  'success'
                )
              }
            )

          }
        })
      }

    }
