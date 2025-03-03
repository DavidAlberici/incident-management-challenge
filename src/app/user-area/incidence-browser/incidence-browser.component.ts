import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Incidence, priorityList, statusList } from '../../model/incidence';
import { collection, Firestore, getDocs, or, query, QueryCompositeFilterConstraint, QueryFilterConstraint, where } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incidence-browser',
  imports: [NgForOf, NgIf, FormsModule, RouterLink],
  templateUrl: './incidence-browser.component.html',
  styleUrl: './incidence-browser.component.css'
})
export class IncidenceBrowserComponent implements OnInit {
  public statusList: string[] = statusList
  public priorityList: string[] = priorityList
  public selectedStatus: string = "Any";
  public selectedPriority: string = "Any";
  public incidenceList: Incidence[] | undefined;
  public isLoading: boolean = true;
  private firestore: Firestore = inject(Firestore)

  ngOnInit(): void {
    this.getIncidenceList()
  }

  public applyFilters(): void {
    this.getIncidenceList()
    console.log("this.selectedStatus " + this.selectedStatus)
    console.log("this.selectedPriority " + this.selectedPriority)
  }

  private getIncidenceList(): void {
    this.isLoading = true;
    const incidenceCollection = collection(this.firestore, 'incidence');
    const q = query(incidenceCollection, this.getCompositeFilter());
    getDocs(q).then(docs => {
      this.isLoading = false;
      this.incidenceList = docs.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
        } as Incidence
      })
    });
  }

  private getCompositeFilter(): QueryCompositeFilterConstraint {
    const filterList: QueryFilterConstraint[] = []
    if (this.selectedStatus != "Any" && this.selectedStatus != undefined) {
      filterList.push(where("status", "==", this.selectedStatus))
    }
    if (this.selectedPriority != "Any" && this.selectedPriority != undefined) {
      filterList.push(where("priority", "==", this.selectedPriority))
    }
    console.log(filterList)
    return or(...filterList)
  }
}
