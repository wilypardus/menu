
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../models/userLogin.model';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserService } from './user-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import {User} from 'firebase';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData:Observable<firebase.User>


  private url='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey='AIzaSyCdG2JvQyyWg8vYQmqB2jjlgttQxqNo7Pk';
  userToken:string;
  usuarioSttTemp:UserModel={
    eventId:'',
  uid:'',
  nombre:'',
  email:'',
  img:'',
  created:new Date(),
  activo:false,
  adminProtected:{
    status:false,
    pwd:''
  }}

//Crear nuevo usuario
//  https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//Login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(
    private http:HttpClient,
    public _userService:UserService,
    private afAuth:AngularFireAuth,
    private router:Router
    ) {
this.userData=afAuth.authState;

    this.leerToken();

   }

   get authenticated():boolean {
    return this.userData != null; // True ó False
  }
  get currentUser(): Observable<firebase.User | null> {
    return this.userData;
  }

  logout(){
    this.afAuth.signOut()
    localStorage.removeItem('token');
    localStorage.removeItem('enventId');
    localStorage.removeItem('lid');

  }

  login(usuario:UserLoginModel){
    const {email, password} = usuario;
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then(resp=>{
      console.log(resp);
      const uid=resp.user.uid
      localStorage.setItem('lid',uid)
      console.log("uid",uid);

    })
    .catch(err=>{
      console.log(err);
    })
  }
  logout2(){
    localStorage.removeItem('token');
  }
  loginByEmail(usuario:UserLoginModel){
    const authData={
      ...usuario,
      returnSecureToken:true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,authData
    ).pipe(
      map( resp=>{
        this.guardarToken(resp['idToken']);
        const uid=resp['localId']
        console.log("uid",uid);
        localStorage.setItem('lid',uid)
        return resp;
      } )
    )
  }

  nuevoUsuario(usuario:UserLoginModel){

    const {email, password} = usuario;

    return this.afAuth.createUserWithEmailAndPassword(email,password).then(resp=>{
      // console.log(resp);
      const uid=resp.user.uid
      localStorage.setItem('lid',uid)
      this.usuarioSttTemp.uid=uid;
      this.usuarioSttTemp.email=resp.user.email;
      this.usuarioSttTemp.nombre=usuario.nombre;
      this.usuarioSttTemp.img='';

      this._userService.crearUsrSettings(this.usuarioSttTemp);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  nuevoUsuario2(usuario:UserLoginModel){
    console.log(usuario.email);
    console.log("UsuarioStt",this.usuarioSttTemp);
    this.usuarioSttTemp.nombre=usuario.nombre;
    this.usuarioSttTemp.adminProtected.status=false;

    this.usuarioSttTemp.email=usuario.email;
    const authData={
      ...usuario,
      returnSecureToken:true,
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,authData
    ).pipe(
      map( resp=>{
        this.guardarToken(resp['idToken']);
        //Crear prefil usuario en colleción users
        this.usuarioSttTemp.uid=resp['localId']
        console.log("respuesta Login",resp);
        this._userService.crearUsrSettings(this.usuarioSttTemp);
        return resp;
      } )
    )

  }
  guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);

    let hoy = new Date();
      hoy.setSeconds(3600);

      localStorage.setItem('expira',hoy.getTime().toString());

  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  // }
  // estaAutenticado():boolean{
  //   // if (this.userToken.length<2){
  //   //   return false;
  //   // }

  //   // const expira=Number(localStorage.getItem('expira'));
  //   // const expiraDate=new Date();
  //   // expiraDate.setTime(expira);
  //   // if(expiraDate>new Date()){
  //   //   return true
  //   // }else{
  //   //   return false
  //   // }


  }

estaAutenticado():boolean {
    return this.userData != null; // True ó False
  }
  resetPassword(email): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }


  // Autenticación con Facebook
authWithFacebook(): any {
  const provider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  this.afAuth.signInWithPopup(provider).then(resp=>{;
  const uid=resp.user.uid
  localStorage.setItem('lid',uid)
  const newUser=resp.additionalUserInfo.isNewUser
  if(newUser){
    this.usuarioSttTemp.uid=uid
    this.usuarioSttTemp.email=resp.user.email;
    this.usuarioSttTemp.nombre=resp.user.displayName;
    this.usuarioSttTemp.img=resp.user.photoURL;
    this.usuarioSttTemp.rss={};

    console.log(resp);
      this._userService.crearUsrSettings(this.usuarioSttTemp);
    this.router.navigateByUrl('/menus')

      return this.usuarioSttTemp
  }
  this.router.navigateByUrl('/menus')
  return this.usuarioSttTemp

});
  }

  // Autenticación con Google
  authWithGoogle(): any {
  const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
       provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(resp=>{
    const uid=resp.user.uid
    localStorage.setItem('lid',uid)
    const newUser=resp.additionalUserInfo.isNewUser
    if(newUser){
      this.usuarioSttTemp.uid=uid
      this.usuarioSttTemp.email=resp.user.email;
      this.usuarioSttTemp.nombre=resp.user.displayName;
      this.usuarioSttTemp.img=resp.user.photoURL;
      this.usuarioSttTemp.rss={};
      // console.log(resp);
        this._userService.crearUsrSettings(this.usuarioSttTemp);
         this.router.navigateByUrl('/menus')
        return this.usuarioSttTemp
    }
    this.router.navigateByUrl('/menus')
    return this.usuarioSttTemp

  });
  }

}
