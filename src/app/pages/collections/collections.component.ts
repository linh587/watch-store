import { Component, Injector, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products/products.service";
import { FormGroup } from "@angular/forms";
import { SyncQueryParam } from "../../public/helpers/params.helper";
import { SyncUrlWithSearchRealEstateHelper } from "../../public/helpers/sync-url-with-search-real-estate.helper";
import { FormSearchHelper } from "../../public/helpers/form-search.helper";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
  providers: [FormSearchHelper, SyncUrlWithSearchRealEstateHelper],
})
export class CollectionsComponent implements OnInit {
  @SyncQueryParam({
    parseIgnore: [""],
  })
  public searchForm: FormGroup;

  public productList$ = new BehaviorSubject<any>(null);
  public page = 1;
  public categories: any[] = [];
  public showCategory: boolean = true;

  constructor(
    public injector: Injector,
    private productsService: ProductsService,
    private formSearch: FormSearchHelper,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.formSearch.form;
  }

  ngOnInit() {
    this.getListProduct();
    this.getAllBrand();
    this.initParams();
    this.observeProductChange();
  }

  private observeProductChange() {
    this.route.queryParams.pipe().subscribe((params) => {
      this.productsService.getProducts(params).subscribe((res) => {
        this.productList$.next(res.data);
      });
    });
  }

  private initParams() {
    this.searchForm.patchValue({
      page: "",
      status: "",
      includes: "images, priceAndSize",
    });
  }

  private getListProduct() {
    this.productsService.getProducts().subscribe((res: any) => {
      this.productList$.next(res.data);
    });
  }

  private getAllBrand() {
    this.productsService.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }

  public sortByCategory(id: string) {
    this.searchForm.patchValue({
      categoryId: id,
    });
  }

  public resetSearch() {
    this.searchForm.patchValue({
      categoryId: "",
    });
  }

  public sortByCondition(event: any) {
    this.searchForm.patchValue({
      sort: event.target.value,
    });
  }
}
