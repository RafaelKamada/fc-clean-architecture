import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "John", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for find product use case", () => {

    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new FindProductUseCase(productRepository);
        
        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            price: 10
        }
        const result = await productCreateUseCase.execute(input);

        expect(result).toEqual(output);
    });

    it("Should not find a product", () => {       
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        })
        const productCreateUseCase = new FindProductUseCase(productRepository);
        
        const input = {
            id: "123",
        }

        expect(() => {
            return productCreateUseCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});