DELIMITER $$

CREATE FUNCTION quantidade_musicas_no_historico (id INT)
RETURNS INT READS SQL DATA
BEGIN
DECLARE quantidade INT;
SELECT COUNT(user_id) AS quantidade_musicas_no_historico
FROM SpotifyClone.historic
WHERE user_id = id
INTO quantidade;
RETURN quantidade;
END $$

DELIMITER ;
