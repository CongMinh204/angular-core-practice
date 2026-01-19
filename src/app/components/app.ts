import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
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
