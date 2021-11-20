DELIMITER $$

CREATE PROCEDURE albuns_do_artista (IN nome VARCHAR(100))
BEGIN
SELECT artists.name AS artista, albums.name AS album
FROM SpotifyClone.artists
JOIN SpotifyClone.albums
WHERE artists.name = 'Walter Phoenix'
AND albums.artist_id = artists.artist_id
ORDER BY 2;
END $$

DELIMITER ;
