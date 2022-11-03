import { Component, OnInit } from '@angular/core';
import { DistrictService } from './district.service';
import { DistrictClass } from './district-class';
import swal from 'sweetalert2'
import { AuthService } from '../../user/auth.service';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
})
export class DistrictComponent implements OnInit {
  districts : DistrictClass[];
    constructor(private districtService: DistrictService,private authService: AuthService) { }

    ngOnInit() {
      this.districtService.getDistricts().subscribe(
      districts => this.districts = districts
    );
    }
    delete(district : DistrictClass): void {
        swal.fire({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar al cliente ${ district.districtName } ?`,
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

            this.districtService.delete(district.id).subscribe(
              response => {
                this.districts = this.districts.filter(dis => dis !== district)
                swal.fire(
                  'Provincia Eliminado!',
                  `Provincia ${district.districtName} eliminado con éxito.`,
                  'success'
                )
              }
            )

          }
        })
      }

    }
