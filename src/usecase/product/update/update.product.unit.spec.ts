import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "John Doe", 123);

const input = {
    id: product.id,
    name: "John Updated",
    price: 1234,
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {

    it("Should update a product", async () => {
        const repository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(repository);

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    });

});