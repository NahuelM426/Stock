import { Schema, model, Document } from 'mongoose'

export interface IAlmacen extends Document {
    username: string;
    constructora: Boolean;
    productos: Array<object>;
    registros: Array<object>;

};

const AlmacenSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    constructora:{
        type:Boolean,
        required:true
    },
    productos:[{type :Schema.Types.ObjectId,ref:"Producto"}],
    registros:[{type :Schema.Types.ObjectId,ref:"Registro"}],
}, {
    timestamps: true
});


export default model<IAlmacen>("Almacen", AlmacenSchema);