import { ProductCategories } from "./enums/product-categories";

export class Product {

  constructor(public id : string,
              public name : string,
              public price : number,
              public imagesPath : string,
              public imagesNames : string[],
              public dateCreated : Date,
              public description : string,
              public specification : string,
              public productType : ProductCategories,
            ) {}
}