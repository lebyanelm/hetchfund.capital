import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.page.html',
  styleUrls: ['./selected-category.page.scss'],
})
export class SelectedCategoryPage implements OnInit {
  selectedCategory: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.selectedCategory = params.get('categoryName');
      this.titleService.onTitleChange.next(
        this.selectedCategory + ' — Hetchfund'
      );
    });
  }
}
