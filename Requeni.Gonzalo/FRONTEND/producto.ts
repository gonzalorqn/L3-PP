namespace Entidades
{
    export abstract class Producto
    {
        private _codigo:number;
        private _marca:string;
        private _precio:number;
        
        public constructor(codigo:number,marca:string,precio:number)
        {
            this._codigo = codigo;
            this._marca = marca;
            this._precio = precio;
        }

        public ToString():string
        {
            return '"Codigo": ' + this._codigo + ' , "Marca": "' + this._marca + '" , "Precio": ' + this._precio;
        }
    }
}