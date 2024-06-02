package com.path.repo;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.path.model.Image;


public interface ImageDAO extends MongoRepository<Image, String>{

}
