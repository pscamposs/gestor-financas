CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_banks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(45) NOT NULL,
  `invoice_closing_day` int NOT NULL,
  `color` varchar(8) NOT NULL,
  `icon` text NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bank_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`label`),
  KEY `user_id_idx` (`bank_user_id`),
  CONSTRAINT `bank_user_id` FOREIGN KEY (`bank_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `value` decimal(10,2) NOT NULL,
  `method` varchar(45) NOT NULL,
  `installments` int DEFAULT NULL,
  `flow` varchar(45) NOT NULL,
  `date` date NOT NULL,
  `user_id` int NOT NULL,
  `bank_id` int NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `bank_id_idx` (`bank_id`),
  CONSTRAINT `bank_id` FOREIGN KEY (`bank_id`) REFERENCES `user_banks` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELIMITER $$
CREATE PROCEDURE `get_user_invoices`(IN userId INT)
BEGIN
  SELECT 
    ui.*, 
    ub.label as bank_label,
    ub.color as bank_color,
    ub.icon as bank_icon,
	ub.invoice_closing_day as bank_closing_day
  FROM 
    gestorfinancas.user_invoices ui
  INNER JOIN 
    gestorfinancas.user_banks ub ON ui.bank_id = ub.id
  WHERE 
    ui.user_id = userId;
END$$
DELIMITER ;
