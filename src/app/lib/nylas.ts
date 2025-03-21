import Nylas from "nylas";

export const nylas = new Nylas({
    apiKey: process.env.NALYS_SECRATE_KEY!,
    apiUri: process.env.NALYS_URI_KEY!
})

export const nylasConfig = {
    clientId: process.env.NALYS_CLIENT_ID,
    rediractUri: process.env.NEXT_PUBLIC_URL + "/api/oauth/exchange",
    apiKey: process.env.NALYS_SECRATE_KEY!,
    apiUri: process.env.NALYS_URI_KEY!


}