
export class User {
  Name: string;
  Email: string;
  Address: string;
  City: string;
  State: string;
  Phone: string;
  Age: string;
  Password: string;
  Gender: string;
  BusinessUser: string;
  ID: string;


  constructor(Email: string, Password: string, Name?: string, Address?: string, City?: string, State?: string, Phone?: string, Age?: string , Gender?: string, BusinessUser?: string, ID?: string) {
    this.Name = Name;
    this.Email = Email;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.Phone = Phone;
    this.Age = Age;
    this.Password = Password;
    this.Gender = Gender;
    this.BusinessUser = BusinessUser;
    this.ID = ID;
  }
}
