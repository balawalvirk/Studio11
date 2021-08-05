
const urls = {
    saveCard: 'https://us-central1-studio11-14067.cloudfunctions.net/saveCard',
    charge: 'https://us-central1-studio11-14067.cloudfunctions.net/payWithStripeCard'
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
