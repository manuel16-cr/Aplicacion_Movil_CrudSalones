import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSalonComponent } from './components/create-salon/create-salon.component';
import { ListSalonComponent } from './components/list-salon/list-salon.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-salon', pathMatch: 'full'},
  { path: 'list-salon', component: ListSalonComponent},
  { path:'create-salon', component: CreateSalonComponent},
  { path:'editsalon/:id', component: CreateSalonComponent},
  { path: '**', redirectTo: 'list-salon', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
