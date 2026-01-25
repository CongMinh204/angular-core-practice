import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,HeaderComponent,
    FooterComponent ],
  templateUrl: '../app.html',        // Đảm bảo tên file là app.html
  styleUrl: '../app.css'
})
export class App {
  protected readonly title = signal('Aiden');

  isLightOn = true;

  toggleLight(): void {
    this.isLightOn = !this.isLightOn;
  }









}
