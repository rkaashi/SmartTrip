
export class Road {
  Name: string;
  Price: string;
  Company: string;
  Source: string;
  Destination: string;
  TotalSeats: number;
  AvailableSeats: number;
  Date: string;
  Time: string;
  Image: string;
  ID: string;


  constructor(Source: string, Destination: string, Company: string, Date: string, Time: string, Name?: string, Price?: string, TotalSeats?: number, AvailableSeats?: number, Image?: string, ID?: string) {
    this.Name = Name;
    this.Price = Price;
    this.Company = Company;
    this.Source = Source;
    this.Destination = Destination;
    this.TotalSeats = TotalSeats;
    this.AvailableSeats = AvailableSeats;
    this.Date = Date;
    this.Time = Time;
    this.Image = Image;
    this.ID = ID;
  }
}
