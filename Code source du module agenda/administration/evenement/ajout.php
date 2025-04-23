<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Administrateur::controlerAcces();

// génération d'un token pour garantir l'origine des appels vers les autres scripts du module
$token = Jeton::creer();

// chargement des données utilisées par l'interface
$min = date('Y-m-d');

$head =<<<EOD
<script>
     const token = '$token';
     const min = '$min';
</script>
EOD;

// chargement des composants
$head .= "<script src='https://cdn.jsdelivr.net/gh/verghote/composant/ckeditor/ckeditor.js'></script>";

// affichage de l'interface
require RACINE . '/include/interface.php';
