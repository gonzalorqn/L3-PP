/// <reference path="./televisor.ts" />
namespace PrimerParcial
{
    export class Manejadora
    {
        public static AgregarTelevisor()
        {
            let codigo = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
            let marca = (<HTMLInputElement>document.getElementById("marca")).value;
            let precio = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
            let paisOrigen = (<HTMLInputElement>document.getElementById("pais")).value;
            //let pathFoto = (<HTMLImageElement>document.getElementById("foto")).src;
            let foto : any = (<HTMLInputElement>document.getElementById("foto"));

            let televisor = new Entidades.Televisor(codigo,marca,precio,tipo,paisOrigen,foto.name);

            let form : FormData = new FormData();

            form.append('foto', foto.files[0]);
            form.append('caso', 'agregar');
            form.append('cadenaJson', JSON.stringify(televisor));

            let xhttp : XMLHttpRequest = new XMLHttpRequest();

            xhttp.onreadystatechange = () =>
            {
                if(xhttp.readyState == 4 && xhttp.status == 200)
                {
                    alert(xhttp.responseText);
                    var obj = JSON.parse(xhttp.responseText);
                    //console.log(obj);
                    if(obj.TodoOK)
                    {
                        alert("Televisor agregado");
                    }
                    else
                    {
                        alert("Ocurrio un problema");
                    }
                }
            };

            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
        }
    }
}