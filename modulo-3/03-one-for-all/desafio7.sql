CREATE VIEW perfil_artistas AS
    SELECT 
        ar.name AS artista,
        al.name AS album,
        (SELECT 
                COUNT(*)
            FROM
                SpotifyClone.followers AS f
            GROUP BY f.artist_id
            HAVING f.artist_id = ar.artist_id) AS seguidores
    FROM
        SpotifyClone.albums AS al
            JOIN
        SpotifyClone.artists AS ar ON al.artist_id = ar.artist_id
    ORDER BY 3 DESC , 1 , 2;
