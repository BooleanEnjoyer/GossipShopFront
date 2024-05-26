export class BuyRequest {

  constructor(public userId : string | null,
              public productsIds : string[]
  ) {}
}
