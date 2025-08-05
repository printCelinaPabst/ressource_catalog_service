import express from 'express';
import { readFileSync} from 'fs';
import path from 'path';
import { fileURLToPath} from 'url';

const app = express() ; // eine Instanz erstellen / Webanwendung
app.use(express.json());

const port = 5002; // personalisierte Portnummer
const ___filename = fileURLToPath(import.meta.url); 
const ___dirname = path.dirname(___filename);  // specihert wo sich unsere Datei befindet
const data_file = path.join(___dirname, 'data', 'ressources.json');  // wo sich die Datei befindet

app.get('/',(req, res) => {     //call-back funktion mit 2 parameter request und response // REST API (Endpunkt) mit GET
    res.send('Welcome to Resource Catalog'); // regeneriert eine Antwort,die zurückgegeben wird
}) ;                              

app.get('/ressources',(req, res) => {   //call-back funktion mit 2 parameter request und response// REST API (Endpunkt) mit GET
    try {
        const data = readFileSync(data_file, 'utf8');
        const ressources = JSON.parse(data);
        res.json(ressources);   // regeneriert eine Antwort,die zurückgegeben wird
    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Daten'});
    }
});

app.get('/users',(req, res) => {  //call-back funktion mit 2 parameter request und response//// REST API (Endpunkt) mit GET
    res.send('Hier kommen die Users spaeter.');   // regeneriert eine Antwort,die zurückgegeben wird
});

app.get('/ressources/:id', (req, res) => {
    try {
        const ressourceId = req.params.id;
        const data = readFileSync(data_file, 'utf8');
        const ressources = JSON.parse(data);
        const ressource = ressources.find(r => r.id === ressourceId)
        
        if (ressource) {
            res.json(ressource);

        } else {
            res.status(404).json({ error: `Ressource mit ID ${ressourceId} nicht gefunden.` })

    } 
    } catch  (error) {}
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Daten'});

});


// hier starten wir unseren Anwendungsserver
//app.listen sollte idealerweise am Ende der Datei stehen, nachdem alle Middleware und Routen definiert wurden

app.listen(port, () => {    // Callback-Funktion mit keinem Parameter, da listen keine req/res übergibt
    console.log(`Server is running at http://localhost:${port}`);

});
                      