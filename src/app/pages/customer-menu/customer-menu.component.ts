import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MenusService } from '../../services/menus.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';



@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styles: [
  ]
})
export class CustomerMenuComponent implements OnInit {
  id:string;
  menuUsr;
  usuarioMenu;
  isShow: boolean;
  topPosToStartShowing = 100;
  fontSize = 14;
  @ViewChild('para', { static: true }) para: ElementRef;

  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }


  constructor(public _menusService:MenusService, private route:ActivatedRoute, public _userService:UserService) {
  this.id = this.route.snapshot.paramMap.get('id');
  this._menusService.cargarUsrMenu(this.id).subscribe();
  this._userService.cargarUser(this.id).subscribe(resp=>{
    this.usuarioMenu=resp
    console.log(resp);
  });

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


}
