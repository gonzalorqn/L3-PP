"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this._tipo = tipo;
            _this._paisOrigen = paisOrigen;
            _this._pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToJSON = function () {
            var cadena = '{ ';
            cadena += this.ToString();
            cadena += ' }';
            return JSON.parse(cadena);
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=televisor.js.map