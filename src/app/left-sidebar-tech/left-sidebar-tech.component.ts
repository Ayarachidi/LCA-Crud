import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-left-sidebar-tech',
  standalone: true,
  imports: [RouterModule, CommonModule,HttpClientModule],
  templateUrl: './left-sidebar-tech.component.html',
  styleUrl: './left-sidebar-tech.component.css'
})
export class LeftSidebarTechComponent {
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  items = [
   
    { routeLink: '/analyses', icon: 'fas fa-flask', label: 'Analyses' },
   

  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}