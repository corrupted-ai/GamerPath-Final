package com.path.repo;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.path.model.Chatbox;
import com.path.model.Post;
import com.path.model.Reply;
import com.path.model.User;

@Repository
public class UserDAOImpl implements UserDAO{
	
	@Autowired
	private MongoTemplate mongo;
	
	@Autowired
	private PostDAO postdao;
	
	@Autowired
	private ReplyDAO replydao;
	
	@Autowired
	private ChatDAO chatdao;
	
	@Override
	public User create(User u) {
		return mongo.insert(u);
	}

	@Override
	public User find(String id) {
		return mongo.find(new Query(Criteria.where("id").is(id)), User.class).get(0);
	}

	@Override
	public List<User> findgamer(String gamertag) {
		List<User> users = new LinkedList();
		List<User> allusers= mongo.findAll(User.class);
		for(User u : allusers) {
			if(u.getGamertag().contains(gamertag)) {
				users.add(u);
			}
		}
		return users;
	}

	@Override
	public List<User> topten() {
		List<User> top = mongo.findAll(User.class);
		Collections.sort(top);
		List<User> topten = new LinkedList<>();
		if(top.size()<10) {return top;}
		for(int i=0;i<10;i++) {topten.add(top.get(i));}
		return topten;
	}

	@Override
	public List<Post> userposts(String id) {
		User u = find(id);
		return postdao.getpostsbyids(u.getPosts());
	}

	@Override
	public User addposttouser(String id, String pid) {
		User u = find(id);
		u.setPosts(pid);
		return mongo.save(u);
	}

	@Override
	public List<User> getusersbyids(List<String> ids) {
		List<User> u =new LinkedList<>();
		for(String id:ids) {
			User s = find(id);
			u.add(s);
		}
		return u;
	}

	@Override
	public boolean validateemail(String email) {
		List<User> all = mongo.findAll(User.class);
		for(User u:all) {
			if (u.getEmail().equalsIgnoreCase(email)){
				return false;
			}
		}
		return true;
	}

	@Override
	public boolean validateuser(String email, String password) {
		List<User> all = mongo.findAll(User.class);
		for(User u:all) {
			if (u.getEmail().equalsIgnoreCase(email) && u.getPassword().equals(password)){
				return true;
			}
		}
		return false;
	}

	@Override
	public User findbyemail(String email) {
		User u= mongo.find(new Query(Criteria.where("email").is(email)), User.class).get(0);
		return u;
	}

	@Override
	public List<Post> userpopularposts(String id) {
		User u = find(id);
		return postdao.getpopularpostsbyids(u.getPosts());
	}

	@Override
	public User addreplytouser(String id, String rid) {
		User u = find(id);
		u.setReplies(rid);
		return mongo.save(u);
	}

	@Override
	public boolean calculatescore(String id) {
		User u =this.find(id);
		int score = 0 ; 
		List<Post> posts = postdao.getpostsbyids(u.getPosts());
		List<Reply> replies = replydao.findrepliesbyids(u.getReplies());
		for(Post p:posts) {
			score=score+p.getScore()*3;
		}
		for(Reply r:replies) {
			score=score+r.getScore()*2;
		}
		u.setScore(score);
		mongo.save(u);
		return true;
	}
	
	@Override
	public void addSentId(String email, String Id) {
		Query q = new Query();
		q.addCriteria(Criteria.where("email").is(email));
		User uOne = mongo.find(q, User.class).get(0);	
		uOne.setSent(Id);
		mongo.save(uOne);
		Query q2 = new Query();
		q2.addCriteria(Criteria.where("id").is(Id));
		User uTwo = mongo.find(q2, User.class).get(0);
		uTwo.setReceive(uOne.getId());
		mongo.save(uTwo);
		
	}

	@Override
	public User approval(String idOne, String idTwo) {
		
		User uOne = find(idOne);
		uOne.getReceive().remove(idTwo);
		if(!uOne.getFriends().contains(idTwo)){uOne.setFriends(idTwo);}
		mongo.save(uOne);
		User uTwo = find(idTwo);
		uTwo.getSent().remove(idOne);
		if(!uTwo.getFriends().contains(idOne)){uTwo.setFriends(idOne);}
		mongo.save(uTwo);
		return uOne;
	}

	@Override
	public boolean addimagetouser(String uid, String imageid) {
		User u = find(uid);
		u.setImage(imageid);
		mongo.save(u);
		return true;
	}
	@Override
	public User decline(String idOne, String idTwo) {
		User uOne = find(idOne);
		uOne.getReceive().remove(idTwo);
		mongo.save(uOne);
		User uTwo = find(idTwo);
		uTwo.getSent().remove(idOne);
		mongo.save(uTwo);
		return uOne;
	}

	@Override
	public String getchatid(String user1, String user2) {
		User u1 = find(user1);
		User u2 = find(user2);
		
		if(u1.getChats().containsKey(user2)){
			System.out.println("executed");
			return u1.getChats().get(user2);
		}
		else {
			Chatbox c = new Chatbox();
			chatdao.create(c);
			u1.getChats().put(user2, c.getId());
			u2.getChats().put(user1, c.getId());
			mongo.save(u1);
			mongo.save(u2);
			return c.getId();
		}
	}
	@Override
	public User removefriend(String idOne, String idTwo) {
		User uOne = find(idOne);
		uOne.getFriends().remove(idTwo);
		mongo.save(uOne);
		User uTwo = find(idTwo);
		uTwo.getFriends().remove(idOne);
		mongo.save(uTwo);
		return uOne;
	}

	@Override
	public Map<String, String> chatnotification(String id) {
		User u=find(id);
		return u.getReceivedmessages();
	}

	@Override
	public boolean removenotification(String userid, String friendid) {
		User u=find(userid);
		u.getReceivedmessages().remove(friendid);
		mongo.save(u);
		return true;
	}
}
