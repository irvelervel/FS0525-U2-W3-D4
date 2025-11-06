const getYearInFooter = function () {
  const footer = document.getElementById('year')
  footer.innerText = new Date().getFullYear() // 2025
}

getYearInFooter()

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

// in questa pagina noi a partire dal form creeremo dei CONCERTI
// che invieremo al server in modo che possa memorizzarli in maniera persistente
// nel DB. Però non decido io COME sono fatti questi concerti, COME deve venire
// strutturato l'oggetto che invio al server! Lo decide il backender.

// sarà il backender che vi fornirà lo SCHEMA degli oggetti salvati a database:
// ogni oggetto che ENTRA ed ESCE dal DB deve seguire questo modello:
// - name (string)
// - description (string)
// - price (string/number)
// - time (string)
// TUTTI i campi sono obbligatori!

// alla pressione del tasto SUBMIT del form raccoglieremo i valori dei campi
const form = document.getElementById('event-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  //   recuperiamo i riferimenti ai 4 campi input
  const nameInput = document.getElementById('name') // input del nome
  const descriptionInput = document.getElementById('description') //  input descrizione
  const priceInput = document.getElementById('price') //  input prezzo
  const timeInput = document.getElementById('time') //  input data/ora

  const name = nameInput.value // valore del campo nome, es. "Pupo in Arena"
  const description = descriptionInput.value // valore del campo descrizione, es. "Unica data in Italia"
  const price = priceInput.value // valore del campo descrizione, es. "100"
  const time = timeInput.value // valore del campo data/ora, es. "2025-11-06T18:00"

  //   creo ora grazie alla classe Concert il mio oggetto
  const newEvent = new Concert(name, description, price, time)
  console.log('NEWEVENT', newEvent)

  // il concerto è pronto! ora lo INVIAMO alle API in modo da SALVARLO nel DB
  const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'
  // è lo stesso endpoint che usavamo per la GET!
  fetch(eventsURL, {
    method: 'POST', // creo una nuova risorsa
    body: JSON.stringify(newEvent), // devo mandare newEvent in formato JSON!
    headers: {
      'Content-Type': 'application/json', // va messa! indica alle API che il contenuto è in formato JSON
    },
  })
    .then((res) => {
      if (res.ok) {
        // l'evento è stato CORRETTAMENTE salvato in DB
        // :)
        alert('CONCERTO SALVATO!')
        // io qua mi fermo: se proseguissi con un return response.json() potrei
        // aspettare con un then successivo il JSON di risposta ma nelle API REST
        // spesso si tratta semplicemente della risorsa salvata a DB, ma in questo
        // caso non mi serve... mi basta semplicemente la conferma che l'operazione
        // sia andata a buon fine, e se sono arrivato qua già ce l'ho!

        // svuotiamo il form
        form.reset()
      } else {
        // le cose non hanno funzionato, errore 400, 404, 401, 500
        throw new Error(`Errore nella risposta del server: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log('PROBLEMA NEL SALVATAGGIO', err)
    })
  //   dobbiamo come sempre ASPETTARE questa Promise per capire com'è andata!
})

// URL NELLE API DI TIPO RESTFUL
// buone notizie: in un'API REST l'URL per un metodo POST è lo stesso del metodo GET
