import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent {
  @Input() max: number;
  @Output() handleInput = new EventEmitter();
}
