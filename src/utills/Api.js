import { NotificationTypes } from "./Enums"

const urls = {
    saveCard: 'https://us-central1-studio11-14067.cloudfunctions.net/saveCard',
    charge: 'https://us-central1-studio11-14067.cloudfunctions.net/payWithStripeCard',
    sendNotification: 'https://us-central1-studio11-14067.cloudfunctions.net/sendNotificationToSingle',
    createExpressAccount: 'https://us-central1-studio11-14067.cloudfunctions.net/createExpressAccount',
    transferTest: 'https://us-central1-studio11-14067.cloudfunctions.net/transfer',
    retrieveAccount: 'https://us-central1-studio11-14067.cloudfunctions.net/retrieveAccount'
}
export const saveCard = async (body) => {
    try {
        console.log('====> entered api function')
        const response = await fetch(urls.saveCard, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}
export const charge = async (amount, cardToken, customerId) => {
    try {
        const response = await fetch(urls.charge, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: Number(amount).toFixed(2),
                currency: "usd",
                token: cardToken,
                customer: customerId
            }),
        })
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}
export const sendMessageNotificaiton = async (toUid, title, body, roomId) => {
    try {
        const response = await fetch(urls.sendNotification, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: toUid,
                title: title,
                body: body,
                type: NotificationTypes.MESSAGE,
                roomId: roomId
            }),
        })
        console.log(await response.text())
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}
export const sendOrderPlacementNotification = async (toUid, title, body) => {
    try {
        const response = await fetch(urls.sendNotification, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: toUid,
                title: title,
                body: body,
                type: NotificationTypes.ORDER,
            }),
        })
        console.log(await response.text())
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}
export const sendAppointmentNotification = async (toUid, title, body, appointmentId) => {
    try {
        const response = await fetch(urls.sendNotification, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: toUid,
                title: title,
                body: body,
                type: NotificationTypes.APPOINTMENT,
                appointmentId: appointmentId
            }),
        })
        console.log(await response.text())
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}
export const createStripeExpressAccount = async (userId) => {
    try {
        const response = await fetch(urls.createExpressAccount, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId
            }),
        })
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}
export const transfer = async (amount, account, barberId) => {
    try {
        const response = await fetch(urls.transferTest, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                barberId: barberId,
                amount: Number(amount * 100).toFixed(0),
                account
            }),
        })
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}
export const getAccount = async (account) => {
    try {
        const response = await fetch(urls.retrieveAccount, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account
            }),
        })
        const resultObject = await response.json()
        return resultObject
    } catch (error) {
        console.log(error.message)
        return false
    }
}

