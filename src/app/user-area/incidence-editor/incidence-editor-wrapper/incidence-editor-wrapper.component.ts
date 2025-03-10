import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incidence } from '../../../model/incidence';
import { IncidenceEditorComponent } from '../incidence-editor.component';

@Component({
  selector: 'app-incidence-editor-wrapper',
  imports: [NgIf, IncidenceEditorComponent],
  template: `
    <div *ngIf="isLoading">
      <p>Loading...</p>
    </div>
    <div *ngIf="!isLoading && incidence">
      <app-incidence-editor [incidence]="incidence"></app-incidence-editor>
    </div>
    <div *ngIf="!isLoading && !incidence">
      <p>Incidence not found.</p>
    </div>
  `
})
export class IncidenceEditorWrapperComponent implements OnInit {
  incidence!: Incidence;
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.incidence = data['incidence'];
      this.isLoading = false;
    });
  }
}