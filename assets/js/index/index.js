function Limpiar() {
  let inputNombre = document.getElementById("nombre");
  inputNombre.value = "";
  inputNombre.classList.remove("input-error");

  let inputTelefono = document.getElementById("telefono");
  inputTelefono.value = "";
  inputTelefono.classList.remove("input-error");

  let selectContacto = document.getElementById("tipo-contacto");
  selectContacto.value = "";
  selectContacto.classList.remove("input-error");

  inputNombre.focus();
}

function CreateContactElement() {
  let inputNombre = document.getElementById("nombre");
  let valueNombre = inputNombre.value;

  let inputTelefono = document.getElementById("telefono");
  let valueTelefono = inputTelefono.value;

  let selectContacto = document.getElementById("tipo-contacto");
  let valueContacto = selectContacto.value;

  let IsValid = Validar(inputNombre, inputTelefono, selectContacto);

  if (IsValid) {
    let mainContainer = document.getElementById("contact-container");

    let divColMd4 = document.createElement("div");
    divColMd4.setAttribute("class", "col-md-4 margen-arriba-3");

    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card");

    let divCardBody1 = document.createElement("div");
    divCardBody1.setAttribute("class", "card-body text-white bg-success");

    let h5Cardtitle = document.createElement("h5");
    h5Cardtitle.setAttribute("class", "card-title");
    h5Cardtitle.innerText = "Contacto - " + valueContacto;

    let ulListGroup = document.createElement("ul");
    ulListGroup.setAttribute("class", "list-group list-group-flush");

    let liNombre = document.createElement("li");
    liNombre.setAttribute("class", "list-group-item");
    liNombre.innerText = "Nombre: " + valueNombre;

    let liTelefono = document.createElement("li");
    liTelefono.setAttribute("class", "list-group-item");
    liTelefono.innerText = "Telefono: " + valueTelefono;

    let divCardBody2 = document.createElement("div");
    divCardBody2.setAttribute("class", "card-body");

    let ButtonEliminar = document.createElement("button");
    ButtonEliminar.setAttribute("class", "btn btn-danger float-end");
    ButtonEliminar.innerText = "Eliminar";
    ButtonEliminar.addEventListener("click", function () {
      mainContainer.removeChild(divColMd4);
    });

    divCardBody2.appendChild(ButtonEliminar);

    ulListGroup.appendChild(liNombre);
    ulListGroup.appendChild(liTelefono);

    divCardBody1.appendChild(h5Cardtitle);

    divCard.appendChild(divCardBody1);
    divCard.appendChild(ulListGroup);
    divCard.appendChild(divCardBody2);

    divColMd4.appendChild(divCard);

    mainContainer.appendChild(divColMd4);

    Limpiar();
  } else {
    alert("Debe de completar toda la info");
  }
}

function Validar(inputNombre, inputTelefono, selectContacto) {
  let IsValid = true;

  let valueNombre = inputNombre.value;

  if (valueNombre == "" || valueNombre == null || valueNombre == undefined) {
    IsValid = false;
    inputNombre.classList.add("input-error");
  } else {
    inputNombre.classList.remove("input-error");
  }

  //input telefono
  let valueTelefono = inputTelefono.value;

  if (
    valueTelefono == "" ||
    valueTelefono == null ||
    valueTelefono == undefined
  ) {
    IsValid = false;
    inputTelefono.classList.add("input-error");
  } else {
    inputTelefono.classList.remove("input-error");
  }

  //select contacto

  let valueContacto = selectContacto.value;

  if (
    valueContacto == "" ||
    valueContacto == null ||
    valueContacto == undefined
  ) {
    IsValid = false;
    selectContacto.classList.add("input-error");
  } else {
    selectContacto.classList.remove("input-error");
  }

  return IsValid;
}
