CREATE VIEW historico_reproducao_usuarios AS
    SELECT 
        u.user AS usuario, s.name AS nome
    FROM
        SpotifyClone.users AS u
            JOIN
        SpotifyClone.historic AS h ON h.user_id = u.user_id
            JOIN
        SpotifyClone.songs AS s ON s.song_id = h.song_id
    ORDER BY 1 , 2;
