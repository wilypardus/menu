import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { UserModel } from '../../../models/user.model';
import { FormBuilder,FormGroup,FormArray } from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styles: [
  ]
})
export class UserSettingsComponent implements OnInit {
usuario:UserModel;
uid;
urlImage:string;
upLoadPercent: Observable<number>;
urlCarta:string;

usuarioForm:FormGroup;
constructor(
  public _userService:UserService,
  private fb: FormBuilder,
  public _upload:UploadService,
  private storage:AngularFireStorage,
  config: NgbModalConfig,
  private modalService: NgbModal,
  @Inject(DOCUMENT) document: any,
    ) {


      this.usuarioForm=this.fb.group({
        nombre:[''],
        email:[''],
        img:[''],
        adminStatus:[''],
        adminPwd:[''],
        rss:this.fb.group({
          facebook:[''],
          instagram:[''],
          twitter:[''],
          web:[''],
        })
      });

      this.uid=localStorage.getItem('lid');

      this._userService.cargarUser(this.uid).subscribe(
        resp=>{
          console.log(resp);
          this.usuario=resp
          localStorage.setItem('enventId',resp.eventId);
          this.urlCarta=document.location.host+"/#/carta/"+this.usuario.uid;
          console.log(this.urlCarta);


          //Seteo de Datos
          this.usuarioForm.get('nombre').setValue(this.usuario.nombre);
          this.usuarioForm.get('email').setValue(this.usuario.email);
          this.usuario.img=resp.img;
          this.usuarioForm.get('adminStatus').setValue(this.usuario.adminProtected.status);
          this.usuarioForm.get('rss.facebook').setValue(this.usuario.rss.facebook);
          this.usuarioForm.get('rss.instagram').setValue(this.usuario.rss.instagram);
          this.usuarioForm.get('rss.twitter').setValue(this.usuario.rss.twitter);
          this.usuarioForm.get('rss.web').setValue(this.usuario.rss.web);
        }
        )

        //this._userService.cargarUsers().subscribe()
      }

      ngOnInit(): void {

      }

  actualizarUsrSettings(){
    const eventId=localStorage.getItem('eventId')
    this.usuario=this.usuarioForm.value
    console.log(eventId);
    this._userService.cargarUser(this.uid).subscribe(
      resp=>{

        const eventId=resp.eventId
        console.log(eventId);
        this._userService.actualizarUsrSettings(this.usuario,eventId)
      }
      )
  }
  onUploadLogo(e){

    const file = e.target.files[0];
    const filePath = `upload/${this.uid}/logo`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() =>{
    ref.getDownloadURL().subscribe(resp=>{
      this.urlImage=resp
      console.log(this.urlImage)
      this.usuarioForm.get('img').setValue(this.urlImage);
      this.actualizarUsrSettings();
    });
    })
    ).subscribe();
  }

  open(content) {
    this.modalService.open(content);
  }

}

