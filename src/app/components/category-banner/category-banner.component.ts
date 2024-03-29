import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss']
})
export class CategoryBannerComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
