CREATE VIEW cancoes_premium AS
    SELECT 
        s.name AS nome, COUNT(s.name)
    FROM
        SpotifyClone.songs AS s
            JOIN
        SpotifyClone.historic AS h ON h.song_id = s.song_id
            JOIN
        SpotifyClone.users AS u ON u.user_id = h.user_id
    WHERE
        u.plan_id IN (2 , 3)
    GROUP BY s.name
    ORDER BY 1;
