package com.path.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.path.model.Image;
import com.path.model.Message;
import com.path.model.Post;
import com.path.model.Reply;
import com.path.model.User;
import com.path.repo.AdminDAO;
import com.path.repo.ChatDAO;
import com.path.repo.Imageservice;
import com.path.repo.PostDAO;
import com.path.repo.ReplyDAO;
import com.path.repo.UserDAO;

@CrossOrigin
@RestController
public class Pathcontroller {
	@Autowired
	private PostDAO postdao;

	@Autowired
	private ReplyDAO replydao;

	@Autowired
	private UserDAO userdao;

	@Autowired
	private Imageservice imageservice;

	@Autowired
	private ChatDAO chatdao;
	
	@Autowired
	private AdminDAO admindao;

	@RequestMapping(value = "/posts", method = RequestMethod.GET, produces = "application/json")
	public List<Post> getallposts() {
		return postdao.getnewposts();
	}

	@RequestMapping(value = "/posts/popular", method = RequestMethod.GET, produces = "application/json")
	public List<Post> getpopularposts() {
		return postdao.getpopularposts();
	}

	@RequestMapping(value = "/post/{id}/replys", method = RequestMethod.GET, produces = "application/json")
	public List<Reply> getreplys(@PathVariable("id") String id) {
		return postdao.getreplies(id);
	}

	@RequestMapping(value = "/post/{id}/popularreplys", method = RequestMethod.GET, produces = "application/json")
	public List<Reply> getpopularreplys(@PathVariable("id") String id) {
		return postdao.getpopularreplies(id);
	}

	@RequestMapping(value = "/post/{id}", method = RequestMethod.GET, produces = "application/json")
	public Post getpost(@PathVariable("id") String id) {
		return postdao.find(id);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = "application/json")
	public User getuser(@PathVariable("id") String id) {
		return userdao.find(id);
	}

	@RequestMapping(value = "/users/search/{gamertag}", method = RequestMethod.GET, produces = "application/json")
	public List<User> findgamers(@PathVariable("gamertag") String gamertag) {
		return userdao.findgamer(gamertag);
	}

	@RequestMapping(value = "/users/top", method = RequestMethod.GET, produces = "application/json")
	public List<User> findtop() {
		return userdao.topten();
	}

	@RequestMapping(value = "/user/{id}/posts", method = RequestMethod.GET, produces = "application/json")
	public List<Post> userposts(@PathVariable("id") String id) {
		return userdao.userposts(id);
	}

	@RequestMapping(value = "/user/{id}/popularposts", method = RequestMethod.GET, produces = "application/json")
	public List<Post> userpopularposts(@PathVariable("id") String id) {
		return userdao.userpopularposts(id);
	}

	@RequestMapping(value = "/loginuser/{email}", method = RequestMethod.GET, produces = "application/json")
	public User loginuser(@PathVariable("email") String email) {
		return userdao.findbyemail(email);
	}

	@RequestMapping(value = "/loginuseremail/{email}", method = RequestMethod.GET, produces = "application/json")
	public boolean emailcheck(@PathVariable("email") String email) {
		return userdao.validateemail(email);
	}

	@RequestMapping(value = "/friends/{email}/{Id}", method = RequestMethod.GET, produces = "application/json")
	public User addSentId(@PathVariable("email") String email, @PathVariable("Id") String Id) {
		userdao.addSentId(email, Id);
		return userdao.findbyemail(email);
	}

	@RequestMapping(value = "/img/{id}", method = RequestMethod.GET, produces = "application/json")
	public Image userimg(@PathVariable("id") String imgid, Model model) {
		Image img = imageservice.getPhoto(imgid);
		return imageservice.setimagestring(img, Base64.getEncoder().encodeToString(img.getPicture().getData()));
	}

	@RequestMapping(value = "/chat/{userid}/{friendid}", method = RequestMethod.GET, produces = "application/json")
	public List<Message> getchatboxmessages(@PathVariable("userid") String userid,
			@PathVariable("friendid") String friendid) {
		String chatid = userdao.getchatid(userid, friendid);
		return chatdao.find(chatid).getMessages();
	}
	@RequestMapping(value = "/chatnotifications/{uid}", method = RequestMethod.GET, produces = "application/json")
	public Map<String,String> getchatnotifications(@PathVariable("uid") String userid) {
		return userdao.chatnotification(userid);
	}
	@RequestMapping(value = "/getgamertag/{uid}", method = RequestMethod.GET)
	public List<String> getgamertag(@PathVariable("uid") String userid) {
		User u =userdao.find(userid);
		List<String> l =new LinkedList<>();
		l.add(u.getGamertag());
		return l;
	}
	@RequestMapping(value = "/removenotification/{uid}/remove/{fid}", method = RequestMethod.GET, produces = "application/json")
	public boolean removechatnotification(@PathVariable("uid") String userid,@PathVariable("fid") String friendid) {
		return userdao.removenotification(userid, friendid);
	}
	
	

	
	
	
	
	
	
	@PostMapping(value = "/user")
	public boolean validuser(@RequestBody List<String> details) {
		return userdao.validateuser(details.get(0), details.get(1));
	}

	@PostMapping(value = "/user/{userid}/upvote/{pid}")
	public boolean upvote(@PathVariable("userid") String userid, @PathVariable("pid") String pid) {
		return postdao.upvotepost(userid, pid);
	}

	@PostMapping(value = "/user/{userid}/downvote/{pid}")
	public boolean downvote(@PathVariable("userid") String userid, @PathVariable("pid") String pid) {
		return postdao.downvotepost(userid, pid);
	}

	@PostMapping(value = "/user/new")
	public User newuser(@RequestBody User u) {
		if (userdao.validateemail(u.getEmail())) {
			return userdao.create(u);
		}
		return null;
	}

	@PostMapping(value = "user/{uid}/post/{pid}/reply/new")
	public Reply addreply(@PathVariable("uid") String uid, @PathVariable("pid") String pid, @RequestBody Reply r) {
		User u = userdao.find(uid);
		r.setGamertag(u.getGamertag());
		r.setUserid(u.getId());
		replydao.create(r);
		userdao.addreplytouser(uid, r.getId());
		postdao.addreply(pid, r.getId());
		return replydao.find(r.getId());
	}

	@PostMapping(value = "/user/{id}/post/new")
	public Post addpost(@PathVariable("id") String id, @RequestBody Post p) {
		p.setUserid(id);
		User u = userdao.find(id);
		p.setGamertag(u.getGamertag());
		postdao.createpost(p);
		userdao.addposttouser(id, p.getId());
		return postdao.find(p.getId());
	}

	@PostMapping(value = "/user/{userid}/upvotereply/{rid}")
	public boolean upvotereply(@PathVariable("userid") String userid, @PathVariable("rid") String rid) {
		return replydao.upvotereply(userid, rid);
	}

	@PostMapping(value = "/user/{userid}/downvotereply/{rid}")
	public boolean downvotereply(@PathVariable("userid") String userid, @PathVariable("rid") String rid) {
		return replydao.downvotereply(userid, rid);
	}

	@PostMapping(value = "/notifications")
	public List<User> fetchUsers(@RequestBody List<String> details) {
		return userdao.getusersbyids(details);
	}

	@PostMapping(value = "/notifications/accept")
	public User approval(@RequestBody List<String> details) {
		return userdao.approval(details.get(0), details.get(1));
	}

	@PostMapping("post/{pid}/image/add")
	public boolean addimgtopost(@PathVariable("pid") String pid, @RequestParam("image") MultipartFile image,
			Model model) throws IOException {
		String id = imageservice.addimage(image);
		return postdao.addimagetopost(pid, id);
	}

	@PostMapping("reply/{rid}/image/add")
	public boolean addimgtoreply(@PathVariable("rid") String rid, @RequestParam("image") MultipartFile image,
			Model model) throws IOException {
		String id = imageservice.addimage(image);
		return replydao.addimagetoreply(rid, id);
	}

	@PostMapping("user/{uid}/image/add")
	public boolean addimgtouser(@PathVariable("uid") String uid, @RequestParam("image") MultipartFile image,
			Model model) throws IOException {
		String id = imageservice.addimage(image);
		return userdao.addimagetouser(uid, id);
	}

	@PostMapping(value = "/notifications/decline")
	public User decline(@RequestBody List<String> details) {
		return userdao.decline(details.get(0), details.get(1));
	}

	@PostMapping(value = "/search")
	public List<Post> searchPosts(@RequestBody String text) {
		return postdao.searchFn(text);
	}

	@PostMapping(value = "/new/chat/{userid}/{friendid}/{message}")
	public List<Message> addchatboxmessages(@PathVariable("userid") String userid,
			@PathVariable("friendid") String friendid, @PathVariable("message") String message) {
		return chatdao.newmessage(userid, friendid, message);
	}

	@PostMapping(value = "/search/new")
	public List<Post> searchnewposts(@RequestBody List<String> ids) {

		return postdao.getpostsbyids(ids);
	}

	@PostMapping(value = "/search/popular")
	public List<Post> searchpopularposts(@RequestBody List<String> ids) {

		return postdao.getpopularpostsbyids(ids);
	}

	@PostMapping(value = "/category")
	public List<Post> searchCategory(@RequestBody String text) {
		return postdao.searchCat(text);
	}

	@PostMapping(value = "/friendslist")
	public List<User> friendlist(@RequestBody List<String> ids) {
		return userdao.getusersbyids(ids);
	}

	@PostMapping(value = "/remove")
	public User removefriend(@RequestBody List<String> details) {
		return userdao.removefriend(details.get(0), details.get(1));
	}

	
	
	
	
	
	

	@PostMapping(value = "/admin")
	public boolean admin(){
		admindao.admin();
		return true; 
	}
	

	@PostMapping(value = "admin/post")
	public boolean report(@RequestBody String pid) {
		
		return admindao.report(pid);
		
	}
	
	
	//report
	@RequestMapping(value = "/admin",method = RequestMethod.GET,produces = "application/json")
	public List<Post> vpost() {
		return admindao.vpost();
	}
	
	@RequestMapping(value = "/admin/{pid}",method = RequestMethod.GET,produces = "application/json")
	public boolean reportedpost(@PathVariable String pid) {
		
		return admindao.gRpostId(pid);
	}
	

}
