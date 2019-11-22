var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        Producto.prototype.ToString = function () {
            return "\"codigo\":" + this.codigo + ",\"marca\":\"" + this.marca + "\",\"precio\":" + this.precio;
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = paisOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToJSON = function () {
            var retorno = "{" + this.ToString() + ",\"tipo\":\"" + this.tipo + "\",\"paisOrigen\":\"" + this.paisOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(retorno);
        };
        return Televisor;
    }(Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
///<reference path="../node_modules/@types/jquery/index.d.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function () {
            Manejadora.AdministrarSpinner(true);
            var codigo = $("#codigo").val();
            var marca = $("#marca").val();
            var precio = $("#precio").val();
            var tipo = $("#tipo").val();
            var pais = $("#pais").val();
            var foto = document.getElementById("foto");
            var form = new FormData();
            var miTv = new Entidades.Televisor(codigo, marca, precio, tipo, pais, foto.files[0].name);
            form.append("caso", "agregar");
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(miTv.ToJSON()));
            $.ajax({
                type: 'POST',
                url: "./BACKEND/Administrar.php",
                dataType: "text",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
                .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                console.log(resultado);
                Manejadora.VaciarForm();
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        Manejadora.MostrarTelevisores = function () {
            Manejadora.AdministrarSpinner(true);
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data: "caso=traer",
                async: true
            })
                .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                var jsonMuestro = JSON.parse(resultado);
                var tabla = "<table border=5><tr><td>CODIGO</td><td>MARCA</td><td>PRECIO</td><td>TIPO</td><td>PAIS</td><td>FOTO</td><td>ACCIONES</td></tr>";
                for (var i = 0; i < jsonMuestro.length; i++) {
                    tabla += "<tr><td>" + jsonMuestro[i].codigo + "</td><td>" + jsonMuestro[i].marca + "</td><td>" + jsonMuestro[i].precio + "</td><td>" + jsonMuestro[i].tipo + ("</td><td>" + jsonMuestro[i].paisOrigen + "</td><td><img src=\"./BACKEND/fotos/" + jsonMuestro[i].pathFoto + "\" width='50px' height='50px'></td>");
                    tabla += "<td><input type=\"button\" value=\"Eliminar\" onclick='PrimerParcial.Manejadora.EliminarTelevisor(" + JSON.stringify(jsonMuestro[i]) + ")'>";
                    tabla += "<input type=\"button\" value=\"Modificar\" onclick='PrimerParcial.Manejadora.ModificarTelevisor(" + JSON.stringify(jsonMuestro[i]) + ")'></td></tr>";
                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        Manejadora.GuardarEnLocalStorage = function () {
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data: "caso=traer",
                async: true
            })
                .done(function (resultado) {
                localStorage.clear();
                localStorage.setItem("televisores_local_storage", resultado);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        Manejadora.VerificarExistencia = function () {
            var existe = false;
            var jsonMuestro = JSON.parse(localStorage.getItem("televisores_local_storage"));
            for (var index = 0; index < jsonMuestro.length; index++) {
                if (jsonMuestro[index].codigo == $("#codigo").val()) {
                    existe = true;
                }
            }
            if (existe) {
                console.log("El televisor ya existe");
                alert("El televisor que quiere agregar ya existe");
            }
            else
                this.AgregarTelevisor();
            this.GuardarEnLocalStorage();
        };
        Manejadora.EliminarTelevisor = function (obj) {
            //console.log(JSON.stringify(obj));
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data: "caso=eliminar&cadenaJson=" + JSON.stringify(obj),
                async: true
            })
                .done(function (resultado) {
                console.log(resultado);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        Manejadora.ModificarTelevisor = function (obj) {
            console.log(obj);
            $("#codigo").val(obj.codigo);
            $("#codigo").prop("disabled", true);
            $("#marca").val(obj.marca);
            $("#precio").val(obj.precio);
            $("#tipo").val(obj.tipo);
            $("#pais").val(obj.paisOrigen);
            $("#imgFoto").attr("src", "./BACKEND/fotos/" + obj.pathFoto);
            $("#btn-agregar").val("Modificar");
            $("#btn-agregar").prop("onclick", null).off("click");
            $("#btn-agregar").click(function () {
                Manejadora.AdministrarSpinner(true);
                var codigo = $("#codigo").val();
                var marca = $("#marca").val();
                var precio = $("#precio").val();
                var tipo = $("#tipo").val();
                var pais = $("#pais").val();
                var foto = document.getElementById("foto");
                var form = new FormData();
                var miTv = new Entidades.Televisor(codigo, marca, precio, tipo, pais, foto.files[0].name);
                form.append("foto", foto.files[0]);
                form.append("cadenaJson", JSON.stringify(miTv.ToJSON()));
                form.append("caso", "modificar");
                $.ajax({
                    type: 'POST',
                    url: "./BACKEND/Administrar.php",
                    dataType: "text",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    async: true
                })
                    .done(function (resultado) {
                    Manejadora.AdministrarSpinner(false);
                    console.log(resultado);
                    var objRetorno = JSON.parse(resultado);
                    if (objRetorno.TodoOK) {
                        Manejadora.VaciarForm();
                        Manejadora.MostrarTelevisores();
                    }
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });
            });
        };
        Manejadora.FiltrarTelevisoresPorPais = function () {
            Manejadora.AdministrarSpinner(true);
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data: "caso=traer",
                async: true
            })
                .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                var jsonMuestro = JSON.parse(resultado);
                var tabla = "<table border=5><tr><td>CODIGO</td><td>MARCA</td><td>PRECIO</td><td>TIPO</td><td>PAIS</td><td>FOTO</td><td>ACCIONES</td></tr>";
                var pais = $("#pais").val();
                console.log(pais);
                for (var i = 0; i < jsonMuestro.length; i++) {
                    if (pais == jsonMuestro[i].paisOrigen) {
                        tabla += "<tr><td>" + jsonMuestro[i].codigo + "</td><td>" + jsonMuestro[i].marca + "</td><td>" + jsonMuestro[i].precio + "</td><td>" + jsonMuestro[i].tipo + ("</td><td>" + jsonMuestro[i].paisOrigen + "</td><td><img src=\"./BACKEND/fotos/" + jsonMuestro[i].pathFoto + "\" width='50px' height='50px'></td>");
                        tabla += "<td><input type=\"button\" value=\"Eliminar\" onclick='PrimerParcial.Manejadora.EliminarTelevisor(" + JSON.stringify(jsonMuestro[i]) + ")'>";
                        tabla += "<input type=\"button\" value=\"Modificar\" onclick='PrimerParcial.Manejadora.ModificarTelevisor(" + JSON.stringify(jsonMuestro[i]) + ")'></td></tr>";
                    }
                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        Manejadora.CargarPaisesJSON = function () {
            Manejadora.AdministrarSpinner(true);
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data: "caso=paises",
                async: true
            })
                .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                var jsonMuestro = JSON.parse(resultado);
                Manejadora.VaciarForm();
                $("#pais").empty();
                for (var i = 0; i < jsonMuestro.length; i++) {
                    $("#pais").append(new Option(jsonMuestro[i].descripcion));
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        };
        Manejadora.VaciarForm = function () {
            $("#codigo").val('');
            $("#tipo").val('');
            $("#marca").val('');
            $("#precio").val('');
            $("#foto").val('');
            $("#pais").val("Argentina");
            $("#imgFoto").attr("src", "./BACKEND/fotos/tv_defecto.jpg");
        };
        Manejadora.AdministrarSpinner = function (mostrar) {
            var gif = "./BACKEND/gif-load.gif";
            var div = $("#divSpinner"); //<HTMLDivElement> document.getElementById("divGif");
            var img = $("#imgSpinner"); //<HTMLImageElement> document.getElementById("imgGif");
            if (mostrar) {
                div.css("display", "block"); //div.style.display = "block";
                div.css("top", "50%"); //div.style.top = "50%";
                div.css("left", "45%"); //div.style.left = "45%"
                img.attr("src", gif); //img.src = gif;
            }
            else {
                div.css("display", "block"); //div.style.display = "none";
                img.attr("src", ""); //img.src = "";
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
