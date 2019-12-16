import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { BookService } from "./book.service";
import { HttpClient } from "@angular/common/http";

describe("BookService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientTestingModule }]
    })
  );

  it("should be created", () => {
    const service: BookService = TestBed.get(BookService);
    expect(service).toBeTruthy();
  });
});
