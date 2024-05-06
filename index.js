import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json')
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data))
    } catch (error) {
        console.error(error);
    }
}

app.get('/mep', (req, res) => {
    const data = readData()
    res.json(data)
})

app.post('/mep/:date', (req, res) => {
    const { date } = req.params
    const { value } = req.body
    if (!value) {
        res.status(418).send({message: "The value is needed"})
    }
    res.send({
        mep: `El valor del mep para el día ${date} es ${value}`
    })
})

app.listen(PORT, () => console.log(`Its alive on http://localhost:${PORT}`))

