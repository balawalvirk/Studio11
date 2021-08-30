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
            .set({ expressAccount: account }, { merge: true })
            .catch(error => console.log(JSON.stringify('FIRESTORE: ', error)))
        expressAccount = account
    } catch (error) {
        console.log(JSON.stringify(error))
        return response.status(500).send({ success: false, message: 'Error creating account: ' + error.message })
    }
    try {
        console.log(expressAccount.id)
        accountLinks = await stripe.accountLinks.create({
            account: expressAccount.id,
            refresh_url: 'https://teststudio11.page.link/Home',
            return_url: 'https://teststudio11.page.link/Home',
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
        console.log("BODY: ", JSON.stringify(request.body))
        let event

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
            console.log("ERROR: ", JSON.stringify(err))
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }
        console.log("EVENT TYPE: ", JSON.stringify(event.type))
        return response.status(200).send({ success: true, message: 'Done', event: event });
    } catch (error) {
        console.log(JSON.stringify(error))
    }
});

// {"type":"StripeSignatureVerificationError","raw":{"message":"No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? https://github.com/stripe/stripe-node#webhook-signing","detail":{"header":"t=1630329793,v1=7d0d80aaf6a967b5348b0c32d44d007fda732fdf4a33aa1010c794004c2b2f89,v0=2958414aa6d8f7e70a0b69e0e01dd2678db4e9a8541a42fc76d29a650b774f33","payload":{"id":"evt_1JUASC4EJryzmMPyIxdQ2phA","object":"event","account":"acct_1JUAQP4EJryzmMPy","api_version":"2020-08-27","created":1630329792,"data":{"object":{"id":"acct_1JUAQP4EJryzmMPy","object":"account","business_profile":{"mcc":null,"name":null,"support_address":null,"support_email":null,"support_phone":null,"support_url":null,"url":null},"capabilities":{"card_payments":"inactive","transfers":"inactive"},"charges_enabled":false,"country":"US","default_currency":"usd","details_submitted":false,"email":null,"payouts_enabled":false,"settings":{"bacs_debit_payments":{},"branding":{"icon":null,"logo":null,"primary_color":null,"secondary_color":null},"card_issuing":{"tos_acceptance":{"date":null,"ip":null}},"card_payments":{"statement_descriptor_prefix":null,"decline_on":{"avs_failure":false,"cvc_failure":false}},"dashboard":{"display_name":null,"timezone":"Etc/UTC"},"payments":{"statement_descriptor":null,"statement_descriptor_kana":null,"statement_descriptor_kanji":null},"sepa_debit_payments":{},"payouts":{"debit_negative_balances":true,"schedule":{"delay_days":2,"interval":"daily"},"statement_descriptor":null}},"type":"express","created":1630329682,"external_accounts":{"object":"list","data":[],"has_more":false,"total_count":0,"url":"/v1/accounts/acct_1JUAQP4EJryzmMPy/external_accounts"},"login_links":{"object":"list","total_count":0,"has_more":false,"url":"/v1/accounts/acct_1JUAQP4EJryzmMPy/login_links","data":[]},"metadata":{},"requirements":{"current_deadline":null,"currently_due":["business_profile.mcc","business_profile.url","external_account","individual.verification.document","tos_acceptance.date","tos_acceptance.ip"],"disabled_reason":"requirements.past_due","errors":[{"code":"verification_failed_keyed_identity","reason":"The identity information you entered cannot be verified. Please correct any errors or upload a document that matches the identity fields (e.g., name and date of birth) that you entered.","requirement":"individual.verification.document"}],"eventually_due":["business_profile.mcc","business_profile.url","external_account","individual.verification.document","tos_acceptance.date","tos_acceptance.ip"],"past_due":["business_profile.mcc","business_profile.url","external_account","individual.verification.document","tos_acceptance.date","tos_acceptance.ip"],"pending_verification":["individual.address.city","individual.address.line1","individual.address.postal_code","individual.address.state","individual.id_number"]},"tos_acceptance":{"date":null}},"previous_attributes":{"requirements":{"currently_due":["business_profile.mcc","business_profile.url","external_account","tos_acceptance.date","tos_acceptance.ip"],"errors":[],"eventually_due":["business_profile.mcc","business_profile.url","external_account","tos_acceptance.date","tos_acceptance.ip"],"past_due":["business_profile.mcc","business_profile.url","external_account","tos_acceptance.date","tos_acceptance.ip"],"pending_verification":["individual.address.city","individual.address.line1","individual.address.postal_code","individual.address.state","individual.id_number","individual.verification.document"]}}},"livemode":false,"pending_webhooks":1,"request":{"id":null,"idempotency_key":null},"type":"account.updated"}}},"detail":{"header":"t=1630329793,v1=7d0d80aaf6a967b5348b0c32d44d007fda732fdf4a33aa1010c794004c2b2f89,v0=2958414aa6d8f7e70a0b69e0e01dd2678db4e9a8541a42fc76d29a650b774f33","payload":{"id":"evt_1JUASC4EJryzmMPyIxdQ2phA","object":"event","account":"acct_1JUAQP4EJryzmMPy","api_version":"2020-08-27","created":1630329792,"data":{"object":{"id":"acct_1JUAQP4EJryzmMPy","object":"account","business_profile":{"mcc":null,"name":null,"support_address":null,"support_email":null,"support_phone":null,"support_url":null,"url":null},"capabilities":{"card_payments":"inactive","transfers":"inactive"},"charges_enabled":false,"country":"US","default_currency":"usd","details_submitted":false,"email":null,"payouts_enabled":false,"settings":{"bacs_debit_payments":{},"branding":{"icon":null,"logo":null,"primary_color":null,"secondary_color":null},"card_issuing":{"tos_acceptance":{"date":null,"ip":null}},"card_payments":{"statement_descriptor_prefix":null,"decline_on":{"avs_failure":false,"cvc_failure":false}},"dashboard":{"display_name":null,"timezone":"Etc/UTC"},"payments":{"statement_descriptor":null,"statement_descriptor_kana":null,"statement_descriptor_kanji":null},"sepa_debit_payments":{},"payouts":{"debit_negative_balances":true,"schedule":{"delay_days":2,"interval":"daily"},"statement_descriptor":null}},"type":"express","created":1630329682,"external_accounts":{"object":"list","data":[],"has_more":false,"total_count":0,"url":"/v1/accounts/acct_1JUAQP4EJryzmMPy/external_accounts"},"login_links":{"object":"list","total_count":0,"has_more":false,"url":"/v1/accounts/acct_1JUAQP4EJryzmMPy/login_links","data":[]},"metadata":{},"requirements":{"current_deadline":null,"currently_due":["business_profile.mcc","business_profile.url","external_account","individual.verification.document","tos_acceptance.date","tos_acceptance.ip"],"disabled_reason":"requirements.past_due","errors":[{"code":"verification_failed_keyed_identity","reason":"The identity information you entered cannot be verified. Please correct any errors or upload a document that matches the identity fields (e.g., name and date of birth) that you entered.","requirement":"individual.verification.document"}],"eventually_due":["business_profile.mcc","business_profile.url","external_account","individual.verification.document","tos_acceptance.date","tos_acceptance.ip"],"past_due":["business_profile.mcc","business_profile.url","external_account","individual.verification.document","tos_acceptance.date","tos_acceptance.ip"],"pending_verification":["individual.address.city","individual.address.line1","individual.address.postal_code","individual.address.state","individual.id_number"]},"tos_acceptance":{"date":null}},"previous_attributes":{"requirements":{"currently_due":["business_profile.mcc","business_profile.url","external_account","tos_acceptance.date","tos_acceptance.ip"],"errors":[],"eventually_due":["business_profile.mcc","business_profile.url","external_account","tos_acceptance.date","tos_acceptance.ip"],"past_due":["business_profile.mcc","business_profile.url","external_account","tos_acceptance.date","tos_acceptance.ip"],"pending_verification":["individual.address.city","individual.address.line1","individual.address.postal_code","individual.address.state","individual.id_number","individual.verification.document"]}}},"livemode":false,"pending_webhooks":1,"request":{"id":null,"idempotency_key":null},"type":"account.updated"}}} 