import { Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PersonEditComponent },
  { path: 'people/edit/:id', component: PersonEditComponent },
  { path: '**', redirectTo: 'people' }
];