import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private localStorageKey = 'people-manager-data';
  private people: Person[] = [];
  private nextId = 1;

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      this.people = JSON.parse(storedData);
      // Find the highest ID to set nextId correctly
      this.nextId = Math.max(...this.people.map(p => p.id), 0) + 1;
    } else {
      // Initialize with data from API if localStorage is empty
      this.fetchFromApi();
    }
  }

  private fetchFromApi(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.map(user => this.mapToPerson(user)))
    ).subscribe({
      next: (people) => {
        this.people = people;
        this.saveToLocalStorage();
        this.nextId = Math.max(...this.people.map(p => p.id), 0) + 1;
      },
      error: (error) => console.error('Error fetching initial data', error)
    });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.people));
  }

  getPeople(): Observable<Person[]> {
    return of([...this.people]);
  }

  getPerson(id: number): Observable<Person> {
    const person = this.people.find(p => p.id === id);
    if (person) {
      return of({...person});
    }
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(user => this.mapToPerson(user)),
      catchError(this.handleError)
    );
  }

  addPerson(personData: Omit<Person, 'id'>): Observable<Person> {
    const newPerson: Person = {
      ...personData,
      id: this.nextId++,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${this.nextId}.jpg`
    };
    
    this.people.push(newPerson);
    this.saveToLocalStorage();
    
    return of({...newPerson});
  }

  updatePerson(person: Person): Observable<Person> {
    const index = this.people.findIndex(p => p.id === person.id);
    
    if (index !== -1) {
      // Preserve the avatar if it exists
      const avatar = this.people[index].avatar;
      this.people[index] = {
        ...person,
        avatar: avatar || person.avatar
      };
      this.saveToLocalStorage();
      return of({...this.people[index]});
    }
    
    return this.http.put<any>(`${this.apiUrl}/${person.id}`, person).pipe(
      map(response => this.mapToPerson(response)),
      catchError(this.handleError)
    );
  }

  deletePerson(id: number): Observable<void> {
    const index = this.people.findIndex(p => p.id === id);
    
    if (index !== -1) {
      this.people.splice(index, 1);
      this.saveToLocalStorage();
      return of(void 0);
    }
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private mapToPerson(user: any): Person {
    return {
      id: user.id,
      firstName: user.name?.split(' ')[0] || user.firstName || '',
      lastName: user.name?.split(' ')[1] || user.lastName || '',
      email: user.email,
      phone: user.phone,
      address: user.address?.street || user.address || '',
      city: user.address?.city || user.city || '',
      state: user.address?.suite || user.state || '',
      zipCode: user.address?.zipcode || user.zipCode || '',
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${user.id}.jpg`
    };
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}