package com.path.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"com.path.demo", "com.path.controller", "com.path.model", "com.path.repo"})
@ComponentScan({"com.path.repo.ImageDAO"})
@SpringBootApplication
public class GamerPathSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamerPathSpringApplication.class, args);
	}

}
