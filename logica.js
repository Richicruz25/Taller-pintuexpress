// Cargar datos al abrir la app
document.addEventListener('DOMContentLoaded', mostrarTabla);

function calcularCuentas() {
    let placa = document.getElementById('placa').value;
    let total = parseFloat(document.getElementById('total').value) || 0;
    let abono = parseFloat(document.getElementById('abono').value) || 0;
    let materiales = parseFloat(document.getElementById('materiales').value) || 0;
    let manoObra = parseFloat(document.getElementById('manoObra').value) || 0;

    let gananciaLimpia = total - materiales - manoObra;
    let fecha = new Date().toLocaleDateString(); // Obtiene la fecha de hoy

    // Crear el objeto del trabajo
    let nuevoTrabajo = {
        fecha: fecha,
        placa: placa,
        ganancia: gananciaLimpia
    };

    // Guardar en "Base de Datos" (LocalStorage)
    let historial = JSON.parse(localStorage.getItem('trabajos')) || [];
    historial.push(nuevoTrabajo);
    localStorage.setItem('trabajos', JSON.stringify(historial));

    mostrarTabla();
    alert("Trabajo guardado con éxito");
}

function mostrarTabla() {
    let historial = JSON.parse(localStorage.getItem('trabajos')) || [];
    let cuerpo = document.getElementById('cuerpoTabla');
    let resumen = document.getElementById('resumenMensual');
    
    cuerpo.innerHTML = "";
    let totalMes = 0;
    let conteoTrabajos = historial.length;

    historial.forEach((trabajo) => {
        totalMes += trabajo.ganancia;
        cuerpo.innerHTML += `
            <tr>
                <td>${trabajo.fecha}</td>
                <td>${trabajo.placa}</td>
                <td>$${trabajo.ganancia.toLocaleString()}</td>
            </tr>
        `;
    });

    resumen.innerHTML = `
        <p><strong>Trabajos realizados:</strong> ${conteoTrabajos}</p>
        <p><strong>Ganancia Total Acumulada:</strong> $${totalMes.toLocaleString()}</p>
    `;
}

function borrarHistorial() {
    if(confirm("¿Seguro que quieres borrar todos los registros?")) {
        localStorage.removeItem('trabajos');
        mostrarTabla();
    }
}