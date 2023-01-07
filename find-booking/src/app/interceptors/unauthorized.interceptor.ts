import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export class UnauthorizedInterceptor implements HttpInterceptor {
  private loginUrl: string = window.location.protocol + '//' + window.location.host + '/' + 'login';

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {}
      }, (error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            window.location.href = this.loginUrl;
          }
        }
      })));
  }
}
