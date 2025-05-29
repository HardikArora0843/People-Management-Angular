import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      @for (notification of notifications; track notification.id) {
        <div 
          class="notification {{ notification.type }}" 
          [@notificationAnimation]
          (click)="removeNotification(notification.id)">
          <div class="notification-content">
            <span class="notification-message">{{ notification.message }}</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 300px;
    }

    .notification {
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      animation: slide-in 0.3s ease-out forwards;
      cursor: pointer;
    }

    .notification-content {
      display: flex;
      align-items: center;
    }

    .notification-message {
      font-size: 14px;
    }

    .success {
      background-color: #d4edda;
      color: #155724;
      border-left: 4px solid #28a745;
    }

    .error {
      background-color: #f8d7da;
      color: #721c24;
      border-left: 4px solid #dc3545;
    }

    .info {
      background-color: #d1ecf1;
      color: #0c5460;
      border-left: 4px solid #17a2b8;
    }

    .warning {
      background-color: #fff3cd;
      color: #856404;
      border-left: 4px solid #ffc107;
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `],
  animations: [
    trigger('notificationAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationsComponent {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, 5000);
    });
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }
}