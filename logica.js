// Cargar datos al abrir la app
document.addEventListener('DOMContentLoaded', mostrarTabla);

function calcularCuentas() {
    // 1. CAPTURAR DATOS
    let placa = document.getElementById('placa').value;
    let total = parseFloat(document.getElementById('total').value) || 0;
    let materiales = parseFloat(document.getElementById('materiales').value) || 0;
    let manoObra = parseFloat(document.getElementById('manoObra').value) || 0;

    // 2. VALIDACIÓN (Tu idea de no dejar guardar si falta algo)
    if (placa === "" || total === 0) {
        alert("⚠️ ¡Atención! Debes ingresar la placa y el valor total del trabajo.");
        return; // Aquí se detiene todo si hay error
    }

    // 3. LÓGICA DE NEGOCIO (Los cálculos)
    let gananciaLimpia = total - materiales - manoObra;
    let fecha = new Date().toLocaleDateString();

    // 4. CREAR EL OBJETO DEL TRABAJO
    let nuevoTrabajo = {
        fecha: fecha,
        placa: placa.toUpperCase(), // Lo guarda siempre en mayúsculas
        ganancia: gananciaLimpia
    };

    // 5. GUARDAR EN EL "CAJÓN" (LocalStorage)
    let historial = JSON.parse(localStorage.getItem('trabajosTaller')) || [];
    historial.push(nuevoTrabajo);
    localStorage.setItem('trabajosTaller', JSON.stringify(historial));

    // 6. ACTUALIZAR LA VISTA
    mostrarTabla();
    
    // Limpiar los cuadritos para el siguiente auto
    document.getElementById('placa').value = "";
    document.getElementById('total').value = "";
    document.getElementById('materiales').value = "";
    document.getElementById('manoObra').value = "";
}

function mostrarTabla() {
    let cuerpo = document.getElementById('cuerpoTabla');
    let historial = JSON.parse(localStorage.getItem('trabajosTaller')) || [];
    let totalMes = 0;

    cuerpo.innerHTML = ""; // Limpiar tabla antes de redibujar

    historial.forEach((trabajo, index) => {
        totalMes += trabajo.ganancia;

        // Configurar mensaje de WhatsApp
        let mensaje = `Hola! Resumen de trabajo PintuExpress. Placa: *${trabajo.placa}*. Valor: $${trabajo.ganancia}. ¡Gracias!`;
        let linkWA = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

        cuerpo.innerHTML += `
            <tr>
                <td>${trabajo.fecha}</td>
                <td>${trabajo.placa}</td>
                <td>$${trabajo.ganancia.toLocaleString()}</td>
                <td>
                    <a href="${linkWA}" target="_blank">
                        <button style="background-color: #25D366; color: white; border: none; padding: 5px; border-radius: 5px; cursor: pointer;">
                            WhatsApp 💬
                        </button>
                    </a>
                </td>
            </tr>
        `;
    });

    // Actualizar el total del mes en pantalla si tienes un elemento con este ID
    if(document.getElementById('totalMes')) {
        document.getElementById('totalMes').innerText = `Total Ganancia: $${totalMes.toLocaleString()}`;
    }
}

// Para que la tabla se vea apenas abra la app
window.onload = mostrarTabla;