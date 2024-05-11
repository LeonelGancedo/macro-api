import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

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

app.get('', (req, res) => {
    res.send("Welcome to macro-api for Argentina")
})

app.get('/mep', (req, res) => {
    const data = readData()
    res.json(data.months)
})


app.get('/mep/:id', (req, res) => {
    const data = readData()
    const id = req.params.id
    const month = data.months.find(month => month.id === id)
    res.send(month)
})


app.post('/mep', (req, res) => {
    const data  = readData()
    const body = req.body
    const newMonth = {
        ...body
    }
    data.months.push(newMonth)
    writeData(data)
    res.json(newMonth)
})

app.put('/mep/:id', (req, res) => {
    const data  = readData()
    const body = req.body
    const id = req.params.id
    const bookIndex = data.months.findIndex(month => month.id === id)
    data.months[bookIndex] = {
        ...data.months[bookIndex],
        ...body,
    }
    writeData(data)
    res.json({message: "Registro actualizado"})
})

app.delete('/mep/:id', (req, res) => {
    const data  = readData()
    const id = req.params.id
    const bookIndex = data.months.findIndex(month => month.id === id)
    data.months.splice(bookIndex, 1)
    writeData(data)
    res.json({message: "Registro eliminado"})
})

app.listen(PORT, () => console.log(`Its alive on http://localhost:${PORT}`))

