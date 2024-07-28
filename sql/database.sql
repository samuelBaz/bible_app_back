create table bible_rv60
(
    book    int                      not null,
    chapter smallint                 not null,
    verse   smallint                 not null,
    text    longtext charset utf8mb3 not null
)
    comment 'Versículos' engine = MyISAM
                         collate = latin1_spanish_ci
                         row_format = DYNAMIC;

create index capitulo
    on bible_rv60 (chapter);

create index libro_id
    on bible_rv60 (book);

create index versiculo
    on bible_rv60 (verse);

create table bible_rv60_books
(
    id          int unsigned auto_increment
        primary key,
    name        varchar(50) not null,
    abreviation varchar(10) not null,
    testament   varchar(1)  not null,
    genre       varchar(45) not null
)
    comment 'Libros de la Biblia' engine = MyISAM
                                  collate = latin1_spanish_ci;


