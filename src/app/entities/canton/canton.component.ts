import { Component, OnInit } from '@angular/core';
import { CantonService } from './canton.service';
import { CantonClass } from './canton-class';
import { ProvinceClass } from '../province/province-class'
import swal from 'sweetalert2'
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-canton',
  templateUrl: './canton.component.html',
})
export class CantonComponent implements OnInit {
  cantons : CantonClass[];

    constructor(private cantonService : CantonService, private authService: AuthService) { }

    ngOnInit() {
      this.cantonService.getCantons().subscribe(
      cantons => this.cantons = cantons
    );
    }
    delete(canton : CantonClass): void {
        swal.fire({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar al cliente ${ canton.name } ?`,
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

            this.cantonService.delete(canton.id).subscribe(
              response => {
                this.cantons = this.cantons.filter(can => can !== canton)
                swal.fire(
                  'Provincia Eliminado!',
                  `Provincia ${canton.name} eliminado con éxito.`,
                  'success'
                )
              }
            )

          }
        })
      }

    }
