SELECT 
    ProductName AS `Produto`, Price AS Preço
FROM
    w3schools.products AS p
        JOIN
    order_details AS o ON o.ProductID = p.ProductID
WHERE
    o.Quantity > 80
ORDER BY Produto;
