import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-input-search-suggestion",
  templateUrl: "./input-search-suggestion.component.html",
  styleUrls: ["./input-search-suggestion.component.scss"],
})
export class InputSearchSuggestionComponent implements OnInit {
  @Input() formControlName: any;

  constructor() {}

  ngOnInit() {}
}
