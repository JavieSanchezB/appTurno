// Lógica del panel de administración

const participantsDataKey = 'participantsData';
const userDataKey = 'userData';

// Función para mostrar la lista de participantes en una tabla (administrador)
function displayParticipantListAdmin() {
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

// Función de autenticación de usuario (administrador)
function authenticateUser() {
    const storedUserData = JSON.parse(localStorage.getItem(userDataKey));

    if (!storedUserData) {
        alert('Error: No hay usuarios registrados. Debe registrarse como administrador primero.');
        return;
    }

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const user = storedUserData.find(u => u.username === usernameInput);

    if (user && user.password === passwordInput) {
        alert('Login exitoso');
        displayParticipantListAdmin();
    } else {
        alert('Credenciales incorrectas. Inténtelo de nuevo.');
    }
}




// Llamada inicial
displayParticipantListAdmin();
