// Lógica de la aplicación

const participantsDataKey = 'participantsData';
const userDataKey = 'userData';

// Función para generar botones de números
function generateNumberButtons(start, end) {
    const numberSelectionDiv = document.getElementById('number-selection');

    for (let i = start; i <= end; i++) {
        const button = document.createElement('button');
        button.textContent = i.toString();
        button.addEventListener('click', function() {
            document.getElementById('selectedNumber').value = i;
        });

        numberSelectionDiv.appendChild(button);
    }
}

// Función para mostrar la lista de participantes en una tabla
function displayParticipantList() {
    const participantsData = JSON.parse(localStorage.getItem(participantsDataKey)) || [];

    const columns = [
        { data: "cedula", title: "Cédula" },
        { data: "nombres", title: "Nombres" },
        { data: "apellidos", title: "Apellidos" },
        { data: "telefono", title: "Teléfono" },
        { data: "selectedNumber", title: "Número seleccionado" },
        { data: "estado", title: "Estado" }
    ];

    // Destruir DataTable existente si existe
    if ($.fn.DataTable.isDataTable('#participants-table')) {
        $('#participants-table').DataTable().destroy();
    }

    $('#participants-table').DataTable({
        data: participantsData,
        columns: columns,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"
        }
    });
}

// Función de registro de participantes
function registerParticipant() {
    const cedula = document.getElementById('cedula').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const selectedNumber = document.getElementById('selectedNumber').value;

    const participant = {
        cedula,
        nombres,
        apellidos,
        telefono,
        fecha,
        selectedNumber,
        estado: 'Pendiente de pago'
    };

    const participantsData = JSON.parse(localStorage.getItem(participantsDataKey)) || [];
    participantsData.push(participant);
    localStorage.setItem(participantsDataKey, JSON.stringify(participantsData));

    displayParticipantList();
}

// Función para registrar usuarios
function registerUser() {
    const storedUserData = JSON.parse(localStorage.getItem(userDataKey));

    if (storedUserData) {
        return; // Ya hay usuarios registrados
    }

    const username = prompt('Ingrese un nombre de usuario:');
    const password = prompt('Ingrese una contraseña:');

    const userData = { username, password };
    localStorage.setItem(userDataKey, JSON.stringify(userData));
}
function displayParticipantList() {
    const participantsData = JSON.parse(localStorage.getItem(participantsDataKey)) || [];

    const columns = [
        { data: "cedula", title: "Cédula" },
        { data: "nombres", title: "Nombres" },
        { data: "apellidos", title: "Apellidos" },
        { data: "telefono", title: "Teléfono" },
        { data: "fecha", title: "Fecha" },
        { data: "selectedNumber", title: "Número seleccionado" },
        { data: "estado", title: "Estado" }
    ];

    // Destruir DataTable existente si existe
    if ($.fn.DataTable.isDataTable('#participants-table')) {
        $('#participants-table').DataTable().destroy();
    }

    $('#participants-table').DataTable({
         data: participantsData,
         columns: columns,
         initComplete: function () {
             markSelectedNumbers(participantsData);
         }
     });
 }

 // Función para marcar los números seleccionados y deshabilitar botones
 function markSelectedNumbers(participantsData) {
     const selectedNumbers = participantsData.map(participant => participant.selectedNumber);

     for (let i = 1; i <= 15; i++) {
         const button = document.getElementById(`number-button-${i}`);
         if (button) {
             const isSelected = selectedNumbers.includes(i.toString());
             button.classList.toggle('selected', isSelected);
             button.disabled = isSelected; // Deshabilitar el botón si está seleccionado
         }
     }
 }


// Función de registro de participantes
function registerParticipant() {
    const cedula = document.getElementById('cedula').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const selectedNumber = document.getElementById('selectedNumber').value;

    // Validar campos no vacíos
    if (!cedula || !nombres || !apellidos || !telefono || !fecha || !selectedNumber) {
        alertify.error('Por favor, complete todos los campos antes de registrar.');
        return;
    }

    // Validar número único
    const participantsData = JSON.parse(localStorage.getItem(participantsDataKey)) || [];
    if (participantsData.some(participant => participant.selectedNumber === selectedNumber)) {
        alertify.error('El turno seleccionado ya ha sido registrado. Elija otro turno.');
        return;
    }

    const participant = {
        cedula,
        nombres,
        apellidos,
        telefono,
        fecha,
        selectedNumber,
        estado: 'Pendiente de pago'
    };

    participantsData.push(participant);
    localStorage.setItem(participantsDataKey, JSON.stringify(participantsData));

    displayParticipantList();
    alertify.success('Registro exitoso');
}


// Llamadas iniciales
generateNumberButtons(1, 20);
registerUser(); // Registro de usuario
displayParticipantList();
