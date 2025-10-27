import Token from "../models/Token"

const saveDefaultToken = async () => {
    const def = [
        {
            logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png",
            symbol: "celo",
            address: "0x0000000000000000000000000000000000000000",
        },
    ]

    for (let i = 0; i < def.length; i++) {
        const ex = await Token.findOne({ address: def[i].address })

        if (!ex) {
            new Token(def[i]).save()
        }
    }
}

export default saveDefaultToken