import { Request, Response } from 'express'

import Almacen, { IAlmacen } from '../models/Almacen'
import Producto, { IProducto } from '../models/Producto';


export async function getAlmacen(req: Request, res: Response): Promise<Response> {
    const trabajo = await Almacen.find();
    return res.json(trabajo);
}

export async function postCrearAlmacen(req: Request, res: Response): Promise<Response> {
    // username: string;
    // constructora: Boolean;
    // productos: Array<object>;
    const { username } = req.body
    const { constructora } = req.body
    console.log(username)
    console.log(constructora)

    const newalmacen = {
        username: username,
        constructora: constructora,
        productos: []
    }
    const almacen = new Almacen(newalmacen)
    await almacen.save();
    console.log(newalmacen)
    return res.json({
        message: 'Creado Con Exito',
        almacen
    })
}

export async function delateAlmacen(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    console.log("id", id)

    const almacen:any = await Almacen.findById(id);
    console.log("almacen", almacen)
   const productosEli = async () => {
        if (almacen.producto.lenth = 0) {
            const productosEliminados = await Promise.all(almacen.productos.map(async (x: number) => {
                const producto = await Producto.findByIdAndRemove(x)
            }));
            return productosEliminados
        }
    }
    const almacenEliminado = await Almacen.findByIdAndRemove(id);

    console.log("Almacen", almacen)
    console.log("productos", productosEli)
    return res.json({
        message: 'Almacen Eliminado',
        almacenEliminado,
        productosEli
    });
}


export async function putupdatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { username, constructora } = req.body;
    console.log(id)
    const updatedAlmacen = await Almacen.findByIdAndUpdate(id, {
        username,
        constructora
    });
    console.log(updatedAlmacen)
    return res.json({
        message: 'Actualizacion Exito',
        updatedAlmacen
    });
}