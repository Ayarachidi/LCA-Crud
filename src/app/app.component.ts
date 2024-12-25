import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';
import { AdressesComponent } from './adresses/adresses.component';
import { HttpClientModule } from '@angular/common/http';
import { LaboratoiresComponent } from './laboratoires/laboratoires.component';
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { LoginComponent } from "./login/login.component";
import { LayoutComponent} from "./layout/layout.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftSidebarComponent, MainComponent, HttpClientModule, AcceuilComponent, LoginComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LCA-Crud';
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(0);

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // This ensures the client-side logic runs only after the window is available
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isLeftSidebarCollapsed.set(true);
      } else {
        this.isLeftSidebarCollapsed.set(false);
      }
    }
  }

  ngOnInit(): void {
    // Ensure code runs only on the client side (after the component is initialized)
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
    }
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
