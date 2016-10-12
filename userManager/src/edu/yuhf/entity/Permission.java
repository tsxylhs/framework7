package edu.yuhf.entity;

import java.io.Serializable;

public class Permission implements Serializable{

	private static final long serialVersionUID = -3415127011699140009L;
	private int id;
	private String name;
	private String url;
	private String remark;
	
	public Permission(){}
	
	public Permission(int id, String name, String url, String remark) {
		super();
		this.id = id;
		this.name = name;
		this.url = url;
		this.remark = remark;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
