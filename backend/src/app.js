import express from 'express';
import cors from 'cors';
import path from 'path';
import productRoutes from './routes/product.routes.js';
import { AppError } from './utils/errors.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Lỗi hệ thống', error: err.message });
});

export default app;
