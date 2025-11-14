package com.app.blog.dto;
import lombok.Data;

@Data
public class EmailRequestDto {
private String from;
private String to;
private String subject;
private String message;
public EmailRequestDto(String to,String subject,String message) {
	this.to=to;
	this.subject=subject;
	this.message=message;
}
}
