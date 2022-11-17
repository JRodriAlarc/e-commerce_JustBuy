const container = document.querySelector(`.container`);
const modal = document.querySelector(`.modal`);
const closeModal = document.querySelector(`#btn-cerrar`);
const clearHTML = idContenedor => {
    const contenedor = document.getElementById(idContenedor);
    while(contenedor.childElementCount !== 0) {
        contenedor.firstElementChild.remove()
    }
}
const mostrarSweetAlert = (texto, icon) => {
    Swal.fire({
        title: texto,
        icon: icon,
        showConfirmButton: false,
        showCloseButton: true,

    });
}

const EjecutarPagoPayPal = dinero => {

    paypal.Buttons({
        style: {
            color: 'blue',
            shape: 'pill',
            label: 'pay',

        },
        createOrder: function (data, actions) {
            // Set up the transaction
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: dinero
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            actions.order.capture().then(function (detalles) {
                clearHTML('paypal-button-container');
                modal.classList.remove("modal--show");
                setTimeout(() => {
                    mostrarSweetAlert(`Pago realizado con exito`, `success`);
                }, 1200);


            });
        },
        onCancel: function (data) {
            setTimeout(() => {
                clearHTML('paypal-button-container');
                mostrarSweetAlert(`Se interrumpio el pago`, `error`);
            }, 1000);
        }

    }).render("#paypal-button-container");
}

container.addEventListener(`click`, event => {
    const element = event.target;
    if(element.textContent === "Pagar") {
        modal.classList.add(`modal--show`);
        const precio = element.previousElementSibling.firstElementChild.textContent
        EjecutarPagoPayPal(precio)
    }
});

closeModal.addEventListener(`click`, event => {
    clearHTML("paypal-button-container");
    modal.classList.remove(`modal--show`);
});

