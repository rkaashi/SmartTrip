import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-brand-messaging',
  templateUrl: './brand-messaging.component.html',
  styleUrls: ['./brand-messaging.component.css']
})
export class BrandMessagingComponent implements OnInit, OnChanges {
  @Input() Images: string[];
  @Input() Heading: string[];
  @Input() text: string[];
  public input_Text: string[][];
  constructor() {
    this.input_Text = [];
  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.Images);
    console.log(this.Heading);
    console.log(this.text);
    let j = 0;
    for (let i = 0; i < this.Images.length; i++) {
      this.input_Text[i] = [];
      this.input_Text[i][j] = this.Images[i];
      this.input_Text[i][++j] = this.Heading[i];
      this.input_Text[i][++j] = this.text[i];
      j = 0;
    }
  }
}
