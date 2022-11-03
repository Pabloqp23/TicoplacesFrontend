import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { CategoriesClass } from './categories-class';
import swal from 'sweetalert2'
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories : CategoriesClass[];
    constructor(private categoriesService: CategoriesService, private authService: AuthService) { }

    ngOnInit() {
      this.categoriesService.getCategories().subscribe(
      categories => this.categories = categories
    );
    }
    delete(category : CategoriesClass): void {
        swal.fire({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar al cliente ${ category.description } ?`,
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

            this.categoriesService.delete(category.idCategory).subscribe(
              response => {
                this.categories = this.categories.filter(cat => cat !== category)
                swal.fire(
                  'Categoria Eliminada!',
                  `Categoria ${category.description} eliminada con éxito.`,
                  'success'
                )
              }
            )

          }
        })
      }

    }
