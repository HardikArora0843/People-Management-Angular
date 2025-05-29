import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';
import { NotificationService } from '../../services/notification.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="container slide-in">
      <div class="header">
        <h1>{{ isNewPerson ? 'Add Person' : 'Edit Person' }}</h1>
        <button class="back-button" (click)="goBack()">Back to List</button>
      </div>

      @if (loading) {
        <app-loading-spinner message="Loading person data..."></app-loading-spinner>
      } @else {
        <form [formGroup]="personForm" (ngSubmit)="onSubmit()" class="person-form" @formAnimation>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" formControlName="firstName" class="form-control">
              @if (formControls['firstName'].invalid && (formControls['firstName'].dirty || formControls['firstName'].touched)) {
                <div class="error-message">
                  @if (formControls['firstName'].errors?.['required']) {
                    <span>First name is required</span>
                  }
                </div>
              }
            </div>

            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" formControlName="lastName" class="form-control">
              @if (formControls['lastName'].invalid && (formControls['lastName'].dirty || formControls['lastName'].touched)) {
                <div class="error-message">
                  @if (formControls['lastName'].errors?.['required']) {
                    <span>Last name is required</span>
                  }
                </div>
              }
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" formControlName="email" class="form-control">
              @if (formControls['email'].invalid && (formControls['email'].dirty || formControls['email'].touched)) {
                <div class="error-message">
                  @if (formControls['email'].errors?.['required']) {
                    <span>Email is required</span>
                  } @else if (formControls['email'].errors?.['email']) {
                    <span>Please enter a valid email address</span>
                  }
                </div>
              }
            </div>

            <div class="form-group">
              <label for="phone">Phone *</label>
              <input type="tel" id="phone" formControlName="phone" class="form-control">
              @if (formControls['phone'].invalid && (formControls['phone'].dirty || formControls['phone'].touched)) {
                <div class="error-message">
                  @if (formControls['phone'].errors?.['required']) {
                    <span>Phone number is required</span>
                  }
                </div>
              }
            </div>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" formControlName="address" class="form-control">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" formControlName="city" class="form-control">
            </div>

            <div class="form-group">
              <label for="state">State</label>
              <input type="text" id="state" formControlName="state" class="form-control">
            </div>

            <div class="form-group">
              <label for="zipCode">Zip Code</label>
              <input type="text" id="zipCode" formControlName="zipCode" class="form-control">
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-button" (click)="goBack()">Cancel</button>
            <button type="submit" class="save-button" [disabled]="personForm.invalid || submitting">
              {{ submitting ? 'Saving...' : 'Save Person' }}
            </button>
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
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

    .person-form {
      background-color: var(--card-bg);
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 10px var(--shadow-color);
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      flex: 1;
      margin-bottom: 16px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: var(--text-color);
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 16px;
      transition: border-color 0.2s;
      background-color: var(--card-bg);
      color: var(--text-color);
    }

    .form-control:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }

    .form-control.ng-invalid.ng-touched {
      border-color: var(--danger-color);
    }

    .error-message {
      color: var(--danger-color);
      font-size: 12px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    .back-button, .cancel-button, .save-button {
      padding: 10px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .back-button {
      background-color: #6c757d;
      color: white;
    }

    .back-button:hover {
      background-color: #5a6268;
      transform: translateY(-2px);
    }

    .cancel-button {
      background-color: var(--card-bg);
      color: var(--text-color);
      border: 1px solid var(--border-color);
    }

    .cancel-button:hover {
      background-color: #e9ecef;
    }

    .save-button {
      background-color: var(--primary-color);
      color: white;
    }

    .save-button:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
    }

    .save-button:disabled {
      background-color: #a8c7ec;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  personId: number | null = null;
  isNewPerson = true;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private peopleService: PeopleService,
    private notificationService: NotificationService
  ) {
    this.personForm = this.createForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personId = +id;
      this.isNewPerson = false;
      this.loadPerson(this.personId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    });
  }

  loadPerson(id: number): void {
    this.loading = true;
    this.peopleService.getPerson(id).subscribe({
      next: (person) => {
        this.personForm.patchValue(person);
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.showError('Failed to load person: ' + error.message);
        this.loading = false;
        this.router.navigate(['/people']);
      }
    });
  }

  onSubmit(): void {
    if (this.personForm.invalid) {
      this.markFormGroupTouched(this.personForm);
      return;
    }

    this.submitting = true;
    const personData = this.personForm.value;

    if (this.isNewPerson) {
      this.peopleService.addPerson(personData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Person added successfully!');
          this.router.navigate(['/people']);
        },
        error: (error) => {
          this.notificationService.showError('Failed to add person: ' + error.message);
          this.submitting = false;
        }
      });
    } else if (this.personId) {
      const updatedPerson: Person = {
        ...personData,
        id: this.personId
      };

      this.peopleService.updatePerson(updatedPerson).subscribe({
        next: () => {
          this.notificationService.showSuccess('Person updated successfully!');
          this.router.navigate(['/people']);
        },
        error: (error) => {
          this.notificationService.showError('Failed to update person: ' + error.message);
          this.submitting = false;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  get formControls() {
    return this.personForm.controls;
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}