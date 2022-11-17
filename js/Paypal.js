
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
                alert('Hecho')

            });
        },
        onCancel: function (data) {
            alert('Pago cancelado')
            console.log(data);
        }

    }).render("#paypal-button-container");
}

export {
    EjecutarPagoPayPal
}