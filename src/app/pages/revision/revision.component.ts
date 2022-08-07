import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { RevicionService } from '../../services/revicion.service';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {

  arrayPropietarios = [];
  dataRevicion1 = {
    horaInicio: '',
    horaFin: '',
    sector: 'Parcelaciones',
    observacion_visita: 'Supervisar',
    observacion_general: '',
    anexo: [{ observacion: '' }]
  };
  dataRevicion2 = {
    hora: '',
    elaborado: 'NPI',
    sector: '',
    dirigido: '',
    asunto: '',
    contenido: '',
    obgetivo_general: '',
    foto_observacion: [{observacion: '', foto: ['']}]
  };

  constructor(
    public services: ServicesService,
    private Revicion: RevicionService,
    private Propiedad: PropiedadService,
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.listarPropietarios(user.id);
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    console.log(res);
    this.arrayPropietarios = res.data.filter(f => {
      const resul = res.torre.find(y => y.id == f.torre_id);
      if (resul) {
        f.mezclaNombre = resul.nombre + ' - ' + f.nombre;
      } else {
        f.mezclaNombre = f.nombre;
      }
      f.mezclaId = f.id + '@*' + f.mezclaNombre;
      return f;
    });
    this.dataRevicion1.sector = this.arrayPropietarios[0].mezclaId;
    this.dataRevicion2.sector = this.arrayPropietarios[0].mezclaId;
  }

  limpiarRevision1() {
    this.dataRevicion1.horaInicio = '';
    this.dataRevicion1.horaFin = '';
    this.dataRevicion1.observacion_general = '';
    this.dataRevicion1.anexo = [{ observacion: '' }];
  }

  limpiarRevision2() {
    this.dataRevicion1.horaInicio = '';
    this.dataRevicion1.horaFin = '';
    this.dataRevicion1.observacion_general = '';
    this.dataRevicion1.anexo = [{ observacion: '' }];
  }

  addAnexo() {
    this.dataRevicion1.anexo.push({ observacion: '' });
  }


  addObservacionFoto() {
    this.dataRevicion2.foto_observacion.push({observacion: '', foto: ['']});
  }

  eliminarAnexo(indice) {
    this.dataRevicion1.anexo.splice(indice, 1);
  }

  async saveRevicion1(event) {
    this.services.addLoading(event.target);
    if (this.validarRevicion1()) {
      console.log(this.dataRevicion1);
      const data = {
        propiedad: this.dataRevicion1.sector.split('@*')[0],
        horaInicio: this.dataRevicion1.horaInicio,
        horaFin: this.dataRevicion1.horaFin,
        sector: this.dataRevicion1.sector.split('@*')[1],
        observacion_visita: this.dataRevicion1.observacion_visita,
        observacion_general: this.dataRevicion1.observacion_general,
        anexo: this.dataRevicion1.anexo,
      };
      const res:any = await this.Revicion.saveRevicionVisita(data);
      console.log(res);
      if (res.status == 'success') {
        this.limpiarRevision1();
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  async cambiarFoto(event, indice1, indice2) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size >= 5000000) {
        this.services.Alert('warning', '', 'El tamaño de la imagen debe de ser menor a 5 M.B.', 'Aceptar', false);
        return;
      } else if (file.type != 'image/jpeg' && file.type != 'image/png') {
        this.services.Alert('warning', '', 'Solo se permite imagen con el formato png y jpg', 'Aceptar', false);
        return;
      }
      const res:any = await this.services.cargar_img(file);
      if (this.services.validarText(this.dataRevicion2.foto_observacion[indice1].foto[indice2])) {
        this.dataRevicion2.foto_observacion[indice1].foto[indice2] = res;
      } else {
        this.dataRevicion2.foto_observacion[indice1].foto[indice2] = res;
        this.dataRevicion2.foto_observacion[indice1].foto.push('');
      }
    }
  }

  async saveRevicion2(event) {
    this.services.addLoading(event.target);
    if (this.validarRevicion2()) {
      console.log(this.dataRevicion2);
      const data = {
        propiedad: this.dataRevicion2.sector.split('@*')[0],
        hora: this.dataRevicion2.hora,
        elaboro: this.dataRevicion2.elaborado,
        sector: this.dataRevicion2.sector.split('@*')[1],
        dirigido: this.dataRevicion2.dirigido,
        asunto: this.dataRevicion2.asunto,
        contenido: this.dataRevicion2.contenido,
        observacion_general: this.dataRevicion2.obgetivo_general,
        foto_observacion: this.dataRevicion2.foto_observacion
      };
      console.log(data);
      const res:any = await this.Revicion.saveRevicionVisita2(data);
      console.log(res);
      if (res.status == 'success') {
        this.services.url('/dashboard/historial-reviciones');
        this.limpiarRevision2();
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  validarRevicion1() {
    if (!this.services.validarText(this.dataRevicion1.horaInicio)) {
      this.services.Alert('error', '', 'El horario de inicio está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion1.horaFin)) {
      this.services.Alert('error', '', 'El horario de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion1.sector)) {
      this.services.Alert('error', '', 'Selecciona un sector', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion1.observacion_visita)) {
      this.services.Alert('error', '', 'Selecciona una observación de la visita', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion1.observacion_general)) {
      this.services.Alert('error', '', 'Selecciona una observación de la general', 'Aceptar', '', false);
      return false;
    } else if (Object.values(this.dataRevicion1.anexo).filter(f => !this.services.validarText(f.observacion)).length > 0) {
      this.services.Alert('error', '', 'Hay una actividad vacía', 'Aceptar', '', false);
      return false;
    }
    return true;
  }

  validarRevicion2() {
    if (!this.services.validarText(this.dataRevicion2.hora)) {
      this.services.Alert('error', '', 'El horario está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.elaborado)) {
      this.services.Alert('error', '', 'El campo Elaboró de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.sector)) {
      this.services.Alert('error', '', 'El campo Sector de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.dirigido)) {
      this.services.Alert('error', '', 'El campo Dirigido a de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.asunto)) {
      this.services.Alert('error', '', 'El campo Asunto a de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.contenido)) {
      this.services.Alert('error', '', 'El campo Contenido a de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.obgetivo_general)) {
      this.services.Alert('error', '', 'El campo Objetivo general a de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (!this.services.validarText(this.dataRevicion2.obgetivo_general)) {
      this.services.Alert('error', '', 'El campo Objetivo general a de fin está vacío', 'Aceptar', '', false);
      return false;
    } else if (Object.values(this.dataRevicion2.foto_observacion).filter(f => !this.services.validarText(f.observacion)).length > 0) {
      this.services.Alert('error', '', 'Hay una actividad vacía', 'Aceptar', '', false);
      return false;
    }
    return true;
  }

}
