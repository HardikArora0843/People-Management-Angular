import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="dialog-backdrop" [@backdropAnimation] (click)="onBackdropClick($event)">
        <div class="dialog-container" [@dialogAnimation]>
          <div class="dialog-header">
            <h3>{{ title }}</h3>
            <button class="close-button" (click)="onCancel()">×</button>
          </div>
          <div class="dialog-content">
            <p>{{ message }}</p>
          </div>
          <div class="dialog-actions">
            <button class="cancel-button" (click)="onCancel()">{{ cancelText }}</button>
            <button class="confirm-button" (click)="onConfirm()">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 400px;
      overflow: hidden;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .dialog-header h3 {
      margin: 0;
      font-weight: 500;
      color: #212529;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6c757d;
    }

    .dialog-content {
      padding: 20px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      padding: 16px 20px;
      border-top: 1px solid #e9ecef;
    }

    .dialog-actions button {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      margin-left: 8px;
      font-weight: 500;
    }

    .cancel-button {
      background-color: #f8f9fa;
      color: #212529;
    }

    .cancel-button:hover {
      background-color: #e9ecef;
    }

    .confirm-button {
      background-color: #dc3545;
      color: white;
    }

    .confirm-button:hover {
      background-color: #c82333;
    }
  `],
  animations: [
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.cancel.emit();
    }
  }
}