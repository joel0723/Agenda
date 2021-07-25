$(document).ready(function () {
  //Variables globales
  var valueNombre = "";
  var valueTelefono = "";
  var valueContacto = "";

  //Eventos
  $("#content-container").on("click",'#btn-clear', function () {
    Clear();
  });

  $("#content-container").on("click",'#btn-register', function () {
    RegisterContactElement();
  });

  $("#contact-container").on("click", ".btn-delete-contact", function () {
    if (confirm("Esta seguro que desea eliminar este contacto?")) {
      let mainContainer = $(this).parent().parent().parent();
      $(mainContainer).remove();
    }
  });

  $("#content-container").on("click", "#btn-back", function () {

   GenerateFormData();

  });

  $("#content-container").on("click", "#btn-end", function () {
    EndProcess();
  });   

  // Funciones


  function Clear() {
    $("#nombre").val("").removeClass("input-error").focus();
    $("#telefono").val("").removeClass("input-error");
    $("#radio-container").removeClass("input-error");

    valueNombre = "";
    valueTelefono = "";
    valueContacto = "";

    $("#radio-container input[type='radio']").each(function(){
        $(this).prop("checked",false);
    });

  }

  function RegisterContactElement() {
    valueNombre = $("#nombre").val();
    valueTelefono = $("#telefono").val();
    valueContacto = $("#radio-container input[type='radio']:checked").val();

    let isValid = Validar();

    if (isValid) {

        GenerateHtmlConfirmation();
   
    } else {
      toastr.error("Debe completar toda la info", "Oops ha ocurrido un error", {
        TimeOut: 2500,
      });
    }
  }

  function EndProcess(){

    if(confirm("esta seguro que desea crear este contacto?")){
  
      GenerateHtmlContact();
      GenerateFormData();
      Clear();
      toastr.success("Se ha creado con exito", "Notificacion", {
        TimeOut: 2500,
      });
    }

  };

  function GenerateFormData(){
    let htmlForm=`
    
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
</div>`;

    $("#content-container").html(htmlForm);

    $("#nombre").val(valueNombre);
    $("#telefono").val(valueTelefono);
    $("#radio-container input[type='radio'][value="+ valueContacto +"]").prop("checked",true);

  }

  function GenerateHtmlConfirmation(){

    let htmlConfirmation = `
    
    <div class="card">
                <div class="card-header text-white bg-success">
                    <h3 class="text-center"> Confirmacion </h3>
                </div>
                <div class="card-body">

                    <ul class="list-group">
                        <li class="list-group-item">Tipo de contacto: ${valueContacto}</li>
                        <li class="list-group-item">Nombre: ${valueNombre}</li>
                        <li class="list-group-item">telefono: ${valueTelefono}</li>
                    
                      </ul>

                      <div class="margen-arriba-2">
                          <button id="btn-back" class="btn btn-warning">Atras</button>
                          <button id="btn-end" class="btn btn-success">Finalizar</button>
                      </div>

                </div>
            </div>
    `;

    $("#content-container").html(htmlConfirmation);

  }

  function GenerateHtmlContact() {
    let htmlContact = `<div class="col-md-4 margen-arriba-3">

            <div class="card">               
                <div class="card-body text-white bg-success">
                  <h5 class="card-title">Contacto - ${valueContacto}</h5>                  
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Nombre: ${valueNombre}</li>
                  <li class="list-group-item">Telefono: ${valueTelefono}</li>       
                </ul>
                <div class="card-body">
                 <button class="btn btn-danger float-end btn-delete-contact"> Eliminar</button>
                </div>
              </div>
        </div>`;

    $("#contact-container").append(htmlContact);
  }

  function Validar() {
    let isValid = true;

    if (valueNombre == "" || valueNombre == null || valueNombre == undefined) {
      isValid = false;
      $("#nombre").addClass("input-error");
    } else {
      $("#nombre").removeClass("input-error");
    }

    if (
      valueTelefono == "" ||
      valueTelefono == null ||
      valueTelefono == undefined
    ) {
      isValid = false;
      $("#telefono").addClass("input-error");
    } else {
      $("#telefono").removeClass("input-error");
    }

    let radios = $("#radio-container input[type='radio']:checked");

    if (
      radios.length <= 0
    ) {
      isValid = false;
      $("#radio-container").addClass("input-error");
    } else {
      $("#radio-container").removeClass("input-error");
    }

    return isValid;
  }
});
