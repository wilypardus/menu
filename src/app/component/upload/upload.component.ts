import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent implements OnInit {

  upLoadPercent: Observable<number>;
  urlImage: string

  constructor(
    private storage: AngularFireStorage
               ) { }


  ngOnInit(): void {
  }

  onUploadLogo(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() =>{
    ref.getDownloadURL().subscribe(resp=>{
      this.urlImage=resp
      //console.log(this.urlImage)
    });
    })
    ).subscribe();
  }
  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() =>{
    ref.getDownloadURL().subscribe(resp=>{
      this.urlImage=resp
      console.log(this.urlImage)
    });
    })
    ).subscribe();
  }
}
