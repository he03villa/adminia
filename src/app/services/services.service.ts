import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
declare var $ : any;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ApiURL = 'https://vino.intermediosdigital.com/api/controllers';

  urlPaginas = {
    '/dashboard': 'dashoboard'
  };

  constructor(
    private router: Router,
  ) {
    setTimeout(() => {
      this.seleccionarRuta();
    }, 1000);
  }

  url(url) {
    this.router.navigate([url]);
  }

  seleccionarRuta() {
    let ruta = this.urlPaginas[this.router.url];
    localStorage.setItem("urlLink", this.router.url);
    $(".contenedor-menu-dashoboard").removeClass("active");
    $(".btn-nav").removeClass("active");
    if (ruta != undefined) {
      $("." + ruta).addClass("active");
    }
  }

  showModal(id) {
    $(id).modal('show');
  }

  openURL(urlValue) {
    window.open(urlValue, "_blank");
  }

  hideModal(id) {
    $(id).modal('hide');
  }

  showLoading() {
    $(".backgroundblack").show();
  }

  showLoadingTime(time) {
    this.showLoading();
    setTimeout(()=>{
      this.hideLoading();
    }, time)

  }

  hideLoading() {
    $(".backgroundblack").hide();
  }

  urlParam = function(name) {
    var link = window.location.href.split("%3F").join("?").split("%3D").join("=").split("%40").join("@");
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(link);
    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]) || null;
    }
  };

  Alert(icon, title, text, confirmButtonText, cancelButtonText, showCancelButton = false) {
    return Swal.fire({
      icon,
      title,  
      html: text,
      confirmButtonText,
      cancelButtonText,
      showCancelButton,
      showCloseButton: true
    }).then();
  }

  Toast(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon,
      title
    });

  }

  validarNumero(valor) {
    // tslint:disable-next-line: max-line-length
    if (isNaN(valor) === true || valor === 'NaN' || valor <= 0.000000 || valor === undefined || valor === null || valor === '' || valor === 'null') {
      return false;
    } else {
      return true;
    }
  }

  validarNumeroConCero(valor) {
    // tslint:disable-next-line: max-line-length
    if (isNaN(valor) === true || valor === 'NaN' || valor === undefined || valor === null || valor === '' || valor === 'null') {
      return false;
    } else {
      return true;
    }
  }

  validarText(valor) {
    if (valor === undefined || valor == null || valor === '' || valor === 'null' || valor <= 0) {
      return false;
    } else {
      return true;
    }
  }

  validarCorreo(email) {
    // tslint:disable-next-line: max-line-length
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(pattern)) {
        return true;
    } else {
        return false;
    }
  }

  validarPassword(texto) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&._])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (regex.test(texto)) {
        return true;
    } else {
        return false;
    }
  }

  ordenar(array, atributo) {
    return array.sort((a, b) => {
      if (a[atributo] > b[atributo]) {
        return 1;
      } else if (a[atributo] < b[atributo]) {
        return -1;
      }
      return 0;
    });
  }

  ordenar_fecha_desendente(array, atributo) {
    return array.sort((a, b) => {
      return b[atributo] - a[atributo];
    });
  }

  ordenarNumeroA(array, atributo) {
    return array.sort((a, b) => a[atributo] - b[atributo]);
  }

  ordenarNumeroD(array, atributo) {
    return array.sort((a, b) => b[atributo] - a[atributo]);
  }


  arrayFijoResponse(key) {
    let lang = localStorage.getItem("idioma");

     if ("notificacion160" == key) {
      return (lang == "es")? "La sesión ha caducado, inicia sesión nuevamente.": "The session has expired, please log in again.";
    } else if ("notificacion2" == key) {
      return (lang == "es")? "Aceptar": "Accept";
    } else if ("notificacion168" == key) {
      return (lang == "es")? "Los datos de sesión son incorrectos, debes iniciar sesión nuevamente.": "The session data is incorrect, you must log in again.";
    }
  }

  Promet(subscribe) {
    return new Promise((resolve, reject) => subscribe.subscribe((resul) => resolve(resul), error => reject(error)));
  }

  addLoading(target) {
    target.innerHTML += " <i class='fas fa-spinner fa-pulse'></i>"; 
    target.disabled = true;
  }

  removeLoading(target) {
    let sprinner = target.lastChild;
    target.removeChild(sprinner);
    target.disabled = false;
  }

  formatNumberUsd(numero) {
    /* if (!this.validarNumero(numero)) {
        numero = 0;
    } */
    numero = this.numberComplete(numero, 2);
    // tslint:disable-next-line: max-line-length
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      useGrouping: true
    });
  }

  formatNumberCrypto(numero) {
    /* console.log(numero); */
    /* if (!this.validarNumero(numero)) {
      numero = 0;
    } */
    // tslint:disable-next-line: max-line-length
    numero = this.numberComplete(numero, 6);
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]).toLocaleString('en-US', {
        minimumFractionDigits: 6,
        useGrouping: true
    });
  }

  numberComplete(numero, dec) {
    //dec++;
    //return numero
    return (numero * (10 ** dec)) / (10 ** dec);
    /* return numero; */
  }

  formatNumberInteger(numero) {
    if (!this.validarNumero(numero)) {
      numero = 0;
    }
    // tslint:disable-next-line: max-line-length
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,0})?/)[0]).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      useGrouping: true
    });
  }

  formatNumberPorcentual(numero) {
    if (!this.validarNumero(numero) || numero < 0) {
      numero = 0;
    }
    if (Number.isInteger(numero)) {
      return parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,0})?/)[0]).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        useGrouping: true
      });
    } else {
      return parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        useGrouping: true
      });
    }
  }

  devolverNumero(valor) {
    if (this.validarText(valor)) {
      return valor = parseFloat(valor.replace(/[^0-9-.]/g, ''));
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  cerrarSecion() {
    localStorage.removeItem('dataUser');
    localStorage.removeItem('currentPath');
    if (this.getCookie("plataforma") == null || this.getCookie("plataforma") == "") {
      this.url('login');
    } else {
      /* window.location.href = defaultRuta + "/loginMobile.php"; */
    }
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  agruparElemetoArray(arra, numero) {
    const array = [];
    let arrayNumero = [];
    let inicio = 0;
    let fin = numero;
    const total = Math.ceil(arra.length / numero);
    for (let x = 0; x < total; x++) {
      arrayNumero = arra.slice(inicio, fin);
      array.push(arrayNumero);
      arrayNumero = [];
      inicio = fin;
      fin += numero;
    }
    /* arra.filter(f => {
      arrayNumero.push(f);
      if (arrayNumero.length == numero) {
        array.push(arrayNumero);
        arrayNumero = [];
      } else if (arrayNumero.length == arra.length){
        array.push(arrayNumero);
        arrayNumero = [];
      }
    }); */
    return array;
  }

  cargar_img(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      }
    });
  }

  validar18yead(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaActu = new Date();
      const fechaCo = new Date(control.value);
      const di = fechaActu.getFullYear() - fechaCo.getFullYear();
      return di < 18 ? { fecha: { value: control.value } } : null;
    }
  }
}
