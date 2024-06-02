package com.path.model;

import javax.annotation.Generated;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class Image {
	
	@Id
	@Generated(value = "com.acme.generator.CodeGen")
    private String id;
         
    private Binary img;
    private String imagestring;
    
	public Image() {
		super();
	}

	public String getImagestring() {
		return imagestring;
	}

	public void setImagestring(String imagestring) {
		this.imagestring = imagestring;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public Binary getPicture() {
		return img;
	}

	public void setPicture(Binary img) {
		this.img = img;
	}
    
    
}
