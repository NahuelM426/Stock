import { Router } from 'express'
const router = Router();

import {getRegistro,postCrearRegistro,delateRegistro} from '../controllers/registro.controllers'


router.route('/registro')
        .get(getRegistro)
        .post(postCrearRegistro)
router.route('/registro/:id')
//         .get(getProductoId)
//         .put(putupdateProducto)
        .delete(delateRegistro)


export default router