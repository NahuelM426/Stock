import { Request, Response } from 'express'

import Almacen, { IAlmacen } from '../models/Almacen'
import Producto, { IProducto } from '../models/Producto';
import { empty } from '@hapi/joi';


export async function getProducto(req: Request, res: Response): Promise<Response> {
    const producto = await Producto.find();
    console.log("prod", producto)
    return res.json(producto);
}

export async function postCrearProducto(req: Request, res: Response): Promise<Response> {
    // codigo: Number;
    // descripcion:String;
    // unidadMedida:String;
    // cantidad:Number;
    // almacen: object;
    const { codigo } = req.body
    const { descripcion } = req.body
    const { unidadMedida } = req.body
    const { cantidad } = req.body
    const { almacen } = req.body

    const almacenBusqueda = await Almacen.findById(almacen);

    const newProducto = {
        codigo: codigo,
        descripcion: descripcion,
        unidadMedida: unidadMedida,
        cantidad: cantidad,
        almacen: almacen
    }

    const producto = new Producto(newProducto)

    almacenBusqueda?.productos.push(producto);
    await producto.save();
    await almacenBusqueda?.save();


    return res.json({
        message: 'Creado Con Exito',
        producto,
        almacenBusqueda
    })
}

export async function delateProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const producto: any = await Producto.findById(id);

    const almacen = await Almacen.findById(producto.almacen)
    const index: any = almacen?.productos.indexOf(producto.id);
    almacen?.productos.splice(index, 1);

    const almacenListo = await almacen?.save();
    const ProductoEliminado = await Producto.findByIdAndRemove(id);

    return res.json({
        message: 'Almacen Eliminado',
        almacenListo,
        ProductoEliminado
    });
}

export async function getProductoId(req: Request, res: Response): Promise<Response> {

    const ProductoBuqueda: any = await Producto.findById(req.params.id);

    const AlmacenBuqueda = await Almacen.findById(ProductoBuqueda.almacen)
    console.log("produc", ProductoBuqueda)
    console.log("almacen", AlmacenBuqueda)
    return res.json({
        message: 'Se Encontro',
        ProductoBuqueda,
        AlmacenBuqueda
    });
}


export async function putupdateProducto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { codigo,descripcion,unidadMedida,cantidad,alamacen} = req.body;
    console.log(id)
    const updatedProducto = await Almacen.findByIdAndUpdate(id, {
        codigo,
        descripcion,
        unidadMedida,
        cantidad,
        alamacen
    });
    console.log(updatedProducto)
    return res.json({
        message: 'Actualizacion Exito',
        updatedProducto
    });
}