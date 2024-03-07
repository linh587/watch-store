import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  submitted = false;
  ListJsData!: any[];
  checkedList: any;
  masterSelected!: boolean;
  rotateClass: string = "";

  // Input: list data table pass from parent component
  @Input() data: any[] = [];
  @Input() page: number = 0; //Page hiện tại
  @Input() total: number = 0; // Tổng số bản ghi
  @Input() pageSize: number = 0; // Số lượng bản ghi ở page hiện tại
  @Input() limit: number = 0; // limit của mỗi page
  @Input() columns: any[] = [];
  @Input() subColumnsDefines: any[] = [];
  @Input() title: any;
  @Input() logError: any; // log lỗi
  // Output
  @Output() pageChange = new EventEmitter();

  // Content child
  @ContentChild("headers")
  headers!: TemplateRef<any> | null;

  @ContentChild("rows")
  rows!: TemplateRef<any> | null;

  @ContentChild("rowExpand")
  rowExpand!: TemplateRef<any> | null;

  @ContentChild("noData")
  noData!: TemplateRef<any> | null;

  constructor(private modalService: NgbModal) {}

  /**
   * Open modal
   * @param content modal content
   */
  openModal(event: any, content: any): void {
    //  Stop mở expand danh sách customer
    event.stopPropagation();
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.ListJsData.length; i++) {
      this.ListJsData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.ListJsData.length; i++) {
      if (this.ListJsData[i].isSelected)
        this.checkedList.push(this.ListJsData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
}
