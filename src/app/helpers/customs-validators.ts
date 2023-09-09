import { AbstractControl } from "@angular/forms";



export function dateRange(){
    return (control:AbstractControl)=>{
      const result=(control.value as any[])?.filter(a=>a!==null);
      return result?.length==2?null:{error:"Required"}
    }
  }