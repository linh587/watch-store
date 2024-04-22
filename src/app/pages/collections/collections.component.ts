import { Component, HostListener, Injector, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products/products.service";
import { FormGroup } from "@angular/forms";
import { SyncQueryParam } from "../../public/helpers/params.helper";
import { SyncUrlWithSearchRealEstateHelper } from "../../public/helpers/sync-url-with-search-real-estate.helper";
import { FormSearchHelper } from "../../public/helpers/form-search.helper";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, take } from "rxjs";
import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import { Response } from "../../models/common.model";
import {
  FACE_SHAPE_FILTER,
  GLASS_SURFACE_MATERIAL_FILTER,
  PRICE_FILTER,
  WATER_RESISTANCE_FILTER,
} from "../../public/constants/common";

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

  public PRICE_FILTER = PRICE_FILTER;
  public FILTER_GLASS_SURFACE_MATERIAL = GLASS_SURFACE_MATERIAL_FILTER;
  public FILTER_FACE_SHAPE = FACE_SHAPE_FILTER;
  public FILTER_WATER_RESISTANCE = WATER_RESISTANCE_FILTER;
  public productList$ = new BehaviorSubject<Product[]>([]);
  public page = 1;
  public categories: Category[] = [];
  public showFilter: { [key: string]: boolean } = {
    general: false,
    category: false,
    price: false,
    faceProduct: false,
    waterResistance: false,
  };

  public activeFilters: { [key: string]: string } = {
    categoryId: "",
    price: "",
    faceShape: "",
    glassSurface: "",
    waterResistance: "",
  };

  public activePrice!: string;

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
    this.getParamsOnInit();
  }

  private getParamsOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params: any) => {
      this.activeFilters["categoryId"] = params?.categoryId;
    });
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
      sort: "newest",
    });
  }

  private getListProduct() {
    this.productsService.getProducts().subscribe((res: Response) => {
      this.productList$.next(res.data);
    });
  }

  private getAllBrand() {
    this.productsService.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }

  public toggleFilter(event: Event, filterType: string) {
    event.stopPropagation();
    Object.keys(this.showFilter).forEach((key) => {
      this.showFilter[key] = key === filterType ? !this.showFilter[key] : false;
    });
  }

  public sortByCondition(event: any) {
    this.searchForm.patchValue({
      sort: event.target.value,
    });
  }

  public resetGlassProduct() {
    this.searchForm.patchValue({
      faceShape: "",
      glassSurface: "",
    });

    this.activeFilters["faceShape"] = "";
    this.activeFilters["glassSurface"] = "";
  }

  public resetPrice() {
    this.searchForm.patchValue({
      fromPrice: "",
      toPrice: "",
    });

    this.activePrice = "";
  }

  public applyFilter() {
    this.searchForm.patchValue({});
  }

  public resetSearch() {
    this.searchForm.reset();
    this.activePrice = "";
    Object.keys(this.activeFilters).forEach((key) => {
      this.activeFilters[key] = "";
    });
  }

  public resetFilter(filterType: string) {
    this.searchForm.patchValue({
      [filterType]: "",
    });
    this.activeFilters[filterType] = "";
  }

  public filterBy(event: Event, filterType: string, key: string) {
    this.activeFilters[filterType] = key;
    event.stopPropagation();
    this.searchForm.patchValue(
      {
        [filterType]: key,
      },
      { emitEvent: false }
    );
  }

  public filterByPrice(event: Event, price: any) {
    this.activePrice = price.id;
    event.stopPropagation();
    this.searchForm.patchValue(
      {
        fromPrice: price.from,
        toPrice: price.to,
      },
      {
        emitEvent: false,
      }
    );
  }

  @HostListener("document:click", ["$event"]) onDocumentClick() {
    Object.keys(this.showFilter).forEach((key) => {
      this.showFilter[key] = false;
    });
  }
}
