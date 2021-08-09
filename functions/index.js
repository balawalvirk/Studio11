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
exports.sendNotificationToSingle = functions.https.onRequest(async (request, response) => {
    const toUid = request.body.uid
    const type = request.body.type
    const title = request.body.title
    const body = request.body.body
    let fcm
    let roomId
    try {
        console.log(JSON.stringify({ type, title, body, toUid }))
        const userDoc = await admin.firestore().collection('Users').doc(toUid).get()
        fcm = userDoc.data().fcm
        console.log(JSON.stringify({ fcm }))

        if (type == 'MESSAGE') {
            roomId = request.body.roomId
            const notifId = admin.firestore().collection('Rnd').doc().id
            console.log(JSON.stringify({
                notifId, toUid, data: {
                    id: notifId,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                    type: type,
                    title: title,
                    body: body
                }
            }))
            admin.firestore()
                .collection('Users')
                .doc(toUid)
                .collection('Notifications')
                .doc(notifId)
                .set({
                    id: notifId,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                    type: type,
                    title: title,
                    body: body
                }, { merge: true })
            await admin.messaging().send({
                notification: {
                    title: title,
                    body: body,
                },
                data: {
                    type: type,
                    roomId: roomId
                },
                token: fcm,
            })
            return response.status(200).send({ success: true, message: 'Notification sent!' })
        } else {

        }


    } catch (error) {
        console.log(JSON.stringify(error))
        return response.status(500).send({ success: false, message: 'Something went wrong!' })
    }

});