import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let startRequestTime: Date;
    if (req.url.includes('products')) {
      startRequestTime = new Date();
    }
    return next.handle(req).pipe(
      // response interceptor
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Request processed in ' + (new Date().valueOf() - startRequestTime.valueOf()) + ' ms');
          return event;
        }
      })
    );
  }
}

