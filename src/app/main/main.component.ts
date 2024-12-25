import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component,input ,computed} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isLeftSidebarCollapsed: boolean = false; // Valeur initiale
  screenWidth = window.innerWidth;

  sizeClass = computed(() => {
    if (this.isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth > 768 ? 'body-trimmed' : 'body-md-screen';
  });
 
}
