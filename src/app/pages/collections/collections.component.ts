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
  public showCategoryFilter: boolean = false;
  public showPriceFitler: boolean = false;
  public showGeneralFilter: boolean = false;
  public showFaceProductFilter: boolean = false;
  public showWaterResistanceFilter: boolean = false;

  public activeCategory!: string;
  public activePrice!: string;
  public activeFaceShape!: string;
  public activeGlassSurface!: string;
  public activeWaterResistance!: string;

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
      this.activeCategory = params?.categoryId;
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

  public filterByCategory(event: Event, id: string) {
    this.activeCategory = id;
    event.stopPropagation();
    this.searchForm.patchValue(
      {
        categoryId: id,
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

  public filterByFaceShape(event: Event, key: string) {
    this.activeFaceShape = key;
    event.stopPropagation();
    this.searchForm.patchValue(
      {
        faceShape: key,
      },
      {
        emitEvent: false,
      }
    );
  }

  public filterByGlassSurface(event: Event, key: string) {
    this.activeGlassSurface = key;
    event.stopPropagation();
    this.searchForm.patchValue(
      {
        glassSurface: key,
      },
      {
        emitEvent: false,
      }
    );
  }

  public filterByWaterResistance(event: Event, key: string) {
    this.activeWaterResistance = key;
    event.stopPropagation();
    this.searchForm.patchValue(
      {
        waterResistance: key,
      },
      {
        emitEvent: false,
      }
    );
  }

  public resetGlassProduct() {
    this.searchForm.patchValue({
      faceShape: "",
      glassSurface: "",
    });

    this.activeFaceShape = "";
    this.activeGlassSurface = "";
  }

  public resetPrice() {
    this.searchForm.patchValue({
      fromPrice: "",
      toPrice: "",
    });

    this.activePrice = "";
  }

  public resetCategory() {
    this.searchForm.patchValue({
      categoryId: "",
    });
    this.activeCategory = "";
  }

  public resetWaterResistance() {
    this.searchForm.patchValue({
      waterResistance: "",
    });
    this.activeWaterResistance = "";
  }

  public applyFilter() {
    this.searchForm.patchValue({});
  }

  public resetSearch() {
    this.searchForm.reset();
    this.activePrice = "";
    this.activeCategory = "";
  }

  public sortByCondition(event: any) {
    this.searchForm.patchValue({
      sort: event.target.value,
    });
  }

  public onToggleCategoryFilter(event: Event) {
    event.stopPropagation();
    this.showCategoryFilter = !this.showCategoryFilter;
    this.showPriceFitler = false;
    this.showGeneralFilter = false;
    this.showFaceProductFilter = false;
    this.showWaterResistanceFilter = false;
  }

  public onTogglePriceFilter(event: Event) {
    event.stopPropagation();
    this.showPriceFitler = !this.showPriceFitler;
    this.showCategoryFilter = false;
    this.showGeneralFilter = false;
    this.showFaceProductFilter = false;
    this.showWaterResistanceFilter = false;
  }

  public onToggleGeneralFilter(event: Event) {
    event.stopPropagation();
    this.showGeneralFilter = !this.showGeneralFilter;
    this.showCategoryFilter = false;
    this.showPriceFitler = false;
    this.showFaceProductFilter = false;
    this.showWaterResistanceFilter = false;
  }

  public onToggleFaceProductFilter(event: Event) {
    event.stopPropagation();
    this.showFaceProductFilter = !this.showFaceProductFilter;
    this.showCategoryFilter = false;
    this.showPriceFitler = false;
    this.showGeneralFilter = false;
    this.showWaterResistanceFilter = false;
  }

  public onToggleWaterResistanceFilter(event: Event) {
    event.stopPropagation();
    this.showWaterResistanceFilter = !this.showWaterResistanceFilter;
    this.showCategoryFilter = false;
    this.showPriceFitler = false;
    this.showGeneralFilter = false;
    this.showFaceProductFilter = false;
  }

  @HostListener("document:click", ["$event"]) onDocumentClick() {
    this.showCategoryFilter = false;
    this.showPriceFitler = false;
    this.showGeneralFilter = false;
    this.showFaceProductFilter = false;
    this.showWaterResistanceFilter = false;
  }
}
