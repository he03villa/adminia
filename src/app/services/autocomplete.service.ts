import { Injectable, EventEmitter } from '@angular/core';
import { ServicesService } from './services.service';
declare var google;

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  autoCompleto = new EventEmitter();

  constructor(
    private services: ServicesService,
  ) { }

  cambiar(data) {
    this.autoCompleto.emit(data);
  }

  async cargarAutoComplete(id) {
    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(
      [
        'address_components',
        'geometry',
        'icon',
        'name'
      ]
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        this.services.Alert('warning', '','Por favor Seleccione una Direccion', 'Aceptar', '');
        return;
      }
      const latLng2 = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      console.log(latLng2, place);
      const auxCodigo = place.address_components.find(f => f.types.includes('postal_code'));
        const auxDepartamento = place.address_components.find(f => f.types.includes('administrative_area_level_1'));
        const auxCiudad = place.address_components.find(f => f.types.includes('administrative_area_level_2'));
        const auxDireccion1 = place.address_components.find(f => f.types.includes('route'));
        const auxDireccion2 = place.address_components.find(f => f.types.includes('street_number'));
        let direccion = auxDireccion1 ? auxDireccion1.short_name : auxCiudad.long_name;
        if (auxDireccion2) {
          direccion += ' ' + auxDireccion2.short_name;
        }
        const data = {
          codigoPos: auxCodigo.long_name,
          departamento: auxDepartamento.long_name,
          ciudad: auxCiudad.long_name,
          direccion: place.name
        };
        this.cambiar(data);
      /* return this.localizacion(latLng2); */
    });
  }

  async localizacion(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({latLng: location}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        const auxCodigo = results[0].address_components.find(f => f.types.includes('postal_code'));
        const auxDepartamento = results[0].address_components.find(f => f.types.includes('administrative_area_level_1'));
        const auxCiudad = results[0].address_components.find(f => f.types.includes('administrative_area_level_2'));
        const auxDireccion1 = results[0].address_components.find(f => f.types.includes('route'));
        const auxDireccion2 = results[0].address_components.find(f => f.types.includes('street_number'));
        let direccion = auxDireccion1 ? auxDireccion1.short_name : auxCiudad.long_name;
        if (auxDireccion2) {
          direccion += ' ' + auxDireccion2.short_name;
        }
        const data = {
          codigoPos: auxCodigo.long_name,
          departamento: auxDepartamento.long_name,
          ciudad: auxCiudad.long_name,
          direccion
        };
        this.cambiar(data);
      }
    });
  }
}
