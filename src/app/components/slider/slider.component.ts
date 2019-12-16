import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() max: number;
  @Output() handleInput = new EventEmitter();
  value: number = 0;

  ngOnInit() {
    this.initValue();
  }

  ngOnChanges() {
    this.initValue();
  }

  initValue() {
    this.value = Math.floor((0 + this.max) / 2);
  }

  handleSlide(slideValue: string) {
    this.value = +slideValue;
    this.handleInput.emit(this.value);
  }
}
