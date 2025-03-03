import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { IncidenceComment } from '../../../model/incidence-comment';
import { collection, doc, docSnapshots, Firestore, getDocs, onSnapshot, query, Unsubscribe } from '@angular/fire/firestore';
import { LoggerService } from '../../../logger/services/logger.service';
import { NotificationDialogService } from '../../../notification-dialog/services/notification-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-realtime-comment-list',
  imports: [NgForOf, NgIf],
  templateUrl: './realtime-comment-list.component.html',
  styleUrl: './realtime-comment-list.component.css'
})
export class RealtimeCommentListComponent implements OnInit, OnDestroy {
  @Input() incidenceId!: string;
  public commentList!: IncidenceComment[];
  private firestore: Firestore = inject(Firestore);
  private logger = inject(LoggerService)
  private notificationDialogService = inject(NotificationDialogService)
  private commentListUnsubscribe!: Unsubscribe;

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

  ngOnInit(): void {
    this.getCommentList()
  }

  ngOnDestroy(): void {
    this.commentListUnsubscribe()
  }

  private async getCommentList(): Promise<void> {
    try {
      const commentsCollection = collection(this.firestore, `incidence/${this.incidenceId}/comment`);

      const q = query(commentsCollection);
      this.commentListUnsubscribe = onSnapshot(q, (querySnapshot) => {
        this.commentList = [];
        querySnapshot.forEach((doc) => {
          let c = {
            ...doc.data(),
            id: doc.id,
          } as IncidenceComment
          this.commentList.push(c);
        });
      });

    } catch (error) {
      let reason = (error as any)?.message ?? error ?? "Unknown"
      let fullMsg = 'Error during email sign in:' + reason
      this.logger.error(fullMsg)
      this.notificationDialogService.notifyError(fullMsg)
    }
  }
}
