const functions = require("firebase-functions");
const stripe = require('stripe')('sk_test_51JKKvPKlzfvLSqIKNE65LAtxeZVVvIHxyIeeWjigncqFM7FdEcW315fMbHdHUhiuNKiW94ypk0SvFVKOyYaXT4pP00XzzAsrmD');
const admin = require('firebase-admin')
admin.initializeApp()
exports.saveCard = functions.https.onRequest(async (req, res) => {
    try {
        let customer;
        const userDoc = await admin.firestore().collection('Users').doc(req.body.uid).get()
        if (!userDoc.data().stripeCustomer) {
            customer = await stripe.customers.create({
                description: req.body.description ? req.body.description : '',
                email: req.body.email ? req.body.email : '',
                name: req.body.name ? req.body.name : '',
                phone: req.body.phone ? req.body.phone : ''
            });
            await admin.firestore().collection('Users').doc(req.body.uid).set({ stripeCustomer: customer }, { merge: true })
        } else {
            customer = userDoc.data().stripeCustomer
        }
        const card = await stripe.customers.createSource(
            customer.id,
            { source: req.body.token }
        );
        await admin.firestore().collection('Users').doc(req.body.uid).update({ card: admin.firestore.FieldValue.arrayUnion(card) })
        res.status(200).send({ success: true, message: 'Card has been saved', card: card, stripeCustomer: customer })
        // console.log(JSON.stringify(card))
    } catch (error) {
        res.send({ success: false, message: "Error: " + JSON.stringify(error) })
        console.log(JSON.stringify(error))
    }
});
exports.payWithStripeCard = functions.https.onRequest((request, response) => {
    stripe.charges.create({
        amount: Number(request.body.amount).toFixed(0),
        currency: request.body.currency,
        source: request.body.token,
        customer: request.body.customer
    }).then((charge) => {
        // asynchronously called
        console.log(JSON.stringify(charge))
        response.send(charge);
    })
        .catch(err => {
            console.log("ERROR: ", JSON.stringify(err));
        });
});
