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

import com.path.model.Post;
import com.path.model.Reply;

@Repository
public class PostDAOImpl implements PostDAO{
	
	@Autowired
	private MongoTemplate mongo;
	
	@Autowired
	private ReplyDAO replydao;
	
	@Autowired
	@Lazy
	private UserDAO userdao;
	
	@Override
	public Post createpost(Post p) {
		return mongo.insert(p);
	}

	@Override
	public Post find(String id) {
		return mongo.find(new Query(Criteria.where("id").is(id)), Post.class).get(0);
	}

	@Override
	public List<Reply> getreplies(String id) {
		List<String> rids = find(id).getReplies();
		return replydao.findrepliesbyids(rids);
	}
	
	@Override
	public List<Reply> getpopularreplies(String id) {
		List<String> rids = find(id).getReplies();
		return replydao.popularreplies(rids);
	}

	@Override
	public Post addreply(String id, String rid) {
		Post p = find(id);
		p.setReplies(rid);	
		return mongo.save(p);
	}

	@Override
	public List<Post> getallposts() {
		return mongo.findAll(Post.class);
	}

	@Override
	public List<Post> getpopularposts() {
		List<Post> p= mongo.findAll(Post.class);
		Collections.sort(p, new Comparator<Post>() {

			@Override
			public int compare(Post o1, Post o2) {
				return o2.getScore()-o1.getScore();
			}
		});
		return p;
	}

	@Override
	public List<Post> getnewposts() {
		List<Post> p= mongo.findAll(Post.class);
		Collections.reverse(p);
		return p;
	}

	@Override
	public List<Post> getpostsbyids(List<String> ids) {
		List<Post> p = new LinkedList<>();
		for(String id:ids) {
			p.add(find(id));
		}
		Collections.reverse(p);
		return p;
	}

	@Override
	public List<Post> getpopularpostsbyids(List<String> ids) {
		List<Post> p = new LinkedList<>();
		for(String id:ids) {
			p.add(find(id));
		}
		Collections.sort(p, new Comparator<Post>() {
			@Override
			public int compare(Post o1, Post o2) {
				return o2.getScore()-o1.getScore();
			}
		});
		return p;
	}

	@Override
	public boolean upvotepost(String userid, String pid) {
		int i=0;
		boolean flag = false;
		Post p= find(pid);
		if(p.getDownvoted().contains(userid)) {p.getDownvoted().remove(userid);p.setScore(p.getScore()+1);}
		loop:
		for(String id:p.getUpvoted()) {
			if(id.equals(userid)) {flag = true; break loop;}
			i++;
		}
		if(flag) {p.getUpvoted().remove(i);p.setScore(p.getScore()-1);}
		else {p.setUpvoted(userid);p.setScore(p.getScore()+1);}
		mongo.save(p);
		userdao.calculatescore(p.getUserid());
		return true;
	}

	@Override
	public boolean downvotepost(String userid, String pid) {
		int i=0;
		boolean flag = false;
		Post p= find(pid);
		if(p.getUpvoted().contains(userid)) {p.getUpvoted().remove(userid);p.setScore(p.getScore()-1);}
		loop:
		for(String id:p.getDownvoted()) {
			if(id.equals(userid)) {flag = true; break loop;}
			i++;
		}
		if(flag) {p.getDownvoted().remove(i);p.setScore(p.getScore()+1);}
		else {p.setDownvoted(userid);p.setScore(p.getScore()-1);}
		mongo.save(p);
		userdao.calculatescore(p.getUserid());
		return true;
	}

	@Override
	public boolean addimagetopost(String pid, String imageid) {
		Post p = find(pid);
		p.setImage(imageid);
		mongo.save(p);
		return true;
	}
	
	@Override
	public List<Post> searchFn(String text) {
		List<Post> posts = mongo.findAll(Post.class);
		List<Post> newPosts = new LinkedList<>();
		for(Post p: posts) {
			if(p.getPostinfo().toLowerCase().contains(text.toLowerCase()) ) {
				newPosts.add(p);
			}
		}
		for(Post p: posts) {
			for(String tags: p.getTags()) {
				if(tags.toLowerCase().contains(text.toLowerCase())) {
					if(!newPosts.contains(p)) {
						newPosts.add(p);
					}
				}
			}
		}
		return newPosts;
	}
	@Override
	public List<Post> searchCat(String text) {
		List<Post> posts = mongo.findAll(Post.class);
		List<Post> newPosts = new LinkedList<>();
		for(Post p: posts) {
			for(String tags: p.getTags()) {
				if(tags.toLowerCase().contains(text.toLowerCase())) {
					if(!newPosts.contains(p)) {
						newPosts.add(p);
					}
				}
			}
		}
		return newPosts;
	}

	
	
}
