package edu.yuhf.dao.iface;

import java.util.List;

import edu.yuhf.entity.Page;
import edu.yuhf.entity.User;

public interface UserDao {
	public List<User> queryAll();
	public boolean loginCheck(String userName,String password);
	public User loginCheck(String userName, String password,boolean flag);	
	public User addUser(User user);
	public boolean delete(String ids);
	public User queryById(String id);
	public boolean queryByName(String name);
	public boolean update(User user);
	
	public void queryByPage(Page<User> page);
	public void getTotalRow(Page<User> page);
}
