import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../../services/menus.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styles: [
  ]
})
export class AdminMenuComponent implements OnInit {
  id:string;
  menuUsr;
  sugerenciasUsr;
  sugerenciasId;
  menuSugerencias;
  closeResult = '';

  constructor(public _menusService:MenusService, private route:ActivatedRoute,private toastr: ToastrService,private modalService: NgbModal) {
  this.id = this.route.snapshot.paramMap.get('id');
  this._menusService.cargarUsrMenu(this.id).subscribe();
  this._menusService.cargarUsrMenu(this.id).subscribe((resp:any)=>{
  this._menusService.cargarSugerenciasAdmin(this.id).subscribe(
    resp=>{
      if(resp.length!=0){
        console.log('sugerencias',resp);
        this.sugerenciasUsr=resp.categorias[0].platos
        this.menuSugerencias=resp
        console.log("menu Sugerencias",this.menuSugerencias);
        // this.sugerenciasId=resp.id
      }
    }
  );

    this.menuUsr=resp
    // console.log(this.menuUsr);
  });


   }
  ngOnInit(): void {
  }

  SugerenciaNoDisponible(p,estado){
    console.log("menu",this.menuSugerencias);
    console.log("plato",p);
    const plato=this.menuSugerencias.categorias[0].platos[p]
    plato.activo=!estado;
    console.log('Id menu',this.menuSugerencias.id);
    console.log("Cambiar estado plato",this.sugerenciasUsr);
    console.log("A guardar",this.menuSugerencias);
      this._menusService.actualizarMenu(this.menuSugerencias,this.menuSugerencias.id)
    if(estado){
      this.toastr.warning('Plato marcadado como no disponible!')
    }else{
      this.toastr.success('Plato disponible!')
    }
    // console.log(this.menuUsr);

  }

  noDisponible(m,p,estado){
    // console.log("menu",m);
    // console.log("plato",p);
    const plato=this.menuUsr[0].categorias[m].platos[p]
    plato.activo=!estado;
    // console.log(plato);
    // console.log(this.menuUsr);
    const menuId=this.menuUsr[0].id

    this._menusService.actualizarMenu(this.menuUsr[0],menuId)
    if(estado){
      this.toastr.warning('Plato marcadado como no disponible!')
    }else{
      this.toastr.success('Plato disponible!')
    }
    // console.log(this.menuUsr);

  }

  ocultar(p,oculto){
    console.log("menu",this.menuSugerencias);
    console.log("plato",p);
    const plato=this.menuSugerencias.categorias[0].platos[p]
    plato.oculto=!oculto;
    console.log('Id menu',this.menuSugerencias.id);
    console.log("Cambiar estado plato",this.sugerenciasUsr);
    console.log("A guardar",this.menuSugerencias);
      this._menusService.actualizarMenu(this.menuSugerencias,this.menuSugerencias.id)
    if(estado){
      this.toastr.warning('Plato marcadado como no disponible!')
    }else{
      this.toastr.success('Plato disponible!')
    }
    // console.log(this.menuUsr);

  }

    open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
