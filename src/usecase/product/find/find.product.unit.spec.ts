import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("12345", "Product Alfa", 678);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "12345",
    };

    const output = {
      id: "12345",
      name: "Product Alfa",
      price: 678,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
