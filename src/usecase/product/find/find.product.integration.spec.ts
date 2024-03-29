import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test for find product use case", () => {

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

    it("Should find a product", async () => {
        const customerRepository = new ProductRepository();
        const usecase = new FindProductUseCase(customerRepository);

        const product = new Product("123", "John", 10);
        await customerRepository.create(product);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            price: 10,
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

});