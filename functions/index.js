const functions = require("firebase-functions");
const stripe = require('stripe')('sk_test_51JKKvPKlzfvLSqIKNE65LAtxeZVVvIHxyIeeWjigncqFM7FdEcW315fMbHdHUhiuNKiW94ypk0SvFVKOyYaXT4pP00XzzAsrmD');
const admin = require('firebase-admin')
const endpointSecret = 'whsec_DDPYH0ceaK1KqtkVv5XsSHTfJsq7LU30';
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
    }).then(async (charge) => {
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
        } else if (type == 'ORDER') {
            const notifId = admin.firestore().collection('Rnd').doc().id
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
                token: fcm,
            })
            return response.status(200).send({ success: true, message: 'Notification sent!' })
        } else if (type == 'APPOINTMENT') {
            const appointmentId = request.body.appointmentId
            const notifId = admin.firestore().collection('Rnd').doc().id
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
                    body: body,
                    appointmentId: appointmentId
                }, { merge: true })
            await admin.messaging().send({
                notification: {
                    title: title,
                    body: body,
                },
                data: {
                    appointmentId: appointmentId,
                    type: type
                },
                token: fcm,
            })
            return response.status(200).send({ success: true, message: 'Notification sent!' })
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        return response.status(500).send({ success: false, message: 'Something went wrong!' })
    }

});
exports.createExpressAccount = functions.https.onRequest(async (request, response) => {
    const userId = request.body.id
    console.log('USERID: ', userId)
    let expressAccount = null
    let link = null
    try {
        const userDoc = await admin
            .firestore()
            .collection('Users')
            .doc(userId)
            .get()
        if (!userDoc.data().expressAccount) {
            const account = await stripe.accounts.create({
                country: 'US',
                type: 'express',
                capabilities: {
                    card_payments: {
                        requested: true,
                    },
                    transfers: {
                        requested: true,
                    },
                },
            });
            await admin.firestore()
                .collection('Users')
                .doc(userId)
                .set({ expressAccount: account.id }, { merge: true })
                .catch(error => console.log(JSON.stringify('FIRESTORE: ', error)))
            expressAccount = account.id
        } else {
            expressAccount = userDoc.data().expressAccount
        }

    } catch (error) {
        console.log(JSON.stringify(error))
        return response.status(500).send({ success: false, message: 'Error creating account: ' + error.message })
    }
    try {
        accountLinks = await stripe.accountLinks.create({
            account: expressAccount,
            refresh_url: 'https://teststudio11.page.link/nYJz',
            return_url: 'https://teststudio11.page.link/nYJz',
            type: 'account_onboarding',
        });
        link = accountLinks
        console.log('====>', JSON.stringify(accountLinks))
    } catch (error) {
        console.log(JSON.stringify(error))
        return response.status(500).send({ success: false, message: 'Error creating link: ' + error.message })
    }
    if (accountLinks && expressAccount) {
        return response.
            status(200).
            send({
                success: true,
                message: 'Stripe express user created!',
                expressAccount: expressAccount,
                link: link
            })
    } else {
        return response.status(500).send({ success: false, message: 'Error' })
    }
});
exports.verifyInformation = functions.https.onRequest(async (request, response) => {
    try {
        const sig = request.headers['stripe-signature'];
        console.log("SIGNATURE: ", JSON.stringify(sig))
        console.log("BODY: ", JSON.stringify(request.body))
        let event

        try {
            event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
        } catch (err) {
            console.log("ERROR: ", JSON.stringify(err))
            return response.status(400).send(`Webhook Error: ${JSON.stringify(err.message)}`);
        }
        console.log("EVENT TYPE: ", JSON.stringify(event.type))
        if (event.type == 'account.external_account.created') {
            const snapshot = await admin.
                firestore()
                .collection('Users')
                .where('expressAccount', '==', req.body.account)
                .get()
            snapshot.forEach(async doc => {
                await admin.firestore().collection('Users').doc(doc.data().id).set({ stripeIntegrated: true }, { merge: true })
            })
        }
        return response.status(200).send({ success: true, message: 'Done', event: event });
    } catch (error) {
        console.log(JSON.stringify(error))
    }
});
exports.transfer = functions.https.onRequest(async (request, response) => {
    const amount = request.body.amount
    const destinationAccountId = request.body.account
    console.log("BODY: ", request.body)
    try {
        const transfer = await stripe.transfers.create({
            amount: amount,
            currency: 'usd',
            destination: destinationAccountId,
        });
        return response.status(200).send({ success: true, message: 'Done', transfer: transfer });
    } catch (error) {
        console.log(JSON.stringify(error), 'Function errors')
        return response.status(400).send({ success: false, message: 'Error making transfer' });
    }
});
exports.retrieveAccount = functions.https.onRequest(async (request, response) => {
    const accountId = request.body.account
    try {
        const account = await stripe.accounts.retrieve(
            accountId
        );
        return response.status(200).send({ success: true, account: account });
    } catch (error) {
        console.log(JSON.stringify(error), 'retrieveAccount errors')
        return response.status(400).send({ success: false, message: 'Could not retrieve account' });
    }
});

