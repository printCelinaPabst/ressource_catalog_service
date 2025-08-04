import express from 'express';

const app = express() ; // eine Instanz erstellen / Webanwendung

const port = 5002; // personalisierte Portnummer

app.get('/',(req, res) => {               //call-back funktion mit 2 parameter request und response
    res.send('Welcome to Resource Catalog');// regernieren eine Antwort,die zurückgegeben wird
}) ;                              

app.listen(port, (req, res) => {
    console.log(`Server is running at http://localhost:${port}`);

});                                         