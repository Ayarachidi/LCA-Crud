import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Pour router-outlet
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Pour router-outlet
import { CommonModule } from '@angular/common'; // Pour ngClass et autres directives Angular
import { LeftSidebarTechComponent } from '../left-sidebar-tech/left-sidebar-tech.component'; 

@Component({
  selector: 'app-layoutech',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,  // Pour router-outlet
    CommonModule ,
    LeftSidebarTechComponent 
  ],
  templateUrl: './layoutech.component.html',
  styleUrl: './layoutech.component.css'
})
export class LayoutechComponent {
  isLeftSidebarCollapsed = false;

  changeIsLeftSidebarCollapsed(isCollapsed: boolean) {
    this.isLeftSidebarCollapsed = isCollapsed;
  }
  

}
