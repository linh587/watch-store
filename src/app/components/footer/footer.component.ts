import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public SOCIAL_ICONS = [
    {
      name: "facebook",
      icon: "fa-brands fa-facebook-f",
      bgColor: "#3b5997",
    },
    {
      name: "twitter",
      icon: "fa-brands fa-twitter",
      bgColor: "#1da1f2",
    },
    {
      name: "instagram",
      icon: "fa-brands fa-instagram",
      bgColor: "#dc3472",
    },
    {
      name: "linkedin",
      icon: "fa-brands fa-linkedin",
      bgColor: "#0077b5",
    },
    {
      name: "rss",
      icon: "fa-solid fa-rss",
      bgColor: "#eb8314",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
