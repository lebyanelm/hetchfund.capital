import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.page.html',
  styleUrls: ['./selected-category.page.scss'],
})
export class SelectedCategoryPage implements OnInit {
  selectedCategory: string = "";
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => this.selectedCategory = params.get("categoryName"));
  }

}
