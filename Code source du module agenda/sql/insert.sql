use ppe;

set @@sql_mode='ansi';

delete from agenda;

-- insertion de l'agenda
-- réinitialisation du compteur
alter table agenda auto_increment = 1;

INSERT INTO agenda (titre, date, contenu)
VALUES
    ('run2k challenge', '2025-09-11', 'Pour inaugurer la nouvelle saison de piste, venez courir le mercredi soir du stade un ou plusieurs 2000m. Premier depart 18h, tous les niveaux de performances sont les bienvenus. Ouvert aux non licenciés qui voudraient decouvrir le running. Inscriptions sur place.'),
    ('Demi-finale des championnats de France de 5km', '2025-09-22', 'Organisés par le VDS au parc de la Hotoie (parcours très performants), les 5 km d''Amiens-métropole se courront le dimanche 22/09 en matinée (ouvert à tous niveaux). Seule compétition dans les Hauts-de-France pour décrocher les minimas B (https://www.athe.fr/asp.net/main.html/html.aspx?htmlid=6390). Gratuit pour les VDS.'),
    ('100km de la Somme, Marathon d'' Amiens Metropole et Semi-marathon du Val de Somme', '2025-10-12', 'Organisée par le VDS avec départ et arrivée au Grand Marais sur le stade des spartiates, c''est la seule manifestation majeure de Picardie avec un label FFA national, attribué aux 100km (labels FFA régionaux sur le marathon et semi-marathon). Relais par équipes de 3 sur le semi-marathon. Renseignements et inscriptions sur www.100kmdelasomme.com. Nombre de places limités. Cette année, le 100 km est support des championnats de France de la distance.'),
    ('Finale des 4 saisons', '2025-11-03', 'Traditionnelle édition finale d''automne, avec son label régional FFA, sa grille de primes pour environ 2000 euros, son cadeau à tous les participants, et sa grosse tombola. Gratuit pour les VDS. Repas des bénévoles après la course.');


select * from agenda