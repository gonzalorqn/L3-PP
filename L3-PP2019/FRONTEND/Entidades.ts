namespace Entidades
{
    export class Producto
    {
        public codigo:number;
        public marca:string;
        public precio:number;

        public constructor(codigo:number,marca:string,precio:number)
        {
            this.codigo=codigo;
            this.marca=marca;
            this.precio=precio;
        }

        public ToString():string
        {
            return `"codigo":${this.codigo},"marca":"${this.marca}","precio":${this.precio}`;
        }
    }

    export class Televisor extends Producto
    {
        public tipo:string;
        public paisOrigen:string;
        public pathFoto:string;

        public constructor(codigo:number,marca:string,precio:number,tipo:string,paisOrigen:string,pathFoto:string)
        {
            super(codigo,marca,precio);
            this.tipo=tipo;
            this.paisOrigen=paisOrigen;
            this.pathFoto=pathFoto;
        }

        public ToJSON():JSON
        {
            let retorno:string=`{${this.ToString()},"tipo":"${this.tipo}","paisOrigen":"${this.paisOrigen}","pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(retorno);
        }

        
    }
}