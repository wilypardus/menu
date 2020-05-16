import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./auth-header.css'  ]
})
export class RegisterComponent implements OnInit {
  usuario: UserLoginModel;
  recordarme = false;
    constructor(public _auth: AuthService,
                private router: Router) { }

    ngOnInit(): void {
      this.usuario = new UserLoginModel();


    }
    onSubmit(form: NgForm){
  if (form.invalid){
    return;
  }
  this._auth.nuevoUsuario(this.usuario)
  .then(resp => {
    // console.log(resp);
    if (this.recordarme){
      localStorage.setItem('email', this.usuario.email);
    }
    this.router.navigateByUrl('/menus');
  })
  .catch(err => {
    console.log(err);
  });
    }

  }
