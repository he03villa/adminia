import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../services/propiedad.service';
import { ServicesService } from '../../services/services.service';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-copropiedades',
  templateUrl: './copropiedades.component.html',
  styleUrls: ['./copropiedades.component.scss']
})
export class CopropiedadesComponent implements OnInit {

  arrayPropiedad = [];

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
    private Dashboard: DashboardComponent
  ) { }

  ngOnInit() {
    const token = sessionStorage.getItem('ref');
    if (token != null) {
      sessionStorage.removeItem('ref');
      this.cargarPropiedades(token);
    }
    this.cargarPropiedad();
  }

  async cargarPropiedad() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const res:any = await this.Propiedad.listarPropiedad({ user: user.id });
    this.arrayPropiedad = res.data;
    console.log(this.arrayPropiedad);
  }

  async abrirModalAgregarPropiedad() {
    const { value: url } = await Swal.fire({
      showCloseButton: true,
      input: 'text',
      title: "Agregar código",
      inputPlaceholder: 'Agregar código',
      customClass: {
        htmlContainer: 'ayuda-amigo'
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "error";
        }
      },
    });
    console.log(url);
    if (url != undefined && url != "") {
      this.cargarPropiedades(url);
    }
  }

  async cargarPropiedades(codigo) {
    const res:any = await this.Propiedad.getAllPropiedadPro({ token: codigo });
    console.log(res);
    const array = res.data;
    let html = '';
    array.filter(f => html += `<option value="${ f.id }">${ f.nombre }</option>`);
    const data:any = await Swal.fire({
      title: 'Escoge tu propiedad',
      html: `<select id="copropiedad" class="swal2-input">${html}</select>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async (fech) => {
        const user = JSON.parse(localStorage.getItem('dataUser'));
        const propiedad = document.getElementById('copropiedad')['value'];
        const data = { user: user.id, propiedad: propiedad };
        return await this.Propiedad.savePropietario(data);
      }
    });
    console.log(data);
    if (data.isConfirmed) {
      this.services.Alert(data.value.status, '', data.value.message, 'Aceptar', '');
      if (data.value.status == 'success') {
        this.cargarPropiedad();
      }
    }
  }

  abrirOpcionPropiedad(item) {
    console.log(item);
    if (item.status == '1') {
      this.Dashboard.propiedad = item;
      sessionStorage.setItem('dataPropiedad', JSON.stringify(item));
      this.services.url('/dashboard');
    } else {
      this.services.Alert('warning', '', 'No tiene permiso entrar a la propiedad hasta que el administrado lo admite', 'Aceptar', '');
    }
  }

}
