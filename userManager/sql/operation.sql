select u.id,ur.userId from users u inner join user_role ur on u.id=ur.userId
--已经用户id，获取取对应的权限。
select u.name,p.url from users u inner join user_role ur on u.id=ur.userId inner join role_permission rp on ur.roleId=rp.roleId inner join permission p on rp.permissionId=p.id where u.id=2