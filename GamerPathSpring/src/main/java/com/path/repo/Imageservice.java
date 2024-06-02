package com.path.repo;

import java.io.IOException;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.path.model.Image;

@Service
@Repository
public class Imageservice {
	
	@Autowired
	private MongoTemplate mongo;
	
	public String addimage(MultipartFile file) throws IOException { 
        Image img = new Image(); 
        img.setPicture(new Binary(BsonBinarySubType.BINARY, file.getBytes())); 
        mongo.insert(img); 
        return img.getId(); 
    }
 
    public Image getPhoto(String id) { 
    	System.out.println(mongo.findAll(Image.class).get(0));
    	return mongo.find(new Query(Criteria.where("id").is(id)), Image.class).get(0);
    }
    public Image setimagestring(Image m,String s) {
    	m.setImagestring(s);
    	return mongo.save(m);
    }

}	
