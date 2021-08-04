
const urls = {
    saveCard: 'https://us-central1-studio11-14067.cloudfunctions.net/saveCard'
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