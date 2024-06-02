package com.path.model;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Generated;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chats")
public class Chatbox {
	
	@Id
	@Generated(value = "com.acme.generator.CodeGen")
	private String id;
	
	List<Message> messages = new LinkedList<>();

	public Chatbox() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(Message message) {
		this.messages.add(message);
	}
	

}
