import { Component, OnInit } from '@angular/core';
import { PlacesService } from './places.service';
import { PlaceClass } from './place-class';
import swal from 'sweetalert2'
import { AuthService } from '../../user/auth.service';
import { ModalService } from './detail/modal.service';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
})
export class PlacesComponent implements OnInit {
  places : PlaceClass[];
 actualPlace: PlaceClass;
    constructor(private placesService : PlacesService,private authService: AuthService, private modalService: ModalService) { }

    ngOnInit() {
      this.placesService.getPlaces().subscribe(
      places => this.places = places
    );
    this.modalService.notificarUpload.subscribe(place => {
      this.places = this.places.map(placeOriginal => {
        if (place.idPlace == placeOriginal.idPlace) {
          placeOriginal.photo = place.photo;
        }
        return placeOriginal;
      })
    })
    }
    delete(place : PlaceClass): void {
        swal.fire({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar el lugar ${ place.placeName } ?`,
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

            this.placesService.delete(place.idPlace).subscribe(
              response => {
                this.places = this.places.filter(pla => pla !== place)
                swal.fire(
                  'Lugar Eliminado!',
                  `Lugar ${place.placeName} eliminado con éxito.`,
                  'success'
                )
              }
            )

          }
        })
      }
      abrirModal(place: PlaceClass) {
          this.actualPlace = place;
          this.modalService.abrirModal();
        }
}
