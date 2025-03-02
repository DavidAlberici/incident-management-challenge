import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Incidence, priorityList, statusList } from '../../model/incidence';

@Component({
  selector: 'app-incidence-browser',
  imports: [NgForOf],
  templateUrl: './incidence-browser.component.html',
  styleUrl: './incidence-browser.component.css'
})
export class IncidenceBrowserComponent {
  public statusList: string[] = statusList
  public priorityList: string[] = priorityList


  public incidenceList: Incidence[] = [
    new Incidence(
      '1', // id
      'Incidence 1', // title
      'incidence-1', // url
      'This is a sample description for Incidence 1. It can be quite long and should wrap text properly.', // description
      'Open', // status
      'High' // priority
    ),
    new Incidence(
      '2', // id
      'Incidence 2', // title
      'incidence-2', // url
      'This is another sample description for Incidence 2. It should also wrap text properly.', // description
      'Closed', // status
      'Medium' // priority
    ),
    new Incidence(
      '3', // id
      'Incidence 3', // title
      'incidence-3', // url
      'Yet another sample description for Incidence 3. Text wrapping is important here too.', // description
      'In Progress', // status
      'Low' // priority
    ),
  ];
}
