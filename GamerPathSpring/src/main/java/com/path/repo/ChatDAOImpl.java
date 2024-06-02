package com.path.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.path.model.Chatbox;
import com.path.model.Message;
import com.path.model.Post;
import com.path.model.User;

@Repository
public class ChatDAOImpl implements ChatDAO{
	
	@Autowired
	private MongoTemplate mongo;
	
	@Autowired
	@Lazy
	private UserDAO userdao;
	
	@Override
	public Chatbox create(Chatbox c) {
		return mongo.insert(c);
	}

	@Override
	public Chatbox find(String id) {
		return mongo.find(new Query(Criteria.where("id").is(id)), Chatbox.class).get(0);
	}

	@Override
	public Chatbox addmessage(String id, Message m) {
		Chatbox c = find(id);
		c.setMessages(m);
		return mongo.save(c);
	}

	@Override
	public List<Message> getmessages(String id) {
		Chatbox c = find(id);
		return c.getMessages();	
	}
	
	@Override
	public Message findmessage(String id) {
		return mongo.find(new Query(Criteria.where("id").is(id)), Message.class).get(0);
	}

	@Override
	public List<Message> newmessage(String userid, String friendid, String messageinfo) {
		Message m= new Message();
		m.setMessageinfo(messageinfo);
		m.setUserid(userid);
		User u = userdao.find(userid);
		m.setGamertag(u.getGamertag());
		mongo.insert(m);
		User friend = userdao.find(friendid);
		friend.setReceivedmessages(u.getId(),u.getGamertag());
		mongo.save(friend);
		String chatid = userdao.getchatid(userid, friendid);
		addmessage(chatid, m);
		return getmessages(chatid);
	}

	
	
	
}
