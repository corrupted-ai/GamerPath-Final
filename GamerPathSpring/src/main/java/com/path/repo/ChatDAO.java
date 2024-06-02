package com.path.repo;

import java.util.List;

import com.path.model.Chatbox;
import com.path.model.Message;

public interface ChatDAO {
	public Chatbox create(Chatbox c);
	public Chatbox find(String id);
	public Chatbox addmessage(String id,Message m);
	public List<Message> getmessages(String id);
	public List<Message> newmessage(String userid, String friendid, String messageinfo);
	public Message findmessage(String id);
}
