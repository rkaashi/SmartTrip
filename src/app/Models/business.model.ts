
export class Business {
  Object_id: string;
  User_id: string;
  ID: string;


  constructor(Object_id: string, User_id?: string, ID?: string) {
    this.Object_id = Object_id;
    this.User_id = User_id;
    this.ID = ID;
  }
}
