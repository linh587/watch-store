import { Component } from "@angular/core";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent {
  public BLOGS = [
    {
      authorName: "Mai Linh",
      postedAt: "30 Oct 2019",
      articlesName:
        "Ruiz Watch is one of the web's most visited watch sites and the world's",
      articlesImage: "assets/images/blog/blog-01.webp",
    },
    {
      authorName: "Phuong Anh",
      postedAt: "20 Oct 2019",
      articlesName:
        "Ruiz Watch reviews and most popular watch & timepiece blog for serious",
      articlesImage: "assets/images/blog/blog-02.webp",
    },
    {
      authorName: "Quang An",
      postedAt: "13 Oct 2019",
      articlesName:
        "Connected to the World: Introducing the G-Shock MTG-B1000-1A",
      articlesImage: "assets/images/blog/blog-03.webp",
    },
  ];
}
