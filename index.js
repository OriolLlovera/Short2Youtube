window.onload = function() {
    var mensajeAlert = document.getElementById("mensajeAlert");
    var miniaturaImg = document.getElementById("miniatura");

    mensajeAlert.style.display = "none"; // Ocultar el div mensajeAlert
    miniaturaImg.style.display = "none"; // Ocultar la miniatura de la imagen
};


document.addEventListener("DOMContentLoaded", function() {
    // Función para validar la URL
    function validarURL(url) {
        if (url === "") {
            return "vacia";
        }
        if (!/^https:\/\/www\.youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}$/.test(url)) {
            return "incorrecta";
        }
        return "short";
    }

    // Función para mostrar la alerta
    function mostrarAlerta(mensaje, tipo) {
        var alerta = document.getElementById("mensajeAlert");
        alerta.innerText = mensaje;
        alerta.classList.remove("success", "error"); // Limpiar clases anteriores
        alerta.classList.add(tipo); // Agregar clase de tipo de alerta
        alerta.style.display = "block"; // Mostrar alerta
        setTimeout(function() {
            alerta.style.display = "none"; // Ocultar alerta después de 3 segundos
        }, 3000);
    }

// Función para validar la URL y mostrar el mensaje de copia
function validarYMostrar() {
    var urlInput = document.getElementById("url");
    var url = urlInput.value;
    var resultadoDiv = document.getElementById("resultado");
    var mensajeErrorDiv = document.getElementById("mensajeError");
    var botonCopiar = document.getElementById("copiar");
    var miniaturaImg = document.getElementById("miniatura");

    // Validar la URL
    var tipoURL = validarURL(url);
    // Ocultar la miniatura del video si la URL no es válida
    miniaturaImg.style.display = tipoURL !== "short" ? "none" : "block";
    // Mostrar mensaje según el tipo de URL
    if (tipoURL === "short") {
        resultadoDiv.innerText = ""; // Limpiar resultado
        mensajeErrorDiv.innerText = ""; // Limpiar mensaje de error si lo hay
        mostrarMiniatura(url); // Mostrar miniatura del video
        botonCopiar.disabled = false; // Habilitar el botón de copiar
        mostrarAlerta("URL convertida correctamente", "success"); // Mostrar alerta de éxito
    } else if (tipoURL === "vacia") {
        resultadoDiv.innerText = ""; // Limpiar resultado
        mensajeErrorDiv.innerText = ""; // Limpiar mensaje de error
        botonCopiar.disabled = true; // Deshabilitar el botón de copiar
        mostrarAlerta("La URL está vacía", "error"); // Mostrar alerta de error
    } else {
        
        resultadoDiv.innerText = ""; // Limpiar resultado
        botonCopiar.disabled = true; // Deshabilitar el botón de copiar
        mostrarAlerta("URL incorrecta", "error"); // Mostrar alerta de error
    }
}


     // Función para mostrar la miniatura del video
     function mostrarMiniatura(url) {
        // Eliminar la miniatura anterior si existe
        var miniaturaImg = document.getElementById("miniatura");
        if (miniaturaImg.src !== "") {
            miniaturaImg.src = "";
        }

        // Extraer el ID del video de la URL
        var idVideo = url.match(/youtube\.com\/(?:shorts\/|watch\?v=)([^\s/]+)/)[1];
        // Construir la URL de la miniatura del video
        var urlMiniatura = "https://img.youtube.com/vi/" + idVideo + "/maxresdefault.jpg";
        // Mostrar la miniatura del video en la página
        miniaturaImg.src = urlMiniatura;
        miniaturaImg.style.display = "block"; // Mostrar la imagen
    }

      // Función para convertir la URL
    function convertirURL(url) {
        // Utiliza expresiones regulares para reemplazar "shorts/" con "watch?v="
        var nuevaURL = url.replace(/shorts\//, 'watch?v=');
        return nuevaURL;
    }


    // Función para copiar la URL al portapapeles
    function copiarURL() {
        var urlInput = document.getElementById("url");
        var url = urlInput.value;
        var nuevaURL = convertirURL(url);

        // Crear un elemento de texto temporal para copiar al portapapeles
        var elementoTemporal = document.createElement("textarea");
        elementoTemporal.value = nuevaURL;
        document.body.appendChild(elementoTemporal);
        elementoTemporal.select();
        document.execCommand("copy");
        document.body.removeChild(elementoTemporal);

        // Mostrar mensaje de copia
        var resultadoDiv = document.getElementById("resultado");        
        mostrarAlerta("¡La URL ha sido copiada al portapapeles!", "success")
    }

    // Función para borrar la URL y ocultar la miniatura del video
    function borrarURL() {
        var urlInput = document.getElementById("url");
        urlInput.value = ""; // Limpiar el input
        var resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerText = ""; // Limpiar resultado
        var mensajeErrorDiv = document.getElementById("mensajeError");
        mensajeErrorDiv.innerText = ""; // Limpiar mensaje de error
        copiarBoton.disabled = true; // Deshabilitar el botón de copiar

        // Ocultar la miniatura del video
        var miniaturaImg = document.getElementById("miniatura");
        miniaturaImg.style.display = "none";
    }

    // Obtener referencias a los elementos del DOM
    var enviarBoton = document.getElementById("enviar");
    var borrarBoton = document.getElementById("borrar");
    var copiarBoton = document.getElementById("copiar");

    // Agregar event listeners
    enviarBoton.addEventListener("click", validarYMostrar);
    borrarBoton.addEventListener("click", function() {
        borrarURL();
    });
    copiarBoton.addEventListener("click", copiarURL);

    // Obtener referencia al campo de entrada
    var urlInput = document.getElementById("url");

    // Agregar evento "keyup" al campo de entrada
    urlInput.addEventListener("keyup", function(event) {
        // Verificar si la tecla presionada es "Enter" (código 13)
        if (event.keyCode === 13) {
            // Prevenir el comportamiento por defecto del "Enter" (enviar formulario)
            event.preventDefault();
            // Simular un clic en el botón de enviar
            enviarBoton.click();
        }
    });
});
