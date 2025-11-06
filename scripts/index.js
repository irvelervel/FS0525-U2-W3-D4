const getYearInFooter = function () {
  const footer = document.getElementById('year')
  footer.innerText = new Date().getFullYear() // 2025
}

getYearInFooter()

const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

// ok, è arrivato il momento di recuperare gli EVENTI dall'API di EPICODE
// e inserirli nella pagina!
const getEvents = function () {
  fetch(eventsURL)
    .then((res) => {
      console.log('RESPONSE', res)
      if (res.ok) {
        // la risposta è stata 200 o simili
        // i dati sono arrivati! :) però per estrarre un JSON da una Response
        // devo utilizzare il metodo .json()
        // il metodo .json() però è ASINCRONO, e TORNA UNA PROMISE
        return res.json()
      } else {
        // la risposta è stata 400, 401, 404, 500 etc.
        // c'è stato un errore!
        // per evitare di riscrivere e ri-gestire l'errore, riutilizziamo
        // il codice del blocco catch! teletrasportiamoci!
        throw new Error(
          `Errore nella risposta ricevuta dal server: ${res.status}`
        )
      }
    })
    .then((arrayOfEvents) => {
      // ed è qui dentro che voi avete accesso ai dati!
      // qui dentro manipoleremo il DOM in modo da utilizzarli
      console.log('ARRAYOFEVENTS', arrayOfEvents)
    })
    .catch((err) => {
      console.log('PROBLEMA', err)
      // problemi di connessione, spina staccata etc.
    })
}

getEvents()
