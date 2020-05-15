import { Component, OnInit } from '@angular/core';
import {  } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserLoginModel } from '../models/userLogin.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UserLoginModel = new UserLoginModel();
  recordarme=false;
  constructor(
    private _auth: AuthService,
    private router:Router,
    config: NgbModalConfig, private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
if(localStorage.getItem('email')){
  this.usuario.email=localStorage.getItem('email');
  this.recordarme=true;
}
  }
  login(form: NgForm){
    if (form.invalid){return;}
    this._auth.login(this.usuario)
    .then(resp=>{
      this.router.navigate(['/menus'])
    })
    .catch(err=>{console.log(err);})

    }
    open(content) {
      this.modalService.open(content);
    }

    googleAuth(){
      this._auth.authWithGoogle().then(
        resp=>{console.error(resp)}
      )
      .catch(err=>console.log(err))
    }

}
