DELIMITER $$

CREATE TRIGGER insere_data_atual_na_orderDate_a_cada_order_criada
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
SET NEW.OrderDate = NOW();
END $$

DELIMITER ;
