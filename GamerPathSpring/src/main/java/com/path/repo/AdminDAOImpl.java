package com.path.repo;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.path.model.Post;
import com.path.model.User;
import com.path.model.Admin;
@Repository
public class AdminDAOImpl implements AdminDAO {
	
	@Autowired
	private MongoTemplate mongo;

	@Autowired
	private PostDAO postdao;
	
	@Autowired
	private UserDAO userdao;
	
	
	Admin a = new Admin();

	@Override
	public Admin admin() {
		return mongo.insert(a);
	}

	@Override
	public Post find(String id) {
		return mongo.find(new Query(Criteria.where("id").is(id)), Post.class).get(0);
	}

	

	@Override
	public boolean gRpostId(String id) {
		Admin main=mongo.findAll(Admin.class).get(0);
		Post u = find(id);
		a.setRpostId(u.getId());

		mongo.save(a);
		return true;
	}

	@Override
	public List<Post> vpost() {
		List<Post> p = new LinkedList<>();
		Admin main=mongo.findAll(Admin.class).get(0);
		for (String id : main.getRpostId()) {
			p.add(find(id));
		}
		return p;
	}
	

	@Override
	public boolean report(String id) {
		// TODO Auto-generated method stub
		System.out.println("entering this function");
		Post p = find(id);
		String uId = p.getUserid();
		mongo.remove(p);
		User u = userdao.find(uId);
		u.getPosts().remove(id);
		mongo.save(u);
		Admin main=mongo.findAll(Admin.class).get(0);
		main.getRpostId().remove(id);
		mongo.save(main);

		return true;
	}


}
