import { Component, OnInit } from '@angular/core';
import { ProvinceClass } from './province-class'
import { ProvinceService } from './province.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
private province: ProvinceClass = new ProvinceClass();
private titulo: string = "Crear Cliente"
  constructor(private provinceService: ProvinceService,  private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
this.cargarProvince()
  }
  cargarProvince(): void{
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.provinceService.getProvince(id).subscribe( (province) => this.province = province)
    }
  })
}
public create(): void{
  this.provinceService.create(this.province)
      .subscribe(province => {
        this.router.navigate(['/province'])
        swal.fire('Nueva Provincia', `Provincia ${province.provinceName} creado con éxito!`, 'success');
      }
      );
}
update():void{
  this.provinceService.update(this.province)
  .subscribe( province => {
    this.router.navigate(['/province'])
    swal.fire('Provincia Actualizado', `Provincia ${province.provinceName} actualizado con éxito!`, 'success')
  }

  )
}
}
