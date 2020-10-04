import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthenticateService} from "../authenticate.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticateService: AuthenticateService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        console.log(123);
        // auto logout if 401 response returned from api
        this.authenticateService.logout();
        location.reload();
      }

      const error = {status: err.status, message: err.error.message || '', statusText: err.statusText || ''};
      return throwError(error);
    }));
  }

}
