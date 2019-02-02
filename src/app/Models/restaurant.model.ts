
export class Restaurant {
  Name: string;
  Type: string;
  Location: string;
  Rating: number;
  ImpThings: string;
  Image: string;
  ID: string;


  constructor(Name: string, Type: string, Location: string, Rating?: number, ImpThings?: string, Image?: string, ID?: string) {
    this.Name = Name;
    this.Type = Type;
    this.Location = Location;
    this.Rating = Rating;
    this.ImpThings = ImpThings;
    this.Image = Image;
    this.ID = ID;
  }
}
