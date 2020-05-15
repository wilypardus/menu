import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styles: [
  ]
})
export class RecoveryComponent implements OnInit {

  constructor(private _auth:AuthService) { }
  email:string;
  ngOnInit(): void {
  }
  recovery(form:NgForm){
    if (form.invalid){
      return
    }
    this._auth.resetPassword(this.email).then(
      resp=> console.log(resp)
    )
    .catch(
      err=> console.log(err)
    )
  }
}
