
import Product from "./product";

export default class ProductB extends Product {
  get price(): number {
    return this._price * 2;
  }
}
