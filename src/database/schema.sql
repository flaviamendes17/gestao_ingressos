CREATE DATABASE ingressos_db;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    nome_evento VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    local_evento VARCHAR(255) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    quantidade_ingressos INT NOT NULL
);

INSERT INTO ingressos (nome_evento, data_evento, local_evento, preco, categoria, quantidade_ingressos) VALUES 
('Shawn Mendes', '2025-03-29', 'Autódromo de interlagos', 100.00, 'Pista', 5000),
('Shawn Mendes', '2025-03-29', 'Autódromo de interlagos', 200.00, 'Pista VIP', 200),
('Shawn Mendes', '2025-03-29', 'Autódromo de interlagos', 300.00, 'Camarote', 100),
('Shawn Mendes', '2025-03-29', 'Autódromo de interlagos', 80.00, 'Arquibancada', 0);
