"use strict";

import {
    afficherErreur,
    afficherErreurSaisie,
    configurerFormulaire,
    donneesValides,
    effacerLesErreurs,
    filtrerLaSaisie,
    retournerVers,
} from "https://verghote.github.io/composant/fonction.js";

/* global CKEDITOR, token, min */

// récupération des données de l'interface
let titre = document.getElementById('titre');
let contenu = document.getElementById('contenu');
let date = document.getElementById('date');
let btnAjouter = document.getElementById('btnAjouter');
let msg = document.getElementById('msg');

date.min = min;
date.value = min;

CKEDITOR.replace('contenu', {height: '300x'});

configurerFormulaire();
// limiter les caractères autorisés lors de la frappe sur le champ titre
filtrerLaSaisie('titre', /[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]/);
titre.focus();

// traitement associé au bouton 'Ajouter'
btnAjouter.onclick = () => {
    let erreur = false;
    effacerLesErreurs();
    contenu.value = CKEDITOR.instances.contenu.getData();
    if (contenu.value.length < 30) {
        afficherErreurSaisie('contenu', 'Veuillez compléter suffisamment le contenu de cette information');
        erreur = true;
    }
    if (donneesValides() && !erreur) {
        ajouter();
    }
};

/**
 * Contrôle des données saisies et demande d'ajout
 */
function ajouter() {

    $.ajax({
        url: '/ajax/ajouter.php',
        type: 'POST',
        data: {
            table : 'agenda',
            titre: titre.value,
            date: date.value,
            contenu: contenu.value,
            token: token
        },
        dataType: 'json',
        success: (data) => {
            if (data.success) {
                retournerVers("L'évènement a été ajouté", '.');
            } else {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        msg.innerText = message;
                    } else {
                        afficherErreurSaisie(key, message);
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
