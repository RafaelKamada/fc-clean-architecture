import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test for create product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("Should create a product", async () => {
        const customerRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(customerRepository);

        const product = new Product("123", "John", 10);
        await customerRepository.create(product);
        const result2 = await customerRepository.find(product.id);
        expect(result2).toEqual(product);

        const input = {
            type: "a",
            name: "John",
            price: 10,
        }

        const output = {
            id: "123",
            name: "John",
            price: 10,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

});