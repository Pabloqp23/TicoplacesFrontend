import { Component, OnInit } from '@angular/core';
import { ProvinceService } from './province.service';
import { ProvinceClass } from './province-class';
import swal from 'sweetalert2'
import { AuthService } from '../../user/auth.service';
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
})
export class ProvinceComponent implements OnInit {

provinces : ProvinceClass[];
  constructor(private provinceService: ProvinceService,private authService: AuthService) { }

  ngOnInit() {
    this.provinceService.getProvinces().subscribe(
    provinces => this.provinces = provinces
  );
  }
  delete(province : ProvinceClass): void {
      swal.fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al cliente ${ province.provinceName } ?`,
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

          this.provinceService.delete(province.id).subscribe(
            response => {
              this.provinces = this.provinces.filter(pro => pro !== province)
              swal.fire(
                'Provincia Eliminado!',
                `Provincia ${province.provinceName} eliminado con éxito.`,
                'success'
              )
            }
          )

        }
      })
    }

  }
