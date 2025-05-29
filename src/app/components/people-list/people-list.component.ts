import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';
import { NotificationService } from '../../services/notification.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoadingSpinnerComponent,
    ConfirmDialogComponent
  ],
  template: `
    <div class="container slide-in">
      <div class="header">
        <h1>People Management</h1>
        <button class="add-button scale-in" [routerLink]="['/people/new']">Add Person</button>
      </div>

      <div class="search-container fade-in">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          [(ngModel)]="searchTerm"
          (input)="filterPeople()"
          class="search-input"
        />
      </div>

      @if (loading) {
        <app-loading-spinner message="Loading people..."></app-loading-spinner>
      } @else if (filteredPeople.length === 0) {
        <div class="empty-state fade-in">
          <p>No people found. Try adjusting your search or add a new person.</p>
          <button class="add-button" [routerLink]="['/people/new']">Add Person</button>
        </div>
      } @else {
        <div class="card-grid">
          @for (person of filteredPeople; track person.id) {
            <div class="person-card scale-in" @cardAnimation>
              <div class="card-header">
                <img [src]="person.avatar" alt="{{ person.firstName }} {{ person.lastName }}" class="avatar">
                <div class="card-actions">
                  <button class="edit-button" [routerLink]="['/people/edit', person.id]">Edit</button>
                  <button class="delete-button" (click)="openDeleteConfirmation(person)">Delete</button>
                </div>
              </div>
              <div class="card-body">
                <h3>{{ person.firstName }} {{ person.lastName }}</h3>
                <p class="email">{{ person.email }}</p>
                <p class="phone">{{ person.phone }}</p>
                @if (person.address) {
                  <p class="address">
                    {{ person.address }}<br>
                    {{ person.city }}, {{ person.state }} {{ person.zipCode }}
                  </p>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>

    <app-confirm-dialog
      [isOpen]="showDeleteDialog"
      [title]="'Delete Person'"
      [message]="deleteDialogMessage"
      [confirmText]="'Delete'"
      [cancelText]="'Cancel'"
      (confirm)="confirmDelete()"
      (cancel)="cancelDelete()"
    ></app-confirm-dialog>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h1 {
      color: var(--text-color);
      margin: 0;
    }

    .search-container {
      margin-bottom: 24px;
    }

    .search-input {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 16px;
      background-color: var(--card-bg);
      color: var(--text-color);
      transition: all 0.3s;
    }

    .search-input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .person-card {
      background-color: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 4px 6px var(--shadow-color);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .person-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px var(--shadow-color);
    }

    .card-header {
      position: relative;
      height: 80px;
      background-color: var(--primary-color);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 15px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid white;
      box-shadow: 0 2px 5px var(--shadow-color);
      transition: transform 0.3s ease;
    }

    .avatar:hover {
      transform: scale(1.1);
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }

    .card-body {
      padding: 20px;
    }

    h3 {
      margin: 10px 0;
      color: var(--text-color);
    }

    .email, .phone {
      margin: 5px 0;
      color: var(--text-color);
      opacity: 0.8;
    }

    .address {
      margin-top: 10px;
      font-size: 14px;
      color: var(--text-color);
      opacity: 0.7;
    }

    .add-button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
    }

    .add-button:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
    }

    .edit-button, .delete-button {
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s;
    }

    .edit-button {
      background-color: #6c757d;
      color: white;
    }

    .edit-button:hover {
      background-color: #5a6268;
      transform: translateY(-2px);
    }

    .delete-button {
      background-color: var(--danger-color);
      color: white;
    }

    .delete-button:hover {
      background-color: #c82333;
      transform: translateY(-2px);
    }

    .empty-state {
      text-align: center;
      padding: 40px 0;
      color: var(--text-color);
    }

    .empty-state p {
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .card-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  filteredPeople: Person[] = [];
  loading = true;
  searchTerm = '';
  showDeleteDialog = false;
  personToDelete: Person | null = null;
  deleteDialogMessage = '';

  constructor(
    private peopleService: PeopleService, 
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.people = people;
        this.filteredPeople = [...people];
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.showError('Failed to load people: ' + error.message);
        this.loading = false;
      }
    });
  }

  filterPeople(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPeople = [...this.people];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredPeople = this.people.filter(person => 
      person.firstName.toLowerCase().includes(term) || 
      person.lastName.toLowerCase().includes(term) || 
      person.email.toLowerCase().includes(term)
    );
  }

  openDeleteConfirmation(person: Person): void {
    this.personToDelete = person;
    this.deleteDialogMessage = `Are you sure you want to delete ${person.firstName} ${person.lastName}?`;
    this.showDeleteDialog = true;
  }

  confirmDelete(): void {
    if (this.personToDelete) {
      this.peopleService.deletePerson(this.personToDelete.id).subscribe({
        next: () => {
          this.notificationService.showSuccess(`${this.personToDelete?.firstName} ${this.personToDelete?.lastName} has been deleted.`);
          this.loadPeople();
          this.showDeleteDialog = false;
          this.personToDelete = null;
        },
        error: (error) => {
          this.notificationService.showError('Failed to delete person: ' + error.message);
          this.showDeleteDialog = false;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteDialog = false;
    this.personToDelete = null;
  }
}