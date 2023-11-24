import { Injectable } from "@angular/core";
import { Socket} from "ngx-socket-io";

  @Injectable({providedIn: 'root'})
  export class CustomSocket extends Socket {
    constructor() {
      super({url: 'http://localhost:91', });
    }
  } 