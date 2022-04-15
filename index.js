const express = require('express')
const MercadoPago = require('mercadopago'
)
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-6435388584272217-041423-0ef35ccba6d540634a869befa6f8c83a-228047993"
});

app.get("/", (req, res) => {
    res.send("olá mundo")
})

app.get('/pagar', async (req, res) => {

    let id = "" + Date.now();
    let emailDoPagador = "isaiasodr@outlook.com"
    let dados = {
        items: [
            item = {
                id: id,
                title: "2x video games",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: emailDoPagador
        },
        external_reference: id,
    }
    try {
        let pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);
    } catch (err) {
        console.log(err)
    }
})
app.post("/not",(req,res)=>{
    console.log(req.query);
    res.send("ok")
})

app.listen(3000, (req, res) => {
    console.log("servidor rodando!");
})