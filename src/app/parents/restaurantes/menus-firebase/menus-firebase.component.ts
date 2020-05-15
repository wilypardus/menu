import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../../services/menus.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-menus-firebase',
  templateUrl: './menus-firebase.component.html',
  styles: [
  ]
})
export class MenusFirebaseComponent implements OnInit {
uid:string
sugerencias:any;
sugerenciaId='no';
  constructor(public _menusService:MenusService,private router:Router,private toastr: ToastrService) {
    this.uid=localStorage.getItem('lid')
    if(this.uid==null){  this.uid='esteuidestavacio'  }
    this._menusService.cargarMenus(this.uid).subscribe();
    this._menusService.cargarSugerenciasListado(this.uid).subscribe(resp=>{
      console.log(resp);
      if(resp.length!=0){

        this.sugerencias=resp;
        this.sugerenciaId=this.sugerencias.id;
        console.log('Sugerencias',this.sugerenciaId);

      }
    });
   }

  ngOnInit(): void {
  }

  borrarMenu(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-info mr-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Seguro que quieres borrar?`,
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._menusService.borrarMenu(id)
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El registro ha sido eliminado',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
       return
      }
    }

    )}

    putMenu(eventId){
      const url= `/menu/${eventId}`;
      this.router.navigateByUrl(url)

    }
    putSugerencia(eventId){
      const url= `/sugerencias/${eventId}`;
      this.router.navigateByUrl(url)

    }
    crearSugerencia(uid){

      const url= `/sugerencias/${uid}`;
      this.router.navigateByUrl(url)

    }

    actualizarEstado(id,estado){
      this._menusService.actualizarEstado(id,estado).then((resp)=>{

      })
    }


}
