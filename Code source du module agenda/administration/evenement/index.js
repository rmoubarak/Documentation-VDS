"use strict";

import {
    afficherErreur,
    confirmer, afficherErreurSaisie, afficherSucces, genererMessage
} from "https://verghote.github.io/composant/fonction.js";

// variable globale
/* global data, token */

// id du partenaire en cours de modification

const lesLignes = document.getElementById('lesLignes');
const msg = document.getElementById('msg');

lesLignes.innerHTML = '';
const row = document.createElement('div');
row.classList.add('row');
for (const element of data) {

    let id = element.id;
    let tr = lesLignes.insertRow();
    tr.style.verticalAlign = 'middle';
    tr.id = id;

    // colonne contenant des boutons d'action
    let td = tr.insertCell();

    let i = document.createElement('i');
    i.classList.add('bi', 'bi-x', 'm-1');
    i.style.color = 'red';
    i.title = "Supprimer l'évènement";
    i.onclick = () => confirmer(() => supprimer(element.id));
    td.appendChild(i);

    i = document.createElement('i');

    i.classList.add('bi', 'bi-pencil-square', 'text-warning', 'm-1');
    i.title = "Modifier l'évènement";
    i.onclick = () => {
        location.href = "modification.php?id=" + element.id;
    };
    td.appendChild(i);

    // affichage de la date
    td = tr.insertCell();
    td.style.textAlign = "center";
    td.innerText = element.dateFr;

    // affichage du titre
    tr.insertCell().innerText = element.titre;
}

/**
 * Demande de suppression
 * @param {int} id id de l'évènement
 */
function supprimer(id) {
    $.ajax({
        url: '/ajax/supprimer.php',
        method: 'POST',
        data: {
            table : 'agenda',
            id: id,
            token : token
        },
        dataType: 'json',
        success: data => {
            if (data.success) {
                afficherSucces(data.success);
                // Mise à jour de l'interface
                const ligne = document.getElementById(id);
                ligne.parentNode.removeChild(ligne);
            } else {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'global') {
                        msg.innerHTML =  genererMessage(message);
                    } else  {
                        afficherErreur('Une erreur est survenue lors de la supression');
                        console.error(message);
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








