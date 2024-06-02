package com.path.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.annotation.Generated;

import org.springframework.data.annotation.Id;

public class Message implements Comparable<Message>{
	
	@Id
	@Generated(value = "com.acme.generator.CodeGen")
	private String id;
	
	private String messageinfo;
	private String gamertag;
	private String userid;
	private String datetime;
	
	public String getMessageinfo() {
		return messageinfo;
	}
	public void setMessageinfo(String messageinfo) {
		this.messageinfo = messageinfo;
	}
	
	public String getGamertag() {
		return gamertag;
	}
	public void setGamertag(String gamertag) {
		this.gamertag = gamertag;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	public Message() {
		LocalDateTime myDateObj = LocalDateTime.now();
		DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		this.datetime = myDateObj.format(myFormatObj);
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	
	@Override
	public int compareTo(Message o) {
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
