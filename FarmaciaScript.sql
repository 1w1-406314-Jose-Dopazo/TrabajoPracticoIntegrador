use master
go

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
    id int identity primary key,
    estado bit not null,
    nombre varchar(100) not null,
    descripcion varchar(255) null
);

create table Clientes 
(
id int identity primary key,
nombre varchar(100) not null,
apellido varchar(100) not null,
telefono varchar(15)
)

create table Facturas 
(
id int identity primary key,
id_cliente int null,
constraint fk_facturas_clientes foreign key (id_cliente) references Clientes(id),
fecha datetime not null
)

create table Detalles_Facturas 
(
id int identity primary key,
id_medicamento int not null,
constraint FK_detallesFacturas_medicamentos foreign key (id_medicamento) references Medicamentos (id),
id_factura int not null,
constraint FK_detallesFacturas_facturas foreign key (id_factura) references Facturas (id),
cantidad int not null,
precio_unitario decimal(10,2) not null
)

CREATE TABLE Tipos_Usuarios
(
id int identity primary key,
descripcion varchar (255) not null
)

CREATE TABLE Usuarios
(
id int identity primary key,
usuario varchar (100) not null,
contraseña varchar (100) not null,
id_tipo_usuario int not null,
CONSTRAINT fk_usuarios_tiposUsuarios FOREIGN KEY (id_tipo_usuario) REFERENCES Tipos_Usuarios (id)
)

