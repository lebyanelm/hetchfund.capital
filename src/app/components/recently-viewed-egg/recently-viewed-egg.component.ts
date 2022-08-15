import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-viewed-egg',
  templateUrl: './recently-viewed-egg.component.html',
  styleUrls: ['./recently-viewed-egg.component.scss'],
})
export class RecentlyViewedEggComponent implements OnInit {
  percentage_funded = .1876
  constructor() { }

  ngOnInit() {}

  floor(i) {
    return i.toFixed(2);
  }

}
