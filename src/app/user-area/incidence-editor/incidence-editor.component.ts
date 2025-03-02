import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationDialogService } from '../../notification-dialog/services/notification-dialog.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, DocumentReference, updateDoc } from '@firebase/firestore';
import { Incidence } from '../../model/incidence';

@Component({
  selector: 'app-incidence-editor',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './incidence-editor.component.html',
  styleUrl: './incidence-editor.component.css'
})
export class IncidenceEditorComponent implements OnInit {
  @Input() incidence!: Incidence;
  public errorMessage: string = "";
  public incidenceForm: FormGroup;
  public isLoading: boolean = false;
  public statusList: string[] = ["Open", "In Progress", "Solved"]
  public priorityList: string[] = ["Low", "Medium", "High"]
  private router = inject(Router)
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService)
  private firestore: Firestore = inject(Firestore);
  private fb: FormBuilder = inject(FormBuilder)

  constructor() {
    this.incidenceForm = this.fb.group({
      title: new FormControl(''),
      url: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      createdDate: new FormControl(''),
    });
  }

  ngOnInit() {
    if (this.incidence == null) {
      this.notificationDialogService.notifyError("Unexpected error, contact support")
    }
    this.incidenceForm.patchValue({
      title: this.incidence.title,
      url: this.incidence.url,
      createdDate: this.incidence.createdDate,
      description: this.incidence.description,
      status: this.incidence.status,
      priority: this.incidence.priority
    });
  }

  async submitIncidence(): Promise<void> {
    this.isLoading = true;
    if (!this.isFormValid()) {
      this.isLoading = false;
      return;
    }
    let created: boolean = await this.updateIncidence(this.incidence.id);
    if (created) {
      this.notificationDialogService.notifySuccess("The incidence was updated successfully! Url: " + this.incidence.url )
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
    if (this.incidenceForm.controls['status'].invalid) {
      addToErrorMessage("You must select a status");
    }
    if (this.incidenceForm.controls['priority'].invalid) {
      addToErrorMessage("You must select a priority");
    }
    return this.errorMessage == "";
  }

  private async updateIncidence(incidenceId: string): Promise<boolean> {
    const incidenceDocRef = doc(this.firestore, 'incidence', incidenceId);
  
    try {
      // Update the document with the new data
      await updateDoc(incidenceDocRef, {
        title: this.incidenceForm.value.title,
        url: this.incidenceForm.value.url,
        description: this.incidenceForm.value.description,
        status: this.incidenceForm.value.status,
        priority: this.incidenceForm.value.priority,
      });
      return true;
    } catch (error) {
      let reason = (error as any)?.message ?? error ?? "Unknown"
      let fullMsg = 'Error when editing incidence:' + reason
      this.notificationDialogService.notifyError(fullMsg)
      return false;
    }
  }

}
