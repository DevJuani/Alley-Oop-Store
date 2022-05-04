const btn = document.getElementById('botonEnviar');

document.getElementById('form')
    .addEventListener("submit", function (event) {
        event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_jr37wzw';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Enviar mensaje';
                alert('Mensaje enviado correctamente');
            }, (err) => {
                btn.value = 'Enviar mensaje';
                alert(JSON.stringify(err));
            });
    });