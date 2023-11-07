import { Router } from 'express'
const router = Router();

import {postCrearAlmacen,getAlmacen,putupdateAlmacen,delateAlmacen} from '../controllers/almacen.controllers'


router.route('/almacen')
        .get(getAlmacen)
        .post(postCrearAlmacen)
router.route('/almacen/:id')
        .put(putupdateAlmacen)
        .delete(delateAlmacen)


export default router