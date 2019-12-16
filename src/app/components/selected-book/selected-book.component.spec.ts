import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectedBookComponent } from "./selected-book.component";

describe("SelectedBookComponent", () => {
  let component: SelectedBookComponent;
  let fixture: ComponentFixture<SelectedBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedBookComponent],
      imports: [FontAwesomeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
