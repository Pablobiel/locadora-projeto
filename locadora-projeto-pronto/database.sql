
CREATE DATABASE IF NOT EXISTS locadora CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE locadora;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT,
  cnh VARCHAR(20) UNIQUE,
  endereco VARCHAR(200),
  telefone VARCHAR(20)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT,
  endereco VARCHAR(200),
  telefone VARCHAR(20),
  salario DECIMAL(10,2) NOT NULL CHECK (salario >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS carros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  modelo VARCHAR(100),
  marca VARCHAR(100),
  valor_hora DECIMAL(10,2) NOT NULL CHECK (valor_hora >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS aluguel (
  id_aluguel INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  nome_cliente VARCHAR(100) NOT NULL,
  id_funcionario INT NOT NULL,
  nome_funcionario VARCHAR(100) NOT NULL,
  id_carro INT NOT NULL,
  nome_carro VARCHAR(100) NOT NULL,
  horas INT NOT NULL CHECK (horas > 0),
  valor_hora_total DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_aluguel_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_aluguel_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_aluguel_carro FOREIGN KEY (id_carro) REFERENCES carros(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Dados de exemplo
INSERT INTO clientes (nome, idade, cnh, endereco, telefone) VALUES
 ('Ana Silva', 28, '1234567890', 'Rua A, 100', '(11) 99999-1111'),
 ('Bruno Lima', 35, '2345678901', 'Rua B, 200', '(11) 99999-2222')
ON DUPLICATE KEY UPDATE nome=VALUES(nome);

INSERT INTO funcionarios (nome, idade, endereco, telefone, salario) VALUES
 ('Carlos Souza', 30, 'Av. Central, 300', '(11) 98888-3333', 3500.00),
 ('Daniela Alves', 26, 'Av. Norte, 400', '(11) 97777-4444', 3200.00)
ON DUPLICATE KEY UPDATE nome=VALUES(nome);

INSERT INTO carros (nome, modelo, marca, valor_hora) VALUES
 ('Carro 1', 'Onix', 'Chevrolet', 25.00),
 ('Carro 2', 'HB20', 'Hyundai', 28.50)
ON DUPLICATE KEY UPDATE nome=VALUES(nome);
