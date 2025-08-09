import { readProducts, writeProducts } from '../models/product.model.js';
import { AppError } from '../utils/errors.js';

const findProduct = (products, id) => {
    const index = products.findIndex(p => p.id === id);
    return { index };
};

export const getAll = async (req, res, next) => {
    try {
        const products = await readProducts();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

export const getOne = async (req, res, next) => {
    try {
        const products = await readProducts();
        const { index } = findProduct(products, Number(req.params.id));
        if (index === -1) throw new AppError('Sản phẩm không tồn tại', 404);
        res.json(products[index]);
    } catch (err) {
        next(err);
    }
};

export const create = async (req, res, next) => {
    try {
        if (!req.body.name) throw new AppError('Tên sản phẩm là bắt buộc', 400);

        const products = await readProducts();
        const newProduct = { id: Date.now(), ...req.body };
        products.push(newProduct);
        await writeProducts(products);

        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const products = await readProducts();
        const { index } = findProduct(products, Number(req.params.id));
        if (index === -1) throw new AppError('Không tìm thấy sản phẩm để cập nhật', 404);

        products[index] = { ...products[index], ...req.body };
        await writeProducts(products);

        res.json(products[index]);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const products = await readProducts();
        const { index } = findProduct(products, Number(req.params.id));
        if (index === -1) throw new AppError('Không tìm thấy sản phẩm để xóa', 404);

        products.splice(index, 1);
        await writeProducts(products);

        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};
