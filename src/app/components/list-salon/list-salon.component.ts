import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SalonService } from 'src/app/services/salon.service';

@Component({
  selector: 'app-list-salon',
  templateUrl: './list-salon.component.html',
  styleUrls: ['./list-salon.component.css']
})
export class ListSalonComponent implements OnInit {
  salones: any[] = [];


  constructor(private _salonService: SalonService,
              private toastr: ToastrService) {

  }
    

  ngOnInit(): void {
    this.getSalones()  
  }

    getSalones() {
      this._salonService.getSalones().subscribe(data => {
        this.salones = [];
        data.forEach((element:any)=>{
          /*console.log(element.payload.doc.id);*/
          /*console.log(element.payload.doc.data());*/
          this.salones.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        console.log(this.salones);
      });
    }
    eliminarSalon(id: string){
      this._salonService.eliminarSalon(id).then(() =>{
        console.log('Empleado elimiando con exito');
        this.toastr.error('El salon fue eliminado con exito', 'Registro eliminado');
      }).catch(error =>{
        console.log(error);
      })
    }
}
