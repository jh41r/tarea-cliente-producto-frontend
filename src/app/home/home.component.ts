import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                routerLink: '/',
                label: 'Home',
                icon: 'pi pi-home'
            },
            {
                routerLink: '/cliente',
                label: 'Cliente',
                icon: 'pi pi-star'
            },
            
            {
                routerLink: '/producto',
                label: 'Producto',
                icon: 'pi pi-envelope'
            }
        ]
    }
}
