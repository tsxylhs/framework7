create tablespace usermanager
datafile ''
size 100m;
commit;
create user um identified by um default tablespace usermanager;
commit;
grant connect,resource to um;
connect um/um;

create table users(
  id number(10) primary key,
  name varchar2(50),
  password varchar2(50),
  telephone varchar2(50)
);
create sequence user_id start with 1 increment by 1 minvalue 1 cache 10;
create table role(
  id number(10) primary key,
  name varchar2(50),
  remark varchar2(100)
);
create sequence role_id start with 1 increment by 1 minvalue 1 cache 10;
create table permission(
  id number(10) primary key,
  name varchar2(50),
  url varchar2(200),
  remark varchar2(50)
);
create sequence permission_id start with 1 increment by 1 minvalue 1 cache 10;
create table user_role(
  id number(10) primary key,
  userId number(10) references users(id),
  roleId number(10) references role(id)
);
create sequence user_role_id start with 1 increment by 1 minvalue 1 cache 10;
create table role_permission(
  id number(10) primary key,
  roleId number(10) references role(id),
  permissionId number(10) references permission(id)
);
create sequence role_permission_id start with 1 increment by 1 minvalue 1 cache 10;
commit;

insert into users values(user_id.nextval,'admin','123','12345333');
insert into users values(user_id.nextval,'test','test','12343214');
insert into users values(user_id.nextval,'superman','123','12343214');
insert into users values(user_id.nextval,'superadministrator','123','12343214');
commit;
insert into role values(role_id.nextval,'管理员','这是一个测试账号');
insert into role values(role_id.nextval,'普通用户','这也是一个测试账号');
commit;
insert into permission values(permission_id.nextval,'用户信息管理','user.servlet?param=init','权限管理模块');
insert into permission values(permission_id.nextval,'角色信息管理','role.servlet?param=init','权限管理模块');
insert into permission values(permission_id.nextval,'权限信息管理','permission.servlet?param=init','权限管理模块');
commit;