
///<reference path="../node_modules/@types/jquery/index.d.ts"/>
namespace PrimerParcial
{
    export class Manejadora
    {
        public static AgregarTelevisor():void
        {
            Manejadora.AdministrarSpinner(true);
            let codigo:any=$("#codigo").val();
            let marca:any=$("#marca").val();
            let precio:any=$("#precio").val();
            let tipo:any=$("#tipo").val();
            let pais:any=$("#pais").val();
            let foto:any=(<HTMLInputElement>document.getElementById("foto"));
            let form:FormData=new FormData();
            let miTv:Entidades.Televisor=new Entidades.Televisor(codigo,marca,precio,tipo,pais,foto.files[0].name);
            form.append("caso","agregar");
            form.append("foto",foto.files[0]);
            form.append("cadenaJson",JSON.stringify(miTv.ToJSON()));
            
            $.ajax({
                type: 'POST',
                url: "./BACKEND/Administrar.php",
                dataType: "text",
                cache: false,
                contentType: false,
                processData: false,
                data:form,
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
        
        }

        public static MostrarTelevisores():void
        {
            Manejadora.AdministrarSpinner(true);
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data:"caso=traer",
                async: true
            })
            .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                let jsonMuestro:any[]=JSON.parse(resultado);
                let tabla:string=`<table border=5><tr><td>CODIGO</td><td>MARCA</td><td>PRECIO</td><td>TIPO</td><td>PAIS</td><td>FOTO</td><td>ACCIONES</td></tr>`;
                for(var i=0;i<jsonMuestro.length;i++)
            {
                tabla+="<tr><td>"+jsonMuestro[i].codigo+"</td><td>"+jsonMuestro[i].marca+"</td><td>"+jsonMuestro[i].precio+"</td><td>"+jsonMuestro[i].tipo+`</td><td>${jsonMuestro[i].paisOrigen}</td><td><img src="./BACKEND/fotos/${jsonMuestro[i].pathFoto}" width='50px' height='50px'></td>`;
                tabla+=`<td><input type="button" value="Eliminar" onclick='PrimerParcial.Manejadora.EliminarTelevisor(${JSON.stringify(jsonMuestro[i])})'>`;
                tabla+=`<input type="button" value="Modificar" onclick='PrimerParcial.Manejadora.ModificarTelevisor(${JSON.stringify(jsonMuestro[i])})'></td></tr>`;
            }
            tabla+="</table>";
            $("#divTabla").html(tabla);
           
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }

        public static GuardarEnLocalStorage():void
        {
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data:"caso=traer",
                async: true
            })
            .done(function (resultado) {
                localStorage.clear();
                localStorage.setItem("televisores_local_storage",resultado);
            
           
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }

        public static VerificarExistencia():any
        {
            let existe:any=false;
            let jsonMuestro:any[]=JSON.parse(localStorage.getItem("televisores_local_storage"));

            for (let index = 0; index < jsonMuestro.length; index++) 
            {
                if(jsonMuestro[index].codigo==$("#codigo").val())
                {
                    existe=true;
                } 
            }
                if(existe)
                {
                    console.log("El televisor ya existe");
                    alert("El televisor que quiere agregar ya existe");
                }
                else
                this.AgregarTelevisor();
                this.GuardarEnLocalStorage();
            
        }

        public static EliminarTelevisor(obj:string):void
        {
            //console.log(JSON.stringify(obj));
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data:"caso=eliminar&cadenaJson="+JSON.stringify(obj),
                async: true
            })
            .done(function (resultado) {
                console.log(resultado);
            
           
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }

        public static ModificarTelevisor(obj:any):void
        {
            
            console.log(obj);
            $("#codigo").val(obj.codigo);
            $("#codigo").prop("disabled",true);
            
            $("#marca").val(obj.marca);
            $("#precio").val(obj.precio);
            $("#tipo").val(obj.tipo);
            $("#pais").val(obj.paisOrigen);
            $("#imgFoto").attr("src","./BACKEND/fotos/"+obj.pathFoto);

            $("#btn-agregar").val("Modificar");
            $("#btn-agregar").prop("onclick", null).off("click");

            $("#btn-agregar").click(function(){
                Manejadora.AdministrarSpinner(true);
                let codigo:any=$("#codigo").val();
            let marca:any=$("#marca").val();
            let precio:any=$("#precio").val();
            let tipo:any=$("#tipo").val();
            let pais:any=$("#pais").val();
            let foto:any=(<HTMLInputElement>document.getElementById("foto"));
            let form:FormData=new FormData();
           
                let miTv:Entidades.Televisor=new Entidades.Televisor(codigo,marca,precio,tipo,pais,foto.files[0].name);
                form.append("foto",foto.files[0]);    
                form.append("cadenaJson",JSON.stringify(miTv.ToJSON()));    

            form.append("caso","modificar");
            
            
            
            $.ajax({
                type: 'POST',
                url: "./BACKEND/Administrar.php",
                dataType: "text",
                cache: false,
                contentType: false,
                processData: false,
                data:form,
                async: true
            })
            .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                console.log(resultado);
                let objRetorno:any=JSON.parse(resultado);
                if(objRetorno.TodoOK)
                {
                    Manejadora.VaciarForm();
                    Manejadora.MostrarTelevisores();
                }
                
           
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    

            });
            
        }
        public static FiltrarTelevisoresPorPais():void
        {
            Manejadora.AdministrarSpinner(true);
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data:"caso=traer",
                async: true
            })
            .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                let jsonMuestro:any[]=JSON.parse(resultado);
                let tabla:string=`<table border=5><tr><td>CODIGO</td><td>MARCA</td><td>PRECIO</td><td>TIPO</td><td>PAIS</td><td>FOTO</td><td>ACCIONES</td></tr>`;
                let pais:any=$("#pais").val();
                console.log(pais);
                for(var i=0;i<jsonMuestro.length;i++)
            {
                
                if(pais==jsonMuestro[i].paisOrigen)
                {
                    tabla+="<tr><td>"+jsonMuestro[i].codigo+"</td><td>"+jsonMuestro[i].marca+"</td><td>"+jsonMuestro[i].precio+"</td><td>"+jsonMuestro[i].tipo+`</td><td>${jsonMuestro[i].paisOrigen}</td><td><img src="./BACKEND/fotos/${jsonMuestro[i].pathFoto}" width='50px' height='50px'></td>`;
                    tabla+=`<td><input type="button" value="Eliminar" onclick='PrimerParcial.Manejadora.EliminarTelevisor(${JSON.stringify(jsonMuestro[i])})'>`;
                    tabla+=`<input type="button" value="Modificar" onclick='PrimerParcial.Manejadora.ModificarTelevisor(${JSON.stringify(jsonMuestro[i])})'></td></tr>`;
                }
            }
            tabla+="</table>";
            $("#divTabla").html(tabla);
           
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }
        public static CargarPaisesJSON():void
        {
            Manejadora.AdministrarSpinner(true);
            $.ajax({
                type: 'POST',
                url: "./BACKEND/administrar.php",
                dataType: "text",
                data:"caso=paises",
                async: true
            })
            .done(function (resultado) {
                Manejadora.AdministrarSpinner(false);
                let jsonMuestro:any[]=JSON.parse(resultado);
                Manejadora.VaciarForm();
                $("#pais").empty();
                for(var i=0;i<jsonMuestro.length;i++)
            {
                
               $("#pais").append(new Option(jsonMuestro[i].descripcion));   
            }
            
           
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });    
        }

        public static VaciarForm():void
        {
            $("#codigo").val('');
            $("#tipo").val('');
            $("#marca").val('');
            $("#precio").val('');
            $("#foto").val('');
            $("#pais").val("Argentina");
            $("#imgFoto").attr("src","./BACKEND/fotos/tv_defecto.jpg");
        }

        public static AdministrarSpinner(mostrar :boolean):void
        {
            let gif : string = "./BACKEND/gif-load.gif";
            let div = $("#divSpinner");//<HTMLDivElement> document.getElementById("divGif");
            let img = $("#imgSpinner");//<HTMLImageElement> document.getElementById("imgGif");
        
            if(mostrar){
                div.css("display", "block");//div.style.display = "block";
                div.css("top", "50%");//div.style.top = "50%";
                div.css("left", "45%");//div.style.left = "45%"
                img.attr("src", gif); //img.src = gif;
            }
            else{
                div.css("display", "block");//div.style.display = "none";
                img.attr("src", "");//img.src = "";
                }
        }

        public static AdministrarValidaciones():void
        {
            
        }
        public static ValidarCamposVacios(str :string):boolean
        {
            let retorno=false;
            if(str.length<0)
            {
                retorno=true;
            }
            return retorno;
        }
        public static ValidarTipo(str:string,strarray:string[]):boolean
        {
            let retorno=false;

            return retorno;
        }
        public static ValidarCodigo(num:number):boolean
        {
            let retorno=false;
            return retorno;
        }
    }
}