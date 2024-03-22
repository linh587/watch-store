import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appGetNameById]",
})
export class GetNameByIdDirective {
  @Input() id!: string | number;
  @Input() list!: any[];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.execute();
  }

  ngOnChanges(): void {
    this.execute();
  }

  execute() {
    const element = this.el.nativeElement as HTMLElement;

    element.innerHTML = this.getName();
  }

  getName() {
    if (this.list && this.list.length) {
      return this.list?.find((u) => u.id === this.id)?.name || null;
    }

    return "";
  }
}
