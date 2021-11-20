DELIMITER $$

CREATE PROCEDURE buscar_media_por_cargo(IN jobTitle VARCHAR(200))
BEGIN
SELECT ROUND(AVG(e.SALARY), 2) AS `Média salarial`
    FROM hr.jobs AS j
    JOIN hr.employees AS e ON j.JOB_ID = e.JOB_ID
    WHERE jobTitle = JOB_TITLE;
END $$

DELIMITER ;
