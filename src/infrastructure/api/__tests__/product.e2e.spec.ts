import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const data = {
      type: "a",
      name: "Product Alfa",
      price: 123,
    };

    const response = await request(app).post("/product").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: data.name,
      price: data.price,
    });
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const dataOne = {
      type: "a",
      name: "Product Alfa",
      price: 123,
    };

    const responseOne = await request(app).post("/product").send(dataOne);
    expect(responseOne.status).toBe(201);

    const dataTwo = {
      type: "a",
      name: "Product Beta",
      price: 890,
    };

    const responseTwo = await request(app).post("/product").send(dataTwo);
    expect(responseTwo.status).toBe(201);

    const responseList = await request(app).get("/product").send();
    expect(responseList.status).toBe(200);
    expect(responseList.body.products.length).toBe(2);
    expect(responseList.body.products).toEqual([
      { id: expect.any(String), name: dataOne.name, price: dataOne.price },
      { id: expect.any(String), name: dataTwo.name, price: dataTwo.price },
    ]);
  });
});
