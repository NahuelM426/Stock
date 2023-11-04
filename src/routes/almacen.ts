import { Router } from 'express'
const router = Router();

import {postCrearAlmacen,getAlmacen,putupdatePhoto,delateAlmacen} from '../controllers/almacen.controllers'


router.route('/almacen')
        .get(getAlmacen)
        .post(postCrearAlmacen)
router.route('/almacen/:id')
        .put(putupdatePhoto)
        .delete(delateAlmacen)


export default router