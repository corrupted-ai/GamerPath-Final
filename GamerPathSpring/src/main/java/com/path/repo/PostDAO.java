package com.path.repo;

import java.util.List;

import com.path.model.Post;
import com.path.model.Reply;

public interface PostDAO {
	public Post createpost(Post p);
	public Post find(String id);
	public List<Reply> getreplies(String id);
	public List<Reply> getpopularreplies(String id);
	public Post addreply(String id, String rid);
	public List<Post> getallposts();
	public List<Post> getpopularposts();
	public List<Post> getnewposts();
	public List<Post> getpostsbyids(List<String> ids);
	public List<Post> getpopularpostsbyids(List<String> ids);
	public boolean upvotepost(String userid,String pid);
	public boolean downvotepost(String userid,String pid);
	public boolean addimagetopost(String pid,String imageid);
	public List<Post> searchFn(String text);
	public List<Post> searchCat(String text);
}
