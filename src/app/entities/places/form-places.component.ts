import { Component, OnInit } from '@angular/core';
import { PlaceClass } from './place-class'
import { PlacesService } from './places.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { CantonClass } from '../canton/canton-class';
import { ProvinceClass } from '../province/province-class';
import { DistrictClass } from '../district/district-class';
import { CategoriesClass } from '../categories/categories-class';

@Component({
  selector: 'app-form-places',
  templateUrl: './form-places.component.html',

})
export class FormPlacesComponent implements OnInit {

  private place: PlaceClass = new PlaceClass();
  private titulo: string = "Crear Lugar"
  cantons: CantonClass[];
  provinces: ProvinceClass[];
  districts: DistrictClass[];
  categories: CategoriesClass[];
    constructor(private placesService: PlacesService,  private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.placesService.getPlace(id).subscribe( (place) => this.place = place)
        }
      })
  this.placesService.getCantons().subscribe(cantons => this.cantons = cantons);
  this.placesService.getDistricts().subscribe(districts => this.districts = districts);
  this.placesService.getProvinces().subscribe(provinces => this.provinces = provinces);
  this.placesService.getCategories().subscribe(categories => this.categories = categories);
    }

  public create(): void{
    this.placesService.create(this.place)
        .subscribe(place => {
          this.router.navigate(['/places'])
          swal.fire('Nuevo Lugar', `Lugar ${place.placeName} creado con éxito!`, 'success');
        }
        );
  }
  update():void{
    this.placesService.update(this.place)
    .subscribe( place => {
      this.router.navigate(['/places'])
      swal.fire('Lugar Actualizado', `Lugar ${place.placeName} actualizado con éxito!`, 'success')
    }

    )
  }
  compararCanton(o1: CantonClass, o2: CantonClass): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
compararProvincia(o1: ProvinceClass, o2: ProvinceClass): boolean {
if (o1 === undefined && o2 === undefined) {
  return true;
}

return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
compararDistritos(o1: DistrictClass, o2: DistrictClass): boolean {
if (o1 === undefined && o2 === undefined) {
  return true;
}

return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
compararCategorias(o1: CategoriesClass, o2: CategoriesClass): boolean {
if (o1 === undefined && o2 === undefined) {
  return true;
}

return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idCategory === o2.idCategory;
}
  }
