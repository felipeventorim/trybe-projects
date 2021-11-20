DELIMITER $$

CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR(50))
RETURNS INT READS SQL DATA
BEGIN
DECLARE jobsQuantity INT;
SELECT 
    COUNT(jh.JOB_ID)
FROM
    hr.job_history AS jh
        JOIN
    hr.employees AS e ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID
WHERE
    e.EMAIL = email INTO jobsQuantity;
    RETURN jobsQuantity;
END $$

DELIMITER ;
