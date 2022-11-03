import { Component, OnInit } from '@angular/core';
import { DistrictClass } from './district-class'
import { DistrictService } from './district.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { CantonClass } from '../canton/canton-class';
@Component({
  selector: 'app-form-district',
  templateUrl: './form-district.component.html',

})
export class FormDistrictComponent implements OnInit {

  private district: DistrictClass = new DistrictClass();
  private titulo: string = "Crear Distrito"
  cantons: CantonClass[];
    constructor(private districtService: DistrictService,  private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.districtService.getDistrict(id).subscribe( (district) => this.district = district)
        }
      })
  this.districtService.getCantons().subscribe(cantons => this.cantons = cantons);
    }

  public create(): void{
    this.districtService.create(this.district)
        .subscribe(district => {
          this.router.navigate(['/district'])
          swal.fire('Nuevo Distrito', `Distrito ${district.districtName} creado con éxito!`, 'success');
        }
        );
  }
  update():void{
    this.districtService.update(this.district)
    .subscribe( district => {
      this.router.navigate(['/district'])
      swal.fire('Distrito Actualizado', `Distrito ${district.districtName} actualizado con éxito!`, 'success')
    }

    )
  }
  compararCanton(o1: CantonClass, o2: CantonClass): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
  }
