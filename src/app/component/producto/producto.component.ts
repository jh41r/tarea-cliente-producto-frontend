import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent {
  productos: Producto[] = [];
  titulo: string = '';
  opc: string = '';
  producto = new Producto();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
  }
  listarProductos() {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Producto';
    this.opc = 'Save';
    this.op = 0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Producto';
    this.opc = 'Editar';
    this.productoService.getProductoById(id).subscribe((data) => {
      this.producto = data;
      this.op = 1;
    });
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  deleteProducto(id: 0) {
    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El Producto ha sido eliminado exitosamente',
        });
        this.listarProductos(); // Actualiza la lista después de la eliminación
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto',
        });
      },
    });
  }

  addProducto(): void {
    this.productoService.createProducto(this.producto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Producto Registrado',
        });
        this.listarProductos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Agregar el producto',
        });
      },
    });
    this.visible = false;
  }

  editProducto() {
    this.productoService.updateProducto(this.producto,this.producto.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Producto Editado',
          });
          this.listarProductos();
          this.op = 0;
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo Editar el producto',
          });
        },
      });
      this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addProducto();
      this.limpiar();
    } else if (this.op == 1) {
      this.editProducto();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.producto.id = 0;
    this.producto.nombre = '';
    this.producto.cantidad = '';
  }
}
