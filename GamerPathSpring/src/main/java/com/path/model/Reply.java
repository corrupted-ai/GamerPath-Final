package com.path.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Generated;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "replies")
public class Reply implements Comparable<Reply>{
	
	@Id
	@Generated(value = "com.acme.generator.CodeGen")
	private String id;
	
	private String userid;
	private List<String> upvoted = new LinkedList<>();
	private List<String> downvoted = new LinkedList<>();
	private String replyinfo;
	private String datetime;
	private int score;
	private String image;
	private String gamertag;


	
	
	
	public String getGamertag() {
		return gamertag;
	}

	public void setGamertag(String gamertag) {
		this.gamertag = gamertag;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	

	public Reply() {
		LocalDateTime myDateObj = LocalDateTime.now();
		DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		this.datetime = myDateObj.format(myFormatObj);
		this.score=0;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getReplyinfo() {
		return replyinfo;
	}

	public void setReplyinfo(String replyinfo) {
		this.replyinfo = replyinfo;
	}
	
	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	
	public List<String> getUpvoted() {
		return upvoted;
	}

	public void setUpvoted(String upvoted) {
		this.upvoted.add(upvoted);
	}

	public List<String> getDownvoted() {
		return downvoted;
	}

	public void setDownvoted(String downvoted) {
		this.downvoted.add(downvoted);
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	
	
	
	
	@Override
	public int compareTo(Reply o) {
		String d1 = this.datetime;
		String d2 = o.datetime;
		int iday = Integer.parseInt(d1.substring(0, 2));
		int imonth = Integer.parseInt(d1.substring(3, 5));
		int iyear = Integer.parseInt(d1.substring(6, 10));
		int ihour = Integer.parseInt(d1.substring(11, 13));
		int imin = Integer.parseInt(d1.substring(14, 16));
		int isec = Integer.parseInt(d1.substring(17, 19));

		int fday = Integer.parseInt(d2.substring(0, 2));
		int fmonth = Integer.parseInt(d2.substring(3, 5));
		int fyear = Integer.parseInt(d2.substring(6, 10));
		int fhour = Integer.parseInt(d2.substring(11, 13));
		int fmin = Integer.parseInt(d2.substring(14, 16));
		int fsec = Integer.parseInt(d2.substring(17, 19));

		if (iyear - fyear > 0) {
			return 1;
		} else if (iyear - fyear < 0) {
			return -1;
		} else {
			if (imonth - fmonth > 0) {
				return 1;
			} else if (imonth - fmonth < 0) {
				return -1;
			} else {
				if (iday - fday > 0) {
					return 1;
				} else if (iday - fday < 0) {
					return -1;
				} else {
					if (ihour - fhour > 0) {
						return 1;
					} else if (ihour - fhour < 0) {
						return -1;
					} else {
						if (imin - fmin > 0) {
							return 1;
						} else if (imin - fmin < 0) {
							return -1;
						} else {
							if (isec - fsec > 0) {
								return 1;
							} else if (isec - fsec < 0) {
								return -1;
							} else {
								return 1;
							}

						}
					}
				}
			}
		}
	}
	

}
