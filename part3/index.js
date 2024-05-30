const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    let newDate = new Date()

    response.send(
        `<p>Phonebok has info for ${persons.length} people</p>
         <p>${newDate.toUTCString()}</p>        
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id ===id)

    if (person) response.json(person)
    else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {

    const nameInArray = (name) => {
        persons.find(p => p.name === name)
    }

    if (!request.body.name || !request.body.number || nameInArray(request.body.name)) {
        return response.status(400).json({
            error: 'information missing or name is already in phonebook'
        })
    }

    const person = {
        name: request.body.name,
        number: request.body.number,
        id: Math.random() * 1000
    }

    persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})