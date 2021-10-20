import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalonService } from 'src/app/services/salon.service';

@Component({
  selector: 'app-create-salon',
  templateUrl: './create-salon.component.html',
  styleUrls: ['./create-salon.component.css']
})
export class CreateSalonComponent implements OnInit {
//Creacion de variable de tipo FormGroup
  createSalon: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar salon';

  //Clase formbuilder nos permite validar el formulario
  constructor(private fb: FormBuilder,
              private _salonService: SalonService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createSalon = this.fb.group({
      identificador: ['',Validators.required],
      edificio: ['',Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarSalon(){
    this.submitted = true;

    if(this.createSalon.invalid){
      return;
    }
    if(this.id === null){
      this.agregarSalon();
    }else{
      this.editarSalon(this.id);
    }
  }

  agregarSalon(){
    const salon:any ={
      identificador: this.createSalon.value.identificador,
      edificio: this.createSalon.value.edificio,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()

    }

    this.loading = true;
    
    this._salonService.agregarSalon(salon).then(() =>{
      this.toastr.success('El salon fue registrado con exito');

      this.loading = false;

      this.router.navigate(['/list-salon'])
    
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })

  }

  editarSalon(id: string){
    const salon:any ={
      identificador: this.createSalon.value.identificador,
      edificio: this.createSalon.value.edificio,
      fechaActualizacion: new Date()

    }

    this.loading = true;
    this._salonService.actualizarSalon(id, salon).then(()=>{
      this.loading =false;
      this.toastr.info('El salon fue modificado correctamente')
      this.router.navigate(['/list-salon'])
    })
  }
  //CREAREMOS UN METODO LLAMADO ESEDITAR
  //LO EJECUTAREMOS CUANDO ID TENGA UN VALOR
  esEditar(){
    this.titulo = 'Editar salon'
    if(this.id !== null){
      this.loading = true;
      this._salonService.getSalon(this.id).subscribe(data =>{
        this.loading = false;
        //Metodo para rellenar los campos
        this.createSalon.setValue({
          identificador: data.payload.data()['identificador'],
          edificio: data.payload.data()['edificio']
        })
      })
    }
  }

}