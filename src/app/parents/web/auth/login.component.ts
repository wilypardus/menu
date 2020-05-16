import { AuthService } from './../../../services/auth.service';
import { UserLoginModel } from './../../../models/userLogin.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth-header.css'  ]
})
export class LoginComponent implements OnInit {
  usuario: UserLoginModel = new UserLoginModel();
  recordarme=false;
  constructor(
    public _auth: AuthService,
    private router:Router,
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

          googleAuth(){
            this._auth.authWithGoogle().then(
              this.router.navigateByUrl('/menus')
            )
            .catch(err=>console.log(err))
          }

      }
