import { Component, Input } from '@angular/core';
import { Incidence } from '../../model/incidence';
import { RealtimeCommentListComponent } from './realtime-comment-list/realtime-comment-list.component';

@Component({
  selector: 'app-incidence-detail',
  imports: [RealtimeCommentListComponent],
  templateUrl: './incidence-detail.component.html',
  styleUrl: './incidence-detail.component.css'
})
export class IncidenceDetailComponent {
  @Input() incidence!: Incidence;

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