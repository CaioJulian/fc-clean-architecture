import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Integration test for listing product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();

    const productOne = new Product("1", "Product Alfa", 123);
    const productTwo = new Product("2", "Product Beta", 780);

    await productRepository.create(productOne);
    await productRepository.create(productTwo);

    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products).toEqual([
      { id: productOne.id, name: productOne.name, price: productOne.price },
      { id: productTwo.id, name: productTwo.name, price: productTwo.price },
    ]);
  });
});
