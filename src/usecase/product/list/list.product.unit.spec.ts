import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productOne = ProductFactory.create("a", "Product Alfa", 123);
const productTwo = ProductFactory.create("a", "Product Beta", 780);
const products = [productOne, productTwo];

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe("Unit test for listing product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products).toEqual([
      { id: productOne.id, name: productOne.name, price: productOne.price },
      { id: productTwo.id, name: productTwo.name, price: productTwo.price },
    ]);
  });
});
