const getYearInFooter = function () {
  const footer = document.getElementById('year')
  footer.innerText = new Date().getFullYear() // 2025
}

getYearInFooter()

// questa pagina dettagli si carica con nell'URL un parametro, "concertID"
// questo parametro mi trasmette nella pagina dettagli la proprietà _id
// del concerto su cui ho cliccato
// ora devo RECUPERARE quel parametro "concertID" ed utilizzarlo per fare
// una chiamata GET molto specifica su ".../agenda/:id"
// es. 'https://striveschool-api.herokuapp.com/api/agenda/690c73f54c1df3001589c89c'

// a) recupero il _id della barra degli indirizzi, sarà il valore del parametro "concertID"
const url = location.search // tutto il contenuto della barra degli indirizzi
console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('concertID')
console.log('ID', id)
