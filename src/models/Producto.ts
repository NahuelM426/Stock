import { Schema, model, Document } from 'mongoose'

export interface IProducto extends Document {
    codigo: Number;
    descripcion:String;
    unidadMedida:String;
    cantidad:Number;
    almacen: object;
};

const ProductoSchema = new Schema({
    codigo: {
        type: Number,
    },
    descripcion: {
        type: String,
    },
    unidadMedida: {
        type: String,
    },
    cantidad: {
        type: Number,
    },
    alamacen:{type :Schema.Types.ObjectId,ref:"Almacen"},
}, {
    timestamps: true
});


export default model<IProducto>("Producto", ProductoSchema);