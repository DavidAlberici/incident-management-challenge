import { Component, Input } from '@angular/core';
import { Incidence } from '../../model/incidence';
import { IncidenceComment } from '../../model/incidence-comment';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-incidence-detail',
  imports: [NgForOf],
  templateUrl: './incidence-detail.component.html',
  styleUrl: './incidence-detail.component.css'
})
export class IncidenceDetailComponent {
  @Input() incidence: Incidence = new Incidence(
    '1',
    'Broken Login Page',
    'https://example.com/login',
    'Users are unable to log in due to a server error.',
    'Open',
    'High',
    '2023-10-01T12:34:56Z'
  );
  @Input() comments: IncidenceComment[] = [
    { id: '123456', author: '123', createdDate: '2023-10-01T12:34:56Z', content: 'Issue reported by user John Doe.' },
    { id: '123456', author: '456', createdDate: '2023-10-02T09:15:00Z', content: 'Issue is being investigated by the dev team.' }
  ];; 

  constructor() {}

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}