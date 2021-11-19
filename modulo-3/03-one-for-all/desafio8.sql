DELIMITER $$

CREATE TRIGGER trigger_usuario_delete
BEFORE DELETE ON SpotifyClone.users
FOR EACH ROW
BEGIN
DELETE FROM followers
WHERE user_id = old.user_id;
DELETE FROM historic 
WHERE
    user_id = old.user_id;
END $$

DELIMITER ;
