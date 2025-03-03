import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-creator',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-creator.component.html',
  styleUrl: './comment-creator.component.css'
})
export class CommentCreatorComponent {
  public commentForm: FormGroup;
  public errorMessage: string = "";
  private fb: FormBuilder = inject(FormBuilder)

  constructor() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  createComment() {
    //TODO
  }
}
