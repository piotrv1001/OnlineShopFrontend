import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SharedService {
  
    private emitChangeSource = new Subject<any>();

    private cartItemChangeSource = new Subject<boolean>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    cartItemChangeEmitted$ = this.cartItemChangeSource.asObservable();

    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    updateCartItemCount() {
        this.cartItemChangeSource.next(true);
    }
}