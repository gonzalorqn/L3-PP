"use strict";
/// <reference path="./televisor.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function () {
            var codigo = parseInt(document.getElementById("codigo").value);
            var marca = document.getElementById("marca").value;
            var precio = parseFloat(document.getElementById("precio").value);
            var tipo = document.getElementById("tipo").value;
            var paisOrigen = document.getElementById("pais").value;
            //let pathFoto = (<HTMLImageElement>document.getElementById("foto")).src;
            var foto = document.getElementById("foto");
            var televisor = new Entidades.Televisor(codigo, marca, precio, tipo, paisOrigen, foto.name);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('caso', 'agregar');
            form.append('cadenaJson', JSON.stringify(televisor));
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    var obj = JSON.parse(xhttp.responseText);
                    //console.log(obj);
                    if (obj.TodoOK) {
                        alert("Televisor agregado");
                    }
                    else {
                        alert("Ocurrio un problema");
                    }
                }
            };
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadora.js.map