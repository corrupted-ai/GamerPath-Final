package com.path.repo;

import java.util.List;

import com.path.model.Reply;

public interface ReplyDAO {
	public Reply create(Reply r);
	public Reply find(String id);
	public List<Reply> findrepliesbyids(List<String> ids);
	public List<Reply> popularreplies(List<String> ids);
	public boolean upvotereply(String userid, String rid);
	public boolean downvotereply(String userid, String rid);
	public boolean addimagetoreply(String rid,String imageid);
}
