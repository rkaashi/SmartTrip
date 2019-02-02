import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private _data_things: any;
  constructor() { }
  set data_things(value: any) {
    this._data_things = value;
  }
  get data_things(): any {
    return  JSON.parse(this._data_things);
  }
}
