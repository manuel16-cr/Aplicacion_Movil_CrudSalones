import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
//Variable que sera privada
  constructor(private firestore: AngularFirestore) { }

  //creacion del metodo agregarsalon
  agregarSalon(salon: any): Promise<any> {
    return this.firestore.collection('salones').add(salon);
  }

  //Metodo snap es para que los cambios sean en tiempo real
  getSalones(): Observable <any>{
    return this.firestore.collection('salones', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  //METODO PARA ELIMINAR
  eliminarSalon(id:string): Promise<any>{
    return this.firestore.collection('salones').doc(id).delete();
  }
  //CREAMOS NUEVO METODO PARA EDITAR EL SALON
  getSalon(id: string): Observable<any>{
    return this.firestore.collection('salones').doc(id).snapshotChanges();
  }
  actualizarSalon(id: string, data:any): Promise<any> {
   return this.firestore.collection('salones').doc(id).update(data); 
  }
}
