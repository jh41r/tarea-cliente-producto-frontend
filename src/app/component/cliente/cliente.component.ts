import { Component } from '@angular/core';
import { HomeComponent } from "../../home/home.component";
import { Cliente } from '../../model/cliente';
import { MessageService } from 'primeng/api';
import { ClienteService } from '../../service/cliente.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    ButtonModule, 
    CommonModule, 
    RouterModule,
    InputTextModule, 
    FormsModule, 
    ConfirmDialogModule, 
    DialogModule,
    ToastModule,
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes:Cliente[]=[];
  titulo:string='';
  opc:string='';
  cliente= new Cliente();
  op = 0; 
  visible: boolean = false; 
  isDeleteInProgress: boolean = false;
 
   constructor(
     private clienteService: ClienteService,
     private messageService: MessageService
     
   ){}
 
   ngOnInit():void{
     this.listarClientes();
   }
   listarClientes(){
     this.clienteService.getClientes().subscribe((data)=>{
       this.clientes=data;
     });
   }
   
   showDialogCreate() {
     this.titulo="Crear Cliente"
     this.opc="Save";   
     this.op=0;
     this.visible = true; // Cambia la visibilidad del diálogo
   }

   showDialogEdit(id:number) {
     this.titulo="Editar Cliente"
     this.opc="Editar";
     this.clienteService.getClienteById(id).subscribe((data)=>{
       this.cliente=data;
            
    });    
     this.visible = true; // Cambia la visibilidad del diálogo
   }
   
   deleteCliente(id: 0) {
     this.clienteService.deleteCliente(id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Elliminado',
           detail: 'El Cliente ha sido eliminado exitosamente',
         });
         this.listarClientes();
       },
       error: () => {
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'No se pudo eliminar el cliente',
         });
       },
     });
   }

   addCliente():void{ 
     this.clienteService.crearCliente(this.cliente).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'cliente Registrada',
         });
         this.listarClientes();
         this.op=0;
       },
       error: () => {
         this.isDeleteInProgress = false;
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'No se pudo Agregar el cliente',
         });
       },
     });    
     this.visible = false;
   }

   editCliente(){
    if (this.cliente.id) {
     this.clienteService.updateCliente(this.cliente,this.cliente.id).subscribe({
       next: () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Correcto',
           detail: 'Cliente Editado',
         });
         this.listarClientes();
         this.op=0;
       },
       error: () => {
         this.isDeleteInProgress = false;
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'No se pudo Editar el cliente',
         });
       },
     });    
     this.visible = false;
    } else {
      console.error("No se ha encontrado un ID para editar el cliente.");
    }
   }
   opcion():void{
     if(this.op==0){
       this.addCliente();
       this.limpiar();
     }else if(this.op==1){
       console.log("Editar");
       this.editCliente();
       this.limpiar();
     }else{
       console.log("No se hace nada");
       this.limpiar();
     }
   }

  limpiar(){
   this.titulo='';
   this.opc='';
   this.op = 0; 
   this.cliente.id=0;
   this.cliente.nombre='';
    this.cliente.apellido='';
  }
}
