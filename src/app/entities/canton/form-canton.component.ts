import { Component, OnInit } from '@angular/core';
import { CantonClass } from './canton-class'
import { CantonService } from './canton.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { ProvinceClass } from '../province/province-class';

@Component({
  selector: 'app-form-canton',
  templateUrl: './form-canton.component.html'
})
export class FormCantonComponent implements OnInit {
  private canton: CantonClass = new CantonClass();
  private titulo: string = "Crear Canton"
  provinces : ProvinceClass [];
    constructor(private cantonService: CantonService,  private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.cantonService.getCanton(id).subscribe( (canton) => this.canton = canton)
    }
  })
  this.cantonService.getProvinces().subscribe(provinces => this.provinces = provinces);
    }
  public create(): void{
    this.cantonService.create(this.canton)
        .subscribe(canton => {
          this.router.navigate(['/canton'])
          swal.fire('Nuevo Canton', `Canton ${canton.name} creado con éxito!`, 'success');
        }
        );
  }
  update():void{
    this.cantonService.update(this.canton)
    .subscribe( canton => {
      this.router.navigate(['/canton'])
      swal.fire('Canton Actualizado', `Canton ${canton.name} actualizado con éxito!`, 'success')
    }
    )
  }
  compararProvincia(o1: ProvinceClass, o2: ProvinceClass): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
  }
