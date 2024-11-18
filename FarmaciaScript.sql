use master
go

-- Descomentar estas lineas para reescribir la base de datos existente

alter database Farmacia set single_user with rollback immediate
go
drop database Farmacia
go

CREATE DATABASE Farmacia
go

use Farmacia
go

CREATE TABLE Medicamentos 
(
    id int primary key identity(1,1),
    estado bit not null,
    nombre varchar(100) not null,
    descripcion varchar(255) null,
	precio_unitario decimal(10,2) not null
);

INSERT INTO Medicamentos (estado, nombre, descripcion, precio_unitario)
VALUES 
(1, 'Paracetamol', 'Analgésico y antipirético utilizado para tratar el dolor y la fiebre', 50.75),
(1, 'Ibuprofeno', 'Medicamento antiinflamatorio no esteroideo, usado para el dolor e inflamación', 75.50),
(1, 'Amoxicilina', 'Antibiótico utilizado para tratar diversas infecciones bacterianas', 120.00),
(1, 'Salbutamol', 'Broncodilatador para el tratamiento del asma y otras enfermedades respiratorias', 90.25),
(1, 'Ranitidina', 'Medicamento para reducir la acidez estomacal y tratar úlceras gástricas', 60.80);

create table Clientes 
(
id int primary key identity(1,1),
nombre varchar(100) not null,
apellido varchar(100) not null,
telefono varchar(15) null
)

INSERT INTO Clientes (nombre, apellido, telefono)
VALUES 
('Juan', 'Pérez', null),
('María', 'González', '3417654321'),
('Carlos', 'Rodríguez', null),
('Ana', 'López', '3416549873'),
('Lucía', 'Martínez', null),
('Sofía', 'Fernández', null),
('Pedro', 'García', '3414567890'),
('Martín', 'Sánchez', null),
('Laura', 'Ramírez', '3417890123'),
('José', 'Torres', NULL);

create table Facturas 
(
id int primary key identity(1,1),
id_cliente int null,
constraint fk_facturas_clientes foreign key (id_cliente) references Clientes(id),
fecha datetime not null
)

INSERT INTO Facturas (id_cliente, fecha)
VALUES 
(1, GETDATE()),
(3, GETDATE() - 1),
(5, GETDATE() - 2),
(7, GETDATE() - 3),
(9, GETDATE() - 4);

create table Detalles_Facturas 
(
id int primary key identity(1,1),
id_medicamento int not null,
constraint FK_detallesFacturas_medicamentos foreign key (id_medicamento) references Medicamentos (id),
id_factura int not null,
constraint FK_detallesFacturas_facturas foreign key (id_factura) references Facturas (id),
cantidad int not null,
precio_unitario decimal(10,2) not null
)

-- Detalles para la factura 1
INSERT INTO Detalles_Facturas (id_medicamento, id_factura, cantidad, precio_unitario)
VALUES 
(1, 1, 2, 50.75),
(2, 1, 1, 75.50),
(3, 1, 3, 120.00);

-- Detalles para la factura 2
INSERT INTO Detalles_Facturas (id_medicamento, id_factura, cantidad, precio_unitario)
VALUES 
(4, 2, 1, 90.25),
(5, 2, 2, 60.80);

-- Detalles para la factura 3
INSERT INTO Detalles_Facturas (id_medicamento, id_factura, cantidad, precio_unitario)
VALUES 
(1, 3, 1, 50.75),
(3, 3, 2, 120.00),
(5, 3, 1, 60.80),
(2, 3, 3, 75.50);

-- Detalles para la factura 4
INSERT INTO Detalles_Facturas (id_medicamento, id_factura, cantidad, precio_unitario)
VALUES 
(4, 4, 2, 90.25),
(3, 4, 1, 120.00);

-- Detalles para la factura 5
INSERT INTO Detalles_Facturas (id_medicamento, id_factura, cantidad, precio_unitario)
VALUES 
(2, 5, 2, 75.50),
(5, 5, 4, 60.80),
(1, 5, 3, 50.75),
(3, 5, 1, 120.00),
(4, 5, 1, 90.25);

CREATE TABLE Tipos_Usuario
(
id int primary key identity(1,1),
nombre varchar(100) not null,
descripcion varchar (100) not null
)

INSERT INTO Tipos_Usuario(nombre, descripcion)
VALUES
('Administrador', 'Tiene acceso a gestionar los medicamentos y usuarios'),
('Vendedor', 'Tiene acceso a gestionar las ventas y clientes')

CREATE TABLE Usuarios
(
id int primary key identity(1,1),
nombre varchar (100) not null,
email varchar (50) not null,
contraseña varchar (100) not null,
id_tipo_usuario int not null,
CONSTRAINT fk_usuarios_tiposUsuario FOREIGN KEY (id_tipo_usuario) REFERENCES Tipos_Usuario (id)
)

INSERT INTO Usuarios(nombre, email, contraseña, id_tipo_usuario)
VALUES
('administrador', 'administrador@gmail.com', 'administrador', 1),
('vendedor', 'vendedor@gmail.com', 'vendedor', 2)