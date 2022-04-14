CREATE DATABASE RestaurantManagementSystemDB

use RestaurantManagementSystemDB

create table roles(
r_id tinyint not null identity primary key,
r_name varchar(50) not null
)

insert into roles values
('Manager')
insert into roles values
('Waiter')

select *from roles

create table employee(
e_id int not null identity primary key,
e_name varchar(50) not null,
e_username varchar(50) not null unique,
e_password varchar(50) not null,
e_phone varchar(15) not null,
e_address varchar(50) not null,
DateOfJoining date,
e_roleID tinyint not null foreign key references roles(r_id) on delete no action on update no action
)

insert into employee values
('Arlind Berisha', 'arlind', 'arlind123', '044271270', 'Peje', '2022-04-10', 1)

select * from employee