package com.path.model;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Generated;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
public class Admin {
	
	@Id
	@Generated(value = "com.acme.generator.CodeGen")
	
private String id;
	List<String> RpostId =new LinkedList<>();
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<String> getRpostId() {
		return RpostId;
	}
	public void setRpostId(String id) {
		RpostId.add(id);
	}

	public Admin() {
		super();
	}	

}
