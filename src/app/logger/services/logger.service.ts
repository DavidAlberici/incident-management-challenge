import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public error(log: string) {
    console.error(log)
  }

  public warning(log: string) {
    console.warn(log)
  }
  
  public log(log: string) {
    console.log(log)
  }
}
