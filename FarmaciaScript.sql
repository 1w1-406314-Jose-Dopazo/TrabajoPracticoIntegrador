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

create table Medicamentos 
(
id int,
constraint PK_Suministro primary key (id),
estado bit,
nombre varchar(100),
descripcion varchar(255)
)

create table Clientes 
(
id int,
constraint PK_Cliente primary key (id),
nombre varchar(100),
apellido varchar(100),
telefono int
)

create table Facturas 
(
id int,
constraint PK_Factura primary key (id),
id_cliente int,
constraint FK_Cliente foreign key (id_cliente) references Clientes(id),
fecha datetime
)

create table Detalles_Facturas 
(
id int,
constraint PK_Detalle primary key (id),
id_medicamento int,
constraint FK_Medicamento foreign key (id_medicamento) references Medicamentos (id),
id_factura int,
constraint FK_Factura foreign key (id_factura) references Facturas (id),
cantidad int,precio_unitario decimal(10,2)
)

CREATE TABLE Tipos_Usuarios
(
id int,
descripcion varchar (255),
CONSTRAINT PK_Tipo_Usuario PRIMARY KEY (id)
)

CREATE TABLE Usuarios
(
id int,
CONSTRAINT PK_Usuario PRIMARY KEY (id),
usuario varchar (100),
contraseña varchar (100) ,
id_tipo_usuario int,
CONSTRAINT FK_Tipo_Usuario FOREIGN KEY (id_tipo_usuario) REFERENCES Tipos_Usuarios (id)
)

