import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();


const ___filename = fileURLToPath(import.meta.url); 
//C:\Users\techs\git-repos\ressource_catalog_service\server.js
//C:\Users\techs\git-repos\ressource_catalog_service\routes\ressources.js

const ___dirname = path.dirname(___filename);  // specihert wo sich unsere Datei befindet
const data_file = path.join(___dirname, '../data', 'ressources.json');  // wo sich die Datei befindet


router.get('/',(req, res) => {   //call-back funktion mit 2 parameter request und response// REST API (Endpunkt) mit GET
    try {
        const data = readFileSync(data_file, 'utf8');
        const ressources = JSON.parse(data);
        res.json(ressources);   // regeneriert eine Antwort,die zurückgegeben wird
    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Daten'});
    }
});


router.get('/:id', (req, res) => {
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
    } catch  (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Daten'});
    }
});

export default router;