"use strict";
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this._codigo = codigo;
            this._marca = marca;
            this._precio = precio;
        }
        Producto.prototype.ToString = function () {
            return '"Codigo": ' + this._codigo + ' , "Marca": "' + this._marca + '" , "Precio": ' + this._precio;
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=producto.js.map