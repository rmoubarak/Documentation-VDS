<?php

// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Administrateur::controlerAcces();

// génération d'un token pour garantir l'origine des appels vers les autres scripts du module
$token = Jeton::creer();

// chargement des données
$data = json_encode(Agenda::getAll());

$head =<<<EOD
<script >
    let data = $data
     const token = '$token';
</script>
EOD;

// chargement interface
require RACINE . '/include/interface.php';


