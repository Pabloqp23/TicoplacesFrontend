import { Component, OnInit } from '@angular/core';
import { CategoriesClass } from './categories-class'
import { CategoriesService } from './categories.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',

})
export class FormCategoriesComponent implements OnInit {
  private category: CategoriesClass = new CategoriesClass();
  private titulo: string = "Crear Categoria"
    constructor(private categoriesService : CategoriesService,  private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.categoriesService.getCategory(id).subscribe( (category) => this.category = category)
        }
      })
    }

  public create(): void{
    this.categoriesService.create(this.category)
        .subscribe(category => {
          this.router.navigate(['/categories'])
          swal.fire('Nueva Categoria', `Categoria ${category.description} creado con éxito!`, 'success');
        }
        );
  }
  update():void{
    this.categoriesService.update(this.category)
    .subscribe( category => {
      this.router.navigate(['/categories'])
      swal.fire('Categoria Actualizado', `Categoria ${category.description} actualizado con éxito!`, 'success')
    }

    )
  }
  }
