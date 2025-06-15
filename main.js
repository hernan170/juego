
document.addEventListener('DOMContentLoaded', () => {
    const hablarBtn = document.getElementById('hablarBtn');
    const mensajeInput = document.getElementById('mensajeInput');

    // Comprobamos si el navegador soporta la API de Síntesis de Voz
    if ('speechSynthesis' in window) {
        console.log("Tu navegador soporta la Síntesis de Voz.");

        // Función para que el navegador hable un texto dado
        function hablar(texto) {
            const utterance = new SpeechSynthesisUtterance(texto);

           
            utterance.lang = 'es-ES'; // Idioma (español de España)
            utterance.pitch = 1;     // Tono (0 a 2)
            utterance.rate = 1;      // Velocidad (0.1 a 10)
            utterance.volume = 1;    // Volumen (0 a 1)

            // Detener cualquier voz actual antes de empezar una nueva
            window.speechSynthesis.cancel();
            
            // Hablar el mensaje
            window.speechSynthesis.speak(utterance);
        }

        // Event listener para el botón principal
        hablarBtn.addEventListener('click', () => {
            hablar("¡Hola! Gracias por hacerme hablar.");
        });

        // Event listener para el campo de texto (habla al presionar Enter)
        mensajeInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const textoPersonalizado = mensajeInput.value.trim(); // .trim() elimina espacios en blanco al inicio/final
                if (textoPersonalizado) {
                    hablar(textoPersonalizado);
                } else {
                    hablar("Por favor, escribe algo para que lo diga.");
                }
            }
        });

        // Event listener para que también hable al salir del campo de texto (blur)
        mensajeInput.addEventListener('blur', () => {
            const textoPersonalizado = mensajeInput.value.trim();
            if (textoPersonalizado && !window.speechSynthesis.speaking) { // Solo si no está hablando ya
                hablar(textoPersonalizado);
            }
        });

    } else {
        // Mensaje si el navegador no soporta la API
        hablarBtn.disabled = true; // Deshabilita el botón
        mensajeInput.disabled = true; // Deshabilita el input
        alert("Lo siento, tu navegador no soporta la Síntesis de Voz.");
        console.warn("La API de Síntesis de Voz no está disponible en este navegador.");
    }
});
