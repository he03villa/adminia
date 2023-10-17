import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  listTipoDocumento() {
    const url = `${ this.servicios.ApiURL }/tipo_documento/getAllTipoDocumento.php`;
    return this.servicios.Promet(this.Data.metodoGet(url));
  }
}
