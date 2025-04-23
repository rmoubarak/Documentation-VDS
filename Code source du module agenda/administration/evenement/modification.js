"use strict";

import {
    configurerFormulaire,
    afficherErreurSaisie,
    donneesValides,
    effacerLesErreurs,
    afficherErreur, retournerVers, donneesModifiees, genererMessage
} from "https://verghote.github.io/composant/fonction.js";

/* global token, data, CKEDITOR */

// récupération des élements sur l'interface
const contenu = document.getElementById('contenu');
const titre = document.getElementById('titre');
const date = document.getElementById('date');
const btnModifier = document.getElementById('btnModifier');
const msg = document.getElementById('msg');

// alimentation des champs du formulaire
CKEDITOR.replace('contenu', {uiColor: '#42a4b9', height: '300px'});
let id = data.id;
titre.value = data.titre;
contenu.value = data.contenu;
CKEDITOR.instances.contenu.setData(data.contenu);
date.value = data.date;
btnModifier.onclick = modifier;

let element = data;

configurerFormulaire();


btnModifier.onclick = () => {
    let erreur = false;
    effacerLesErreurs();
    contenu.value = CKEDITOR.instances.contenu.getData();
    if (contenu.value.length < 30) {
        afficherErreurSaisie('contenu', 'Veuillez compléter suffisamment le contenu de cette information');
        erreur = true;
    }
    if (donneesModifiees(element) && donneesValides() && !erreur) {
        modifier();
    }
};


/**
 * Contrôle des données saisies et demande d'ajout
 */
function modifier() {
    // transmission des paramètres
    let modif = false;
    const lesValeurs = {};
    if (titre.value !== data.titre) {
        lesValeurs.titre = titre.value;
        modif = true;
    }
    if (contenu.value !== data.contenu) {
        lesValeurs.contenu = contenu.value;
        modif = true;
    }
    if (date.value !== data.date) {
        lesValeurs.date = date.value;
        modif = true;
    }
    if (modif === false)  {
        afficherErreur("aucune modification constatée !");
        return;
    }
    $.ajax({
        url: '/ajax/modifier.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            table : 'agenda',
            id : data.id,
            lesValeurs : JSON.stringify(lesValeurs),
            token: token
        },
        success: data => {
            if (data.success) {
                retournerVers(data.success, 'index.php');
            } else if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        console.log(message);
                        afficherErreur('Une erreur est survenue lors de la modification');
                    } else if (key === 'global') {
                        msg.innerHTML =  genererMessage(message);
                    } else  {
                        afficherErreurSaisie(key, message );
                    }
                }
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}


