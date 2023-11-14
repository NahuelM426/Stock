import { Request, Response } from 'express'

import Almacen, { IAlmacen } from '../models/Almacen'
import Producto, { IProducto } from '../models/Producto';
import Registro,{IRegistro} from '../models/Registro';



export async function getRegistro(req: Request, res: Response): Promise<Response> {
    const registro = await Registro.find();
    console.log("registro", registro)
    return res.json(registro);
}

export async function postCrearRegistro(req: Request, res: Response): Promise<Response> {
    // fecha:Date,
    // descripcion:String;
    // tipo:Boolean; //Ingreso = True o Retiro = false
    // almacen: Object;
    // productos: Array<object>;
    const { fecha } = req.body
    const { descripcion } = req.body
    const { tipo } = req.body
    const { almacen } = req.body
    const { productos } = req.body

    const almacenBusqueda = await Almacen.findById(almacen);
    
    const newProducto = {
        fecha: fecha,
        descripcion: descripcion,
        tipo: tipo,
        almacen: almacen,
        productos: []
    }

    const registro = new Registro(newProducto)
    
    const listaProducto = await Promise.all(productos.map(async (x:any) =>{
        const produc =  await Producto.findById(x);
        return produc
    }))
    listaProducto.map(async (prod:any) => {
        registro.productos.push(prod);
    })
    almacenBusqueda?.registros.push(registro); //Guardas en Almacen el Registro
    

    console.log("almacen",almacenBusqueda)
    console.log("registro",registro)
    
    await registro.save();
    await almacenBusqueda?.save();


    return res.json({
        message: 'Creado Con Exito',
        registro,
        almacenBusqueda
    })
}

export async function delateRegistro(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const registro: any = await Registro.findById(id);

    const almacen = await Almacen.findById(registro.almacen)
    const index: any = almacen?.registros.indexOf(registro.id);
    almacen?.registros.splice(index, 1);

    const almacenListo = await almacen?.save();
    const RegsitorEliminado = await Registro.findByIdAndRemove(id);
    console.log("almacen",almacen)
    return res.json({
        message: 'Registro Eliminado',
        almacenListo,
        RegsitorEliminado
    });
}

export async function getRegistroId(req: Request, res: Response): Promise<Response> {

    const RegistroBuqueda: any = await Registro.findById(req.params.id);

    const AlmacenBuqueda = await Almacen.findById(RegistroBuqueda.almacen)

    return res.json({
        message: 'Se Encontro',
        RegistroBuqueda,
        AlmacenBuqueda
    });
}


// export async function putupdateProducto(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;
//     const { codigo,descripcion,unidadMedida,cantidad,alamacen} = req.body;
//     console.log(id)
//     const updatedProducto = await Almacen.findByIdAndUpdate(id, {
//         codigo,
//         descripcion,
//         unidadMedida,
//         cantidad,
//         alamacen
//     });
//     console.log(updatedProducto)
//     return res.json({
//         message: 'Actualizacion Exito',
//         updatedProducto
//     });
// }