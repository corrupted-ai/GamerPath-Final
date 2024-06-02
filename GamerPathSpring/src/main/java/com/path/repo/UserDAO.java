package com.path.repo;

import java.util.List;
import java.util.Map;

import com.path.model.Post;
import com.path.model.User;

public interface UserDAO {
	public User create(User u);
	public User find(String id);
	public List<User> findgamer(String gamertag);
	public List<User> topten();
	public List<Post> userposts(String id);
	public List<Post> userpopularposts(String id);
	public User addposttouser(String id, String pid);
	public User addreplytouser(String id, String rid);
	public List<User> getusersbyids(List<String> ids);
	public boolean validateemail(String email);
	public boolean validateuser(String email,String password);
	public User findbyemail(String email);
	public boolean calculatescore(String id);
	public void addSentId(String email,String Id);
	public User approval(String idOne,String idTwo);
	public boolean addimagetouser(String uid,String imageid);
	public User decline(String idOne,String idTwo);
	public String getchatid(String user1,String user2);
	public User removefriend(String idOne,String idTwo);
	public Map<String,String> chatnotification(String id);
	public boolean removenotification(String userid,String friendid);
}
