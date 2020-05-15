import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MenusService } from 'src/app/services/menus.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import { UserModel } from '../../../models/user.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styles: [
  ]
})
export class CustomerMenuComponent implements OnInit {
  id:string;
  menuUsr;
  usuarioMenu:UserModel;
  usuarioSugerencias;
  isShow: boolean;
  topPosToStartShowing = 100;
  fontSize = 14;
  sugerencias:any;
  closeResult = '';
  @ViewChild('para', { static: true }) para: ElementRef;

  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }


  constructor(public _menusService:MenusService, private route:ActivatedRoute, public _userService:UserService,private modalService: NgbModal) {


  this.id = this.route.snapshot.paramMap.get('cartaId');
  console.log(this.id);
  this._menusService.cargarUsrMenu(this.id).subscribe();
  this._userService.cargarUser(this.id).subscribe(resp=>{
    // console.log(resp);
    this.usuarioMenu=resp
  });
  this._menusService.cargarSugerencias(this.id).subscribe(
    resp=>{
      this.sugerencias=resp

    }
  );
  // console.log(this._menuService.sugerencias);

   }


  ngOnInit(): void {


  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  decrease(){
    this.fontSize = (this.fontSize * 0.8);
  }

  increase(){
    this.fontSize = (this.fontSize * 1.2);
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
