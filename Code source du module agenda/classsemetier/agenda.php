<?php
declare(strict_types=1);

// définition de la table agenda : id, titre, date, contenu

class Agenda extends Table
{
    public function __construct()
    {
        parent::__construct('agenda');

        // seuls les colonnes pouvant être modifiées par l'administrateur sont définies

        // Nom (titre)
        $input = new inputText();
        $input->Require = true;
        $input->SupprimerAccent = false;
        $input->SupprimerEspaceSuperflu = true;
        $input->Pattern = "^[a-zA-Z0-9À-ÖØ-öø-ÿ' -]{10,150}$";
        $input->MaxLength = 150;
        $this->columns['titre'] = $input;

        // Date
        $input = new inputDate();
        $input->Require = true;

        // la date ne doit pas être inférieure à la date du jour ni dépassé d'un an la date du jour
        $input = new InputDate();
        $input->Min = date('Y-m-d');
        $input->Max = date("Y-m-d", strtotime("+1 year"));
        $this->columns['date'] = $input;

        // Contenu
        $input = new InputText();
        $input->MinLength = 10;
        $input->MaxLength = 1000;
        $input->Require = true;
        $this->columns['contenu'] = $input;
    }


    // ------------------------------------------------------------------------------------------------
    // Méthodes statiques relatives aux opérations de consultation
    // ------------------------------------------------------------------------------------------------

    public static function getAll(): array
    {
        // Récupération des paramètres du téléversement
        $sql = <<<EOD
        Select id, titre, date, contenu, DATE_FORMAT(date, '%d/%m/%Y') as dateFr
        From agenda
        order by date 
EOD;
        $select = new Select();
        return $select->getRows($sql);
    }


    /**
     * Récupère les données d'un évènement à partir de son id
     * @param int $id
     * @return array|false
     */
    public static function getById($id)
    {
        $sql = <<<EOD
             Select id, titre, contenu, date
             From agenda
             where id = :id;
EOD;
        $select = new Select();
        return $select->getRow($sql, ['id' => $id]);
    }
}
