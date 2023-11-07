import { Schema, model, Document } from 'mongoose'

export interface IRegistro extends Document {
    fecha:Date,
    descripcion:String;
    tipo:String; //Ingreso o retiro
    almacen: Object;
    productos: Array<object>;
};

const RegistroSchema = new Schema({
    fecha: {
        type: Date,
    },
    descripcion: {
        type: String,
    },
    tipo: {
        type: String,
        lowercase: true
    },
    cantidad: {
        type: Number,
    },
    alamacen:{
        type :Schema.Types.ObjectId,
        ref:"Almacen",
        required: true
    },
    productos:[{
        type :Schema.Types.ObjectId,
        ref:"Producto",
        required: true
    }],
}, {
    timestamps: true
});


export default model<IRegistro>("Registro", RegistroSchema);