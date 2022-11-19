import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    })
});

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { updateCategory } from './app/useCases/categories/updateCategory';
import { deleteCategory } from './app/useCases/categories/deleteCategory';

import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategory } from './app/useCases/products/listProductsByCategory';
import { updateProduct } from './app/useCases/products/updateProduct';

import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { updateOrder } from './app/useCases/orders/updateOrder';
import { updateOrderStatus } from './app/useCases/orders/updateOrderStatus';
import { deleteOrder } from './app/useCases/orders/deleteOrder';
import { createUser } from './app/useCases/users/createUser';
import { listUsers } from './app/useCases/users/listUsers';
import { auth } from './app/useCases/users/auth';
import { updateUsers } from './app/useCases/users/updateUsers';
import { listCashiers } from './app/useCases/cashiers/listCashiers';
import { openCashier } from './app/useCases/cashiers/openCashier';
import { closeCashier } from './app/useCases/cashiers/closeCashier';


// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// Update category
router.put('/category/:id', updateCategory);

// Delete category
router.delete('/category/:id', deleteCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Update product
router.put('/product/:id', upload.single('image'), updateProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Update order
router.put('/order/:id', updateOrder);

// Change order status 
router.patch('/order/:id/status', updateOrderStatus);

// Delete/cancel order
router.delete('/order/:id', deleteOrder);

// List users
router.get('/users', listUsers);

// Create user
router.post('/users', createUser);

// Authenticate user
router.post('/users/login', auth);

// Update user
router.put('/user/:id', updateUsers);

// List cashiers
router.get('/cashiers', listCashiers);

// Open cashier
router.post('/cashiers', openCashier);

// Close cashier
router.put('/cashier/:id', closeCashier);