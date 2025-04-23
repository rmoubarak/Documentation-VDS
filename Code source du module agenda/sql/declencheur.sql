use ppe;

CREATE TRIGGER before_insert_agenda
    BEFORE INSERT
    ON agenda
    FOR EACH ROW
BEGIN
    -- Si l'ID est NULL ou déjà existant ou mal renseigné (<= 0)
    IF NEW.id not regexp '^[0-9]+' OR EXISTS (SELECT 1 FROM agenda WHERE id = NEW.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''identifiant n''est pas valide';
    END IF;

-- Trigger sur le contenu
    IF NEW.contenu IS NULL OR LENGTH(NEW.contenu) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le contenu ne peut pas être vide.';
    END IF;

    SET NEW.contenu = REPLACE(NEW.contenu, '<', '&lt;');
    SET NEW.contenu = REPLACE(NEW.contenu, '>', '&gt;');

-- Trigger sur le titre
    IF NEW.titre IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le titre ne peut pas être nul';
    ELSEIF LENGTH(NEW.titre) < 3 OR LENGTH(NEW.titre) > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le titre doit contenir entre 3 et 100 caractères';
    ELSEIF NEW.titre NOT REGEXP '^[A-Za-z0-9,'' -]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
                'Le titre doit contenir uniquement des lettres, des chiffres, des virgules, des espaces et des tirets';
    END IF;

-- Trigger sur la date
    IF NEW.date IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date ne peut pas être nulle';
    ELSEIF NEW.date NOT REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date doit être au format YYYY-MM-DD';
    ELSEIF NEW.date <= CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date doit être supérieure à la date du jour';
    END IF;
END;



CREATE TRIGGER before_update_agenda
    BEFORE UPDATE
    ON agenda
    FOR EACH ROW
BEGIN
    -- Vérifie si l'ancien ID est différent du nouveau et empêche la modification
    IF OLD.id != NEW.id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Modification du champ ID interdite';


        -- Trigger sur le contenu
        IF NEW.contenu IS NULL OR LENGTH(NEW.contenu) = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le contenu ne peut pas être vide.';
        END IF;

        SET NEW.contenu = REPLACE(NEW.contenu, '<', '&lt;');
        SET NEW.contenu = REPLACE(NEW.contenu, '>', '&gt;');

-- Trigger sur le titre
        IF NEW.titre IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le titre ne peut pas être nul';
        ELSEIF LENGTH(NEW.titre) < 3 OR LENGTH(NEW.titre) > 100 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le titre doit contenir entre 3 et 100 caractères';
        ELSEIF NEW.titre NOT REGEXP '^[A-Za-z0-9,'' -]+$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
                    'Le titre doit contenir uniquement des lettres, des chiffres, des virgules, des espaces et des tirets';
        END IF;

-- Trigger sur la date
        IF NEW.date IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date ne peut pas être nulle';
        ELSEIF NEW.date NOT REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date doit être au format YYYY-MM-DD';
        ELSEIF NEW.date <= CURDATE() THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date doit être supérieure à la date du jour';
        END IF;
    end;


