import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NotificationsComponent],
  template: `
    <div class="app-container" [attr.data-theme]="isDarkMode ? 'dark' : 'light'">
      <header class="app-header">
        <div class="header-content">
          <a [routerLink]="['/']" class="logo">People Manager</a>
          <nav class="main-nav">
            <a [routerLink]="['/people']" routerLinkActive="active">People</a>
            <button class="theme-toggle" (click)="toggleTheme()">
              {{ isDarkMode ? '🌞' : '🌙' }}
            </button>
          </nav>
        </div>
      </header>
      
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2025 People Manager App</p>
        </div>
      </footer>
      
      <app-notifications></app-notifications>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--bg-color);
    }

    .app-header {
      background-color: var(--primary-color);
      color: white;
      box-shadow: 0 2px 8px var(--shadow-color);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 20px;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      transition: transform 0.2s;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .main-nav {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .main-nav a {
      color: white;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .main-nav a:hover, .main-nav a.active {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .theme-toggle {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s;
    }

    .theme-toggle:hover {
      transform: rotate(180deg);
      background-color: rgba(255, 255, 255, 0.1);
    }

    .app-content {
      flex: 1;
      background-color: var(--bg-color);
      animation: fadeIn 0.3s ease-out;
    }

    .app-footer {
      background-color: var(--card-bg);
      color: var(--text-color);
      padding: 20px 0;
      margin-top: auto;
      box-shadow: 0 -2px 8px var(--shadow-color);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
      }

      .main-nav {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}