import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';
import { ICategories } from 'src/app/interfaces/ICategories';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: ICategories;
  categoryKeys: string[];

  constructor(
    private http: HttpClient,
    private title: Title,
    private loaderService: LoaderService
  ) {}
  ngOnInit() {
    this.title.setTitle('Browse categories | Hetchfund');
    this.getCategories();
  }

  getCategories() {
    this.loaderService.showLoader();
    this.http
      .get([environment.farmhouse, 'categories'].join('/'))
      .subscribe((response: IBackendResponse<ICategories>) => {
        this.loaderService.hideLoader();
        if (response.status_code == '200') {
          this.categories = response.data;
          this.categoryKeys = Object.keys(this.categories);
          console.log(this.categories, this.categoryKeys);
        }
      });
  }
}
