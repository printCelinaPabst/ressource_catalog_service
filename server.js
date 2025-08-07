import express from 'express';
import ressourcesRouter from './routes/ressources.js';
import { errorHandler } from './middleware/error-handler.js';

const port = 5002; // personalisierte Portnummer

const app = express() ; // eine Instanz erstellen / Webanwendung

// Middleeware
app.use(express.json());

// Routes
// Middleware (pre-routes)
app.use('/ressources', ressourcesRouter)

app.use(errorHandler);

app.get('/users',(req, res) => {  //call-back funktion mit 2 parameter request und response//// REST API (Endpunkt) mit GET
    res.send('Hier kommen die Users spaeter.');   // regeneriert eine Antwort,die zurückgegeben wird
});


// hier starten wir unseren Anwendungsserver
//app.listen sollte idealerweise am Ende der Datei stehen, nachdem alle Middleware und Routen definiert wurden

app.listen(port, () => {    // Callback-Funktion mit keinem Parameter, da listen keine req/res übergibt
    console.log(`Server is running at http://localhost:${port}`);

});
                      