set foreign_key_checks = 0;

set default_storage_engine = InnoDb;

-- Désactivation du contrôle des clés étrangères
SET FOREIGN_KEY_CHECKS = 0;

use ppe;

drop table if exists agenda;

CREATE TABLE agenda
(
    id       int auto_increment primary key,
    titre    varchar(150) not null,
    date     date not null,
    contenu  text not null

);
