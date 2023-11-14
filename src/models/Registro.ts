import { Schema, model, Document } from 'mongoose'

export interface IRegistro extends Document {
    fecha:Date,
    descripcion:String;
    tipo:Boolean; //Ingreso = True o Retiro = false
    almacen: object;
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
        type: Boolean,
        lowercase: true
    },
    cantidad: {
        type: Number,
    },
    almacen:{
        type :Schema.Types.ObjectId,
        ref:"Almacen",
        // required: true
    },
    productos:[{
        type :Schema.Types.ObjectId,
        ref:"Producto",
        // required: true
    }],
}, {
    timestamps: true
});

RegistroSchema.statics.Stock = async function (): Promise<number> {
    try {
        const result = await this.aggregate([
            {
                $match: {
                    estado: true
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$cantidad" }
                }
            }
        ]);

        if (result.length > 0) {
            return result[0].total;
        } else {
            return 0; // No se encontraron elementos con estado true
        }
    } catch (error) {
        throw new Error(`Error al sumar la cantidad de elementos por estado: ${error}`);
    }
};

export default model<IRegistro>("Registro", RegistroSchema);