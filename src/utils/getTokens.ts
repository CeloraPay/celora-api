import Token from "../models/Token"

const getTokens = async () => {
    const tokens = await Token.find()

    return tokens
}

export default getTokens