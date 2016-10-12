package edu.yuhf.entity;

public class User {

	private int id;
	private String name;
	private String password;
	private String telephone;
	
	public User(){}
	
	public User(int id, String name, String password, String telephone) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.telephone = telephone;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	
}
