import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4} from 'uuid';

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
            res.status(404).json({ error: `Ressource mit ID ${ressourceId} nicht gefunden` })

    } 
    } catch  (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Daten'});
    }
});

router.post('/', (req, res) => {
    const newData = req.body;


    if (!newData.title || !newData.type) {
        res.status(400).json({error: 'title und type sind erforderlich'});
        return;
    }
    // 1. Neues Resource Objekt
    const newRessource = {
        id: uuidv4(),
        ...newData,
        
    }
    // 2. Vorhandene Daten aus der Datei lesen und in einem Array speicher.
    try {
        const data = readFileSync(data_file, 'utf8');
        const ressources = JSON.parse(data);

        // 3. Das neue Objekt in das Array hinzufuegen.
        ressources.push(newRessource);
        
    // 4. Das neue Array in die Datei schreiben.
        writeFileSync(data_file, JSON.stringify(ressources, null, 2), 'utf8' )
    // 5. Antwort schicken.
        res.status(201).json(newRessource);



    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Ressourcen-Daten.' });
    }
})


router.put('/:id', (req, res, next) => {
    // 1. ID auslesen
    const ressourceId = req.params.id;
    const newData = req.body; 
    
    if (!newData || Object.keys(newData).length === 0) {
        res.status(400).json({ error: 'Keine Daten zum Aktualisieren vorhanden.' });
        return;
    }
    
    try {
        // 2. Alle Ressourcen laden
        const data = readFileSync(data_file, 'utf8');
        const ressources = JSON.parse(data);

        // 3. Die Ressource nach der ID suchen
        // const resource = resources.find(r => r.id === resourceId);
        const ressourceIndex = ressources.findIndex(r => r.id === ressourceId);

        // 4. Wenn die Ressource nicht existiert - dann 404
        if (ressourceIndex === -1) {
            res.status(404).json({ error: `Ressource mit ID ${ressourceId} nicht gefunden.`});
            return;
        }

        // 5. Wenn die Ressource existiert - updaten
        ressources[ressourceIndex] = {...ressources[ressourceIndex], ...newData};

        // 6. Updates in der Datei speichern.
        writeFileSync(data_file, JSON.stringify(ressources, null, 2), 'utf8');

        res.status(200).json(ressources[ressourceIndex]);

    } catch(error) {
        res.status(500).json({ error: 'Interner Serverfehler bei der Verarbeitung der Ressourcen-Daten.' });
    }


router.delete('/:id', (req, res, next) => {
    const resourceId = req.params.id;

    try {
        const data = readFileSync(data_file, 'utf8');
        let ressources = JSON.parse(data);
        const initialLength = ressources.length;
        ressources = ressources.filter(r => r.id !== ressourceId);

        if (ressources.length === initialLength) {
            res.status(404).json({ error: `Ressource mit ID ${ressourceId} nicht gefunden.` });
            return;
        }

        writeFileSync(data_file, JSON.stringify(ressources, null, 2), 'utf8');

        res.status(204).end();

    } catch (error) {
        next(error);
    }

});

export default router;