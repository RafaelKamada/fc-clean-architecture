import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test for update product use case", () => {

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

    it("Should update a product", async () => {
        const customerRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(customerRepository);
        const product = new Product("123", "John", 123);
        const productUpdated = new Product("123", "John Updated", 1234);

        await customerRepository.create(product);
        await customerRepository.update(productUpdated);
        const result = await customerRepository.find(product.id);
        expect(result).toEqual(productUpdated);

        const input = {
            id: "123",
            name: "John Updated",
            price: 1234,
        }

        const output = {
            id: "123",
            name: "John Updated",
            price: 1234,
        }

        const result2 = await usecase.execute(input);
        expect(result2).toEqual(output);
    });

});