import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<ThemeMode>('light');

  constructor() {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('theme') as ThemeMode | null;
    if (saved === 'dark') {
      this.enableDark();
    }
  }

  isDark() {
    if (this.theme() === 'dark') return true;
    else return false;
  }

  enableDark() {
    document.documentElement.classList.add('dark');
    this.theme.set('dark');
    localStorage.setItem('theme', 'dark');
  }

  disableDark() {
    document.documentElement.classList.remove('dark');
    this.theme.set('light');
    localStorage.setItem('theme', 'light');
  }

  toggleTheme() {
    this.theme() === 'dark' ? this.disableDark() : this.enableDark();
  }
}
