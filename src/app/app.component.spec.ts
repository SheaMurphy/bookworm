import { Component } from "@angular/core";
import { AppComponent } from "./app.component";
import { TestComponent } from "@nology/angular-test-simplifier";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({ selector: "app-dashboard", template: "" })
class StubDashboardComponent {}

@Component({ selector: "app-header", template: "" })
class StubHeaderComponent {}

describe("AppComponent", () => {
  let testApp: TestComponent<AppComponent>;

  beforeEach(() => {
    testApp = new TestComponent<AppComponent>(AppComponent);
    testApp.configure({
      declarations: [StubDashboardComponent, StubHeaderComponent],
      imports: [FontAwesomeModule]
    });
    testApp.initialise();
  });

  it("should create the app", () => {
    expect(testApp).toBeTruthy();
  });
});
