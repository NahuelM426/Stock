import { Router } from 'express'
const router = Router();

import {postCrearProducto,getProducto,getProductoId,delateProducto,putupdateProducto} from '../controllers/producto.controllers'


router.route('/producto')
        .get(getProducto)
        .post(postCrearProducto)
router.route('/producto/:id')
        .get(getProductoId)
        .put(putupdateProducto)
        .delete(delateProducto)


export default router