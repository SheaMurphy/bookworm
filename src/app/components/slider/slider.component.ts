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
  @Input() value: number;
  @Output() handleInput = new EventEmitter();
  distance = "90%";

  ngOnInit() {
    this.initValue();
  }

  ngOnChanges() {
    this.initValue();
  }

  initValue() {
    this.value = this.max;
  }

  handleSlide(slideValue: string) {
    this.value = +slideValue;
    this.handleInput.emit(this.value);
  }
}
