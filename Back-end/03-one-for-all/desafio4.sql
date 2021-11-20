CREATE VIEW top_3_artistas AS
    SELECT 
        a.name AS artista, COUNT(f.artist_id) AS seguidores
    FROM
        SpotifyClone.artists AS a
            JOIN
        SpotifyClone.followers AS f ON f.artist_id = a.artist_id
    GROUP BY f.artist_id
    ORDER BY 2 DESC , 1
    LIMIT 3;
