import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonTextarea } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchKey: string = '';

  constructor(private title: Title) {
    this.title.setTitle('Search | Hetchfund');
  }

  ngOnInit() {}

  search(value: string): void {
    this.searchKey = value;
  }
}
