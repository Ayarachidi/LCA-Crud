import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Pour router-outlet
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Pour router-outlet
import { CommonModule } from '@angular/common'; // Pour ngClass et autres directives Angular
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component'; 
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,  // Pour router-outlet
    CommonModule ,
    LeftSidebarComponent  // Pour ngClass, *ngIf, *ngFor, etc.
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isLeftSidebarCollapsed = false;

  changeIsLeftSidebarCollapsed(isCollapsed: boolean) {
    this.isLeftSidebarCollapsed = isCollapsed;
  }
  
}
