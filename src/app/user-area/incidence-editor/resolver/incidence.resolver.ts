import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { NotificationDialogService } from '../../../notification-dialog/services/notification-dialog.service';
import { Incidence } from '../../../model/incidence';

@Injectable({
  providedIn: 'root'
})
export class IncidenceResolver implements Resolve<any> {
  private firestore: Firestore = inject(Firestore);
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService);

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const incidenceUrl = route.paramMap.get('incidence-url');
    const incidenceCollection = collection(this.firestore, 'incidence');
    const q = query(incidenceCollection, where("url", "==", incidenceUrl));

    const incidences = await getDocs(q);
    if (incidences.size > 1) {
      this.notificationDialogService.notifyError("More than 1 incidence found for the specified url (" + incidenceUrl + ") Contact support for help")
    } else if (incidences.empty) {
      this.notificationDialogService.notifyError("No incidence found for the specified url (" + incidenceUrl + ")")
    }
    
    let inc: Incidence = {
      ...incidences.docs[0].data(),
      id: incidences.docs[0].id,
    } as Incidence;

    return inc
  }
}