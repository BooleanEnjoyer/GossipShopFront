export class Address {

  constructor(public id : string | null,
              public street : string,
              public houseNumber : string,
              public city : string,
              public zipCode : string,
              public description : string,
  ){}
}
