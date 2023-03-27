CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio NUMERIC(10, 2),
    stock INTEGER,
    img VARCHAR(255)
);
INSERT INTO productos (id, nombre, descripcion, precio, stock, img)
VALUES
(1, 'Crash Bandicoot', 'Juego de plataforma', 12000, 100, 'imagenes/Crash.jpg'),
(2, 'Mortal Kombat X', 'Luchas con los mejores graficos', 15000, 100, 'imagenes/mortal.jpg'),
(3, 'Pac Man', 'Juego plataformero, niveles basicos', 15700, 97, 'imagenes/pacman.jpg'),
(4, 'Dragon Ball Xenoverse', 'Vive la experiencia dragon ball', 10000, 100, 'imagenes/dragonball.jpg'),
(5, 'Naruto Ninja Storm 4', 'La historia de Naruto', 12000, 100, 'imagenes/naruto.jpg'),
(6, 'Shingeki Final Attack', 'Eren Jeager vuelve en formato gamer...', 12000, 100, 'imagenes/shingeki.jpg'),
(7, 'League of Legends', 'No compres esto por tu bien', 14000, 100, 'imagenes/league.jpg'),
(8, 'Call Of Duty Warzone', 'Dispara como nunca', 12000, 100, 'imagenes/callduty.jpg'),
(9, 'Fifa 2019', 'Juego de futbol', 14000, 100, 'imagenes/fifa.jpg'),
(10, 'Fornite', 'Battle Royale', 12000, 100, 'imagenes/fornite.jpg');
select * from productos

ALTER TABLE productos
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
SELECT "id", "nombre", "descripcion", "precio", "stock", "img", "createdat", "updatedat" FROM "productos" AS "Product";
