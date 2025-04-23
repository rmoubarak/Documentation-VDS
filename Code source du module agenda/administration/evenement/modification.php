<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Administrateur::controlerAcces();

// génération d'un token pour garantir l'origine des appels vers les autres scripts du module
$token = Jeton::creer();

// chargement des données utilisées par l'interface
// récupération et contrôle du format du paramètre transmis
if (!isset($_GET['id']) ) {
    Erreur::envoyerReponse("L'identifiant de l'événement n'est pas transmis", 'global');
}
$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if ($id === false) {
    Erreur::envoyerReponse("L'identifiant de l'événement n'est pas valide", 'global');
}

$ligne = Agenda::getById($id);
if (!$ligne) {
    Erreur::envoyerReponse("Cet événements n'existe pas", 'global');
}

$data = json_encode($ligne);

$head =<<<EOD
<script>
     let data = $data;
     const token = '$token';
</script>
EOD;

// chargement des composants
$head .= "<script src='https://cdn.jsdelivr.net/gh/verghote/composant/ckeditor/ckeditor.js'></script>";

// affichage de l'interface
require RACINE . '/include/interface.php';
