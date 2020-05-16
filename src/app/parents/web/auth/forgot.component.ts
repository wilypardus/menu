import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fotgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./auth-header.css'  ]
})
export class ForgotComponent implements OnInit {
  constructor(
    public _auth:AuthService) { }
  email:string;
  ngOnInit(): void {
  }
  recovery(form:NgForm){
    if (form.invalid){
      return
    }
    this._auth.resetPassword(this.email).then(
      // resp=> console.log(resp)
    )
    .catch(
      // err=> console.log(err)
    )
  }
}
