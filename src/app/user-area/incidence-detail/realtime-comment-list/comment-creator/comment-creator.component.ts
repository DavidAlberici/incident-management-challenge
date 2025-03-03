import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection } from '@firebase/firestore';
import { NotificationDialogService } from '../../../../notification-dialog/services/notification-dialog.service';

@Component({
  selector: 'app-comment-creator',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './comment-creator.component.html',
  styleUrl: './comment-creator.component.css'
})
export class CommentCreatorComponent {
  @Input() incidenceId!: string;
  public commentForm: FormGroup;
  public errorMessage: string = "";
  public isLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder)
  private firestore: Firestore = inject(Firestore)
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService)

  constructor() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async submitComment(): Promise<void> {
    this.isLoading = true;
    if (this.commentForm.invalid) {
      this.isLoading = false;
      this.errorMessage = "Comment content must be at least 10 characters long"
      return;
    }
    let created: boolean = await this.createComment();
    if (created) {
      this.notificationDialogService.notifySuccess("The comment was created successfully!")
      this.commentForm.reset()
    }
    this.isLoading = false;
  }

  private async createComment(): Promise<boolean> {
    const commentsCollection = collection(this.firestore, `incidence/${this.incidenceId}/comment`);
    await addDoc(commentsCollection, {
      content: this.commentForm.value.content,
      createdDate: new Date().toISOString(),
    });
    return true;
  }
}
