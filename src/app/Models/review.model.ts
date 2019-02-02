
export class Review {
  Object_id: string;
  User_id: string;
  Rating: number;
  Title: string;
  Description: string;
  Date: string;
  ID: string;


  constructor(Object_id: string, User_id?: string, Rating?: number, Title?: string, Description?: string, Date?: string, ID?: string) {
    this.Object_id = Object_id;
    this.User_id = User_id;
    this.Rating = Rating;
    this.Title = Title;
    this.Description = Description;
    this.Date = Date;
    this.ID = ID;
  }
}
