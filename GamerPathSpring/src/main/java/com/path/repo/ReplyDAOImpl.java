package com.path.repo;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import com.path.model.Reply;
import com.path.model.*;

@Repository
public class ReplyDAOImpl implements ReplyDAO{
	
	@Autowired
	private MongoTemplate mongo;
	
	@Autowired
	@Lazy
	private UserDAO userdao;
	
	@Override
	public Reply create(Reply r) {
		return mongo.insert(r);
	}

	@Override
	public List<Reply> findrepliesbyids(List<String> ids) {
		List<Reply> r = new LinkedList<>();
		for(String id:ids) {
			r.add(find(id));
		}
		Collections.sort(r);
		return r;
	}

	@Override
	public Reply find(String id) {
		return mongo.find(new Query(Criteria.where("id").is(id)), Reply.class).get(0);
	}

	@Override
	public List<Reply> popularreplies(List<String> ids) {
		List<Reply> r = new LinkedList<>();
		for(String id:ids) {
			r.add(find(id));
		}
		Collections.sort(r, new Comparator<Reply>() {

			@Override
			public int compare(Reply o1, Reply o2) {
				return o2.getScore()-o1.getScore();
			}
		});
		return r;
		
	}
	
	@Override
	public boolean upvotereply(String userid, String rid) {
		int i=0;
		boolean flag = false;
		Reply r= find(rid);
		if(r.getDownvoted().contains(userid)) {r.getDownvoted().remove(userid);r.setScore(r.getScore()+1);}
		loop:
		for(String id:r.getUpvoted()) {
			if(id.equals(userid)) {flag = true; break loop;}
			i++;
		}
		if(flag) {r.getUpvoted().remove(i);r.setScore(r.getScore()-1);}
		else {r.setUpvoted(userid);r.setScore(r.getScore()+1);}
		mongo.save(r);
		userdao.calculatescore(r.getUserid());
		return true;
	}

	@Override
	public boolean downvotereply(String userid, String rid) {
		int i=0;
		boolean flag = false;
		Reply r= find(rid);
		if(r.getUpvoted().contains(userid)) {r.getUpvoted().remove(userid);r.setScore(r.getScore()-1);}
		loop:
		for(String id:r.getDownvoted()) {
			if(id.equals(userid)) {flag = true; break loop;}
			i++;
		}
		if(flag) {r.getDownvoted().remove(i);r.setScore(r.getScore()+1);}
		else {r.setDownvoted(userid);r.setScore(r.getScore()-1);}
		mongo.save(r);
		userdao.calculatescore(r.getUserid());
		return true;
	}

	@Override
	public boolean addimagetoreply(String rid, String imageid) {
		Reply r = find(rid);
		r.setImage(imageid);
		mongo.save(r);
		return true;
	}
	
	

}
