package com.path.repo;

import java.util.List;

import com.path.model.Admin;
import com.path.model.Post;

public interface AdminDAO {
	
	public boolean gRpostId(String ids);
	public Admin admin() ;
	public Post find(String id);
	public List<Post> vpost();
	public boolean report(String id);

}
