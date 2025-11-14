package com.app.blog.dto;

import java.util.List;

import lombok.Data;

@Data
public class profileDto {

	private String username;
	private String email;
	private List<String> roles;
	public profileDto(){
		super();
	}
	public profileDto(String username, String email, List<String> roles) {
		super();
		this.username = username;
		this.email = email;
		this.roles = roles;
	}
}
