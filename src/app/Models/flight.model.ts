
export class Flight {
  Name: string;
  Price: string;
  Source: string;
  Destination: string;
  Class: string;
  TotalSeats: number;
  AvailableSeats: number;
  Date: string;
  Time: string;
  Image: string;
  ID: string;


  constructor(Source: string, Destination: string, Class: string, Date: string, TotalSeats?: number, AvailableSeats?: number, Time?: string, Name?: string, Price?: string, Image?: string, ID?: string) {
    this.Name = Name;
    this.Price = Price;
    this.Source = Source;
    this.Destination = Destination;
    this.Class = Class;
    this.TotalSeats = TotalSeats;
    this.AvailableSeats = AvailableSeats;
    this.Date = Date;
    this.Time = Time;
    this.Image = Image;
    this.ID = ID;
  }
}
