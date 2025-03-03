import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incidence } from '../../../model/incidence';
import { IncidenceDetailComponent } from '../incidence-detail.component';
import { IncidenceComment } from '../../../model/incidence-comment';


@Component({
  selector: 'app-incidence-detail-wrapper',
  imports: [NgIf, IncidenceDetailComponent],
  template: `
    <div *ngIf="isLoading">
      <p>Loading...</p>
    </div>
    <div *ngIf="!isLoading && incidence">
      <app-incidence-detail [incidence]="incidence"></app-incidence-detail>
    </div>
    <div *ngIf="!isLoading && !incidence">
      <p>Incidence not found.</p>
    </div>
  `
})
export class IncidenceDetailWrapperComponent implements OnInit {
  incidence!: Incidence;
  comments!: IncidenceComment[];
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.incidence = data['incidence'];
      this.comments = data['comments']
      this.isLoading = false;
    });
  }
}