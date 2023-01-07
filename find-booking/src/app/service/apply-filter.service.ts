import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplyFilterService {

  subject: Subject<Map<string, string>> = new Subject<Map<string, string>>();

  constructor() {
  }

  sendFilters(filtersMap: Map<string, string>) {
    this.subject.next(filtersMap);
  }

  getFilters(): Observable<Map<string, string>> {
    return this.subject.asObservable();
  }

}
