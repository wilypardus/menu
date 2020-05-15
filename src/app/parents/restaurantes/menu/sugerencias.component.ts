import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MenusService } from '../../../services/menus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styles: [
  ]
})
export class SugerenciasComponent {
  upLoadPercent: Observable<number>;
  urlImage: string;
  uid: string;
  menu: any;
  controls;
  idTemp;
  activoTemp;
  data = {
    categorias: [
      {
        categoria: '',
        descripcion: '',
        platos: [
          {
            plato: '',
            descripcion: '',
            precio: '',
            activo: '',
            oculto: '',
            select: '',
            alergenos: [
              {
                cereal: '',
                crustaceo: '',
                huevo: '',
                pescado: '',
                cacahuete: '',
                soja: '',
                lacteo: '',
                frutoseco: '',
                apio: '',
                mostaza: '',
                sesamo: '',
                sulfito: '',
                altramuz: '',
                molusco: ''
              }
            ]
          }
        ]
      }
    ]
  };

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _menusService: MenusService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastr: ToastrService
    ) {

      this.uid = localStorage.getItem('lid');

      this.myForm = this.fb.group({
      id: [''],
      uid: [this.uid],
      name: ['Sugerencias'],
      tipo: ['sugerencias'],
      created: [new Date()],
      modified: [''],
      activo: [true],
      categorias: this.fb.array([])
    });

    // this.addNewCategoria();


  }
  get categoriaData() {return  this.myForm.get('categorias') as FormArray; }

ngOnInit(): void{
  const id = this.route.snapshot.paramMap.get('id');
  this._menusService.getMenu(id).subscribe((resp: any) => {
        if (resp == null){
          this.addNewCategoria();
          this._menusService.crearMenu(this.myForm.value).then(resp => {
            this.myForm.get('id').setValue(resp.id);
            this.idTemp = resp.id;
            this._menusService.actualizarMenu(this.myForm.value, this.idTemp);
            console.log("Registro Nuevo");
          });

        }else{

                  resp.categorias.forEach(x => {
                  // console.log("clg xRespPar",x);
                  // console.log("clg xRespPar.platos",x.platos);

                const control =  this.myForm.get('categorias') as FormArray;

                control.push(this.fb.group({
                  categoria: x.categoria,
                  descripcion: x.descripcion,
                  img: x.img,
                  platos: this.setPlatos(x) }));

                });

              // console.log(resp);
                  this.myForm.get('name').setValue(resp.name);

                  this.idTemp = id;
                  this.myForm.get('id').setValue(this.idTemp);
                  this.activoTemp = resp.activo;
                      console.log("Registro Anterior");
        }


    });



}

  crearMenu() {
    if (this.idTemp){
      this.myForm.get('created').setValue(new Date());
      // alert("Registro actualizado");
      this.toastr.success('Cambios guardados');
      this._menusService.actualizarMenu(this.myForm.value, this.idTemp).then(resp => {
        // console.log(resp);
        this.router.navigateByUrl('/menus');

      });
    }else{
     // alert("Registro creado");

      // console.log(this.myForm.value);
      this._menusService.crearMenu(this.myForm.value).then(resp => {
        this.myForm.get('id').setValue(resp.id);
        this.idTemp = resp.id;
        this._menusService.actualizarMenu(this.myForm.value, this.idTemp);
        // console.log(resp);
      });
    }
  }




  addNewCategoria() {
    const control = this.myForm.get('categorias') as FormArray;
    if (control.length === 0){
  control.push(
    this.fb.group({
      categoria: ['Sugerencias'],
      descripcion: [''],
      img: [''],
      platos: this.fb.array([])
    })
  );
}else{return;}
  }

  deleteCategoria(index) {
    const control = this.myForm.get('categorias') as FormArray;
    control.removeAt(index);
  }

  addNewPlato(control) {
    control.push(
      this.fb.group({
        plato: [''],
        descripcion: [''],
        precio: [''],
        activo: [true],
        oculto: [false],
        select: [false],
        alergenos: this.fb.group({
          cereal: [''],
          crustaceo: [''],
          huevo: [''],
          pescado: [''],
          cacahuete: [''],
          soja: [''],
          lacteo: [''],
          frutoseco: [''],
          apio: [''],
          mostaza: [''],
          sesamo: [''],
          sulfito: [''],
          altramuz: [''],
          molusco: ['']
        })
      }));
  }

  deletePlato(control, index) {
    control.removeAt(index);
  }

  setCategorias() {
    const control =  this.myForm.get('categorias') as FormArray;
    this.data.categorias.forEach(x => {
      control.push(this.fb.group({
        categoria: x.categoria,
        descripcion: x.descripcion,
        platos: this.setPlatos(x) }));
    });
  }

  setPlatos(x) {
    const arr = new FormArray([]);
    x.platos.forEach(y => {
      arr.push(this.fb.group({
        plato: y.plato,
        descripcion: y.descripcion,
        precio: y.precio,
        activo: y.activo,
        select: false,
        alergenos: this.fb.group({
          cereal: y.alergenos.cereal,
          crustaceo: y.alergenos.crustaceo,
          huevo: y.alergenos.huevo,
          pescado: y.alergenos.pescado,
          cacahuete: y.alergenos.cacahuete,
          soja: y.alergenos.soja,
          lacteo: y.alergenos.lacteo,
          frutoseco: y.alergenos.frutoseco,
          apio: y.alergenos.apio,
          mostaza: y.alergenos.mostaza,
          sesamo: y.alergenos.sesamo,
          sulfito: y.alergenos.sulfito,
          altramuz: y.alergenos.altramuz,
          molusco: y.alergenos.molusco,
        })

      }));
    });
    return arr;
  }

  actualizarEstado(id, estado){
    this._menusService.actualizarEstado(id, estado).then((resp) => {
      // console.log(resp);
      window.location.reload()
    });
  }

  onUpload(e, i){
  const cartaId = this.myForm.get('id').value;
  console.log(cartaId);

  const file = e.target.files[0];
  const filePath = `upload/${this.uid}/${cartaId}/${i}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  this.upLoadPercent = task.percentageChanges();
  task.snapshotChanges()
    .pipe(
      finalize(() => {
    ref.getDownloadURL().subscribe(resp => {
      this.urlImage = resp;
      console.log(this.urlImage);
      (this.myForm.get('categorias') as FormArray).at(i).get('img').setValue(resp);




    });
    })
    ).subscribe();
  }

  open(content) {
    this.modalService.open(content);
  }
}

