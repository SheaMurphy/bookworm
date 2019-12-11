import { Component, Input, Output, EventEmitter } from "@angular/core";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrls: ["./drop-down.component.scss"]
})
export class DropdownComponent {
  @Input() label = "Items";
  @Input() actionLabel?: string;
  @Output() action? = new EventEmitter();

  faSortDown = faSortDown;
  isOpen = false;

  triggerAction() {
    if (this.isOpen === true) {
      this.action.emit();
    }
    this.isOpen = !this.isOpen;
  }
}
