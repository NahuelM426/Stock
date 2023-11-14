import { Router } from 'express'
const router = Router();

import {getRegistro,postCrearRegistro,delateRegistro,getRegistroId,putupdateRegistro} from '../controllers/registro.controllers'


router.route('/registro')
        .get(getRegistro)
        .post(postCrearRegistro)
router.route('/registro/:id')
        .get(getRegistroId)
        .put(putupdateRegistro)
        .delete(delateRegistro)


export default router