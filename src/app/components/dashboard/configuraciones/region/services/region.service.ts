import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient,
              private formBuilder:FormBuilder) { }
}
