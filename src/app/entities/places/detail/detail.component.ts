import { Component, OnInit, Input } from '@angular/core';
import { PlaceClass } from '../place-class';
import { PlacesService } from '../places.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../../user/auth.service';

@Component({
  selector: 'detail-place',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input()  place: PlaceClass;

  titulo: string = "Detalle del Lugar";
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private placeService: PlacesService,
    private authService: AuthService,
    private modalService: ModalService) { }

  ngOnInit() {}
  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.placeService.subirFoto(this.fotoSeleccionada, this.place.idPlace)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.place = response.place as PlaceClass;

            this.modalService.notificarUpload.emit(this.place);
            swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
