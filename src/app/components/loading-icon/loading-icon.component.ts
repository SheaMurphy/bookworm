import { Component, OnDestroy } from "@angular/core";

@Component({
  selector: "app-loading-icon",
  templateUrl: "./loading-icon.component.html",
  styleUrls: ["./loading-icon.component.scss"]
})
export class LoadingIconComponent implements OnDestroy {
  loaderType = "worm";
  half = 0;
  full = 1;

  interval = setInterval(() => this.incrementNumbers(), 300);

  incrementNumbers() {
    this.half++;
    if (this.half > 3) {
      this.half = 0;
    }
    this.full++;
    if (this.full > 3) {
      this.full = 0;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
