namespace Entidades
{
    export class Televisor extends Producto
    {
        private _tipo:string;
        private _paisOrigen:string;
        private _pathFoto:string;

        public constructor(codigo:number,marca:string,precio:number,tipo:string,paisOrigen:string,pathFoto:string)
        {
            super(codigo,marca,precio);
            this._tipo = tipo;
            this._paisOrigen = paisOrigen;
            this._pathFoto = pathFoto;
        }

        public ToJSON():JSON
        {
            let cadena = '{ ';
            cadena += this.ToString();
            cadena += ' }';
            return JSON.parse(cadena);
        }
    }
}