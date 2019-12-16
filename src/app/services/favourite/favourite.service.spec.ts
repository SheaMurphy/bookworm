import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { FavouriteService } from "./favourite.service";

describe("FavouriteService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientTestingModule }]
    })
  );

  it("should be created", () => {
    const service: FavouriteService = TestBed.get(FavouriteService);
    expect(service).toBeTruthy();
  });
});
