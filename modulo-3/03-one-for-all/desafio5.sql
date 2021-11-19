CREATE VIEW top_2_hits_do_momento AS
    SELECT 
        s.name AS cancao, COUNT(h.song_id) AS reproducoes
    FROM
        SpotifyClone.songs AS s
            JOIN
        SpotifyClone.historic AS h ON h.song_id = s.song_id
    GROUP BY h.song_id
    ORDER BY 2 DESC , 1
    LIMIT 2;
