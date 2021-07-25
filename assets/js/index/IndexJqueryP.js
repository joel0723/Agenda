$(document).ready(function(){


    //variables globales

    var valueNombre = "";
    var valueContacto = "";
    var valueTelefono = "";






    //eventos

    $("#content-container").on("click","#btn-clear", function(){
        limpiar();
    });

    $("#content-container").on("click",  "#btn-register", function(){
        createContactElement();
    });

    $("#contact-container").on("click",".btn-delete", function(){
       
       let mainContainer = $(this).parent().parent().parent();
        $(mainContainer).remove();
    });

    $("#content-container").on("click","#btn-back", function(){
       
        GenerateFormHtml();
     });

     $("#content-container").on("click","#btn-end", function(){
       
        EndProcess();
     });
     





    //funciones

    function EndProcess(){
        if(confirm("Estas seguro de que quieres agregar este contacto?")){

            GenerateHtmlContact();
            toastr.success("Se ha creado con exito", 'Notificacion', {TimeOut:2500} );
            GenerateFormHtml();
            limpiar();
        }

    }

    function limpiar(){

        $("#nombre").val("").focus().removeClass("input-error");
        $("#telefono").val("").removeClass("input-error");
        $("#radio-personal").prop("checked",false);
        $("#radio-academico").prop("checked",false);
        $("#radio-laboral").prop("checked",false);

    };

    function createContactElement(){

     valueNombre =  $("#nombre").val();
     valueTelefono = $("#telefono").val();
     valueContacto = $("#radio-container input[type='radio']:checked").val();
    

        let IsValid = validar();

        if(IsValid){
          /*   toastr.success("Se ha creado con exito", 'Notificacion', {TimeOut: 2500});
            GenerateHtmlContact();
            limpiar(); */
            GenerateConfirmationHtml();

        }else{
            toastr.error("complete los campos", 'Ooops ha ocurrido un error', {TimeOut: 2500});
        }

          
    }

    


    function validar(){

        let IsValid = true;

        if(valueNombre == "" || valueNombre == null || valueNombre == undefined){
            IsValid = false;
            $("#nombre").addClass("input-error");
        }else{
            $("#nombre").removeClass("input-error");
        }

        if(valueTelefono == "" || valueTelefono == null || valueTelefono == undefined){
            IsValid = false;
            $("#telefono").addClass("input-error");
        }else{
            $("#telefono").removeClass("input-error");
        }

      let isChecked = $("#radio-container input[type='radio']:checked");

      if(isChecked.length <= 0){
          IsValid = false;
          $("#radio-container").addClass("input-error");
      }else{
        $("#radio-container").removeClass("input-error");
      }


        return IsValid;



    };

    function GenerateConfirmationHtml(){

        let htmlConfirmation = `
        
        <div class="card">
                <div class="card-header text-white bg-success">
                    <h3 class="text-center"> Confirmacion </h3>
                </div>
                <div class="card-body">

                    <ul class="list-group">
                        <li class="list-group-item">Tipo de contacto:{{contact-type}}</li>
                        <li class="list-group-item">Nombre: {{name}}</li>
                        <li class="list-group-item">telefono: {{phone}}</li>
                    
                      </ul>

                      <div class="margen-arriba-2">
                          <button id="btn-back" class="btn btn-warning">Atras</button>
                          <button id="btn-end" class="btn btn-success">Finalizar</button>
                      </div>

                </div>
        
        `;
        htmlConfirmation = htmlConfirmation.replace("{{contact-type}}", valueContacto);
        htmlConfirmation = htmlConfirmation.replace("{{name}}", valueNombre);
        htmlConfirmation = htmlConfirmation.replace("{{phone}}", valueTelefono);

        $("#content-container").html(htmlConfirmation);

    }

    function GenerateFormHtml(){

        let htmlForm = `
        
        <div class="card">
        <div class="card-header text-white bg-dark">
            <h3 class="text-center"> Agenda Js </h3>
        </div>
        <div class="card-body">
            <div class="card-title">
                <h3 class="text-center">Completa el formulario</h3>
            </div>

            <div class="mb-3">

                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" id="nombre" class="form-control">

            </div>

            <div class="mb-3">

                <label for="telefono" class="form-label">Telefono:</label>
                <input type="text" id="telefono" class="form-control">

            </div>


             <div id="radio-container" class="mb-3">

                <label for="tipo-contacto" class="form-label">Tipo de contacto: </label>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="RadioContactType" id="radio-personal"
                        value="Personal">
                    <label class="form-check-label" for="radio-personal">Personal</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="RadioContactType" id="radio-laboral"
                        value="Laboral">
                    <label class="form-check-label" for="radio-laboral">Laboral</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="RadioContactType" id="radio-academico"
                        value="Academico">
                    <label class="form-check-label" for="radio-academico">Academico</label>
                </div>

            </div> 

            <div>
                <button class="btn btn-primary float-end margen-izq-2" id="btn-register">Registrar</button>
                <button class="btn btn-warning float-end" id="btn-clear">Limpiar</button>
            </div>

        </div>
    </div>

        
        `;
 

        $("#content-container").html(htmlForm);

        $("#nombre").val(valueNombre);
        $("#telefono").val(valueTelefono);
        $("#radio-container input[type='radio'][value = "+valueContacto +"]").prop("checked", true);

    }

     function GenerateHtmlContact(){
        
        let htmlContact = `     
         
     <div class="col-md-4 margen-arriba-3">

         <div class="card">               
            <div class="card-body text-white bg-success">
              <h5 class="card-title">Contacto - {{contact-type}}</h5>                  
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Nombre: {{name}}</li>
              <li class="list-group-item">Telefono: {{phone}}</li>       
            </ul>
            <div class="card-body">
             <button class="btn btn-danger float-end btn-delete"> Eliminar</button>
            </div>
          </div>

    </div>
        
        `;
        htmlContact = htmlContact.replace("{{contact-type}}", valueContacto);
        htmlContact = htmlContact.replace("{{name}}", valueNombre);
        htmlContact = htmlContact.replace("{{phone}}", valueTelefono);

        $("#contact-container").append(htmlContact);



    }; 



})