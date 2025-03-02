import { NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationDialogService } from '../../notification-dialog/services/notification-dialog.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, DocumentReference } from '@firebase/firestore';
import { priorityList, statusList } from '../../model/incidence';

@Component({
  selector: 'app-incidence-creator',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './incidence-creator.component.html',
  styleUrl: './incidence-creator.component.css'
})
export class IncidenceCreatorComponent {
  public errorMessage: string = "";
  public incidenceForm: FormGroup;
  public isLoading: boolean = false;
  public statusList: string[] = statusList
  public priorityList: string[] = priorityList
  private router = inject(Router)
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService)
  private firestore: Firestore = inject(Firestore);

  constructor(private fb: FormBuilder) {
    this.incidenceForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl(''),
      status: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required)
    });
  }

  async submitIncidence(): Promise<void> {
    this.isLoading = true;
    if (!this.isFormValid()) {
      this.isLoading = false;
      return;
    }
    let created: boolean = await this.createIncidence();
    if (created) {
      this.notificationDialogService.notifySuccess("The incidence was created successfully!")
      this.navigateToUserHome(); //TODO navigate to incidence reading page
    }
    this.isLoading = false;
  }

  private navigateToUserHome() {
    this.router.navigate(['/user-area']);
  }

  private isFormValid(): boolean {
    this.errorMessage = "";
    let addToErrorMessage = (s: string) => this.errorMessage += (this.errorMessage != "" ? ", " : "") + s;
    if (this.incidenceForm.controls['title'].invalid) {
      addToErrorMessage("Add an incidence title, at least 6 chars long");
    }
    if (this.incidenceForm.controls['status'].invalid) {
      addToErrorMessage("You must select a status");
    }
    if (this.incidenceForm.controls['priority'].invalid) {
      addToErrorMessage("You must select a priority");
    }
    return this.errorMessage == "";
  }

  private async createIncidence(): Promise<boolean> {
    const incidenceCollection = collection(this.firestore, 'incidence');
    await addDoc(incidenceCollection, {
      title: this.incidenceForm.value.title,
      description: this.incidenceForm.value.description,
      status: this.incidenceForm.value.status,
      priority: this.incidenceForm.value.priority,
      url: this.createIncidenceUrl(this.incidenceForm.value.title)
    });
    return true;
  }

  private createIncidenceUrl(title: string): string {
    return title
      .trim() // Trim leading and trailing whitespace
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove any non-alphanumeric characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase(); // Optional: Convert to lowercase (if desired)
  }
}
