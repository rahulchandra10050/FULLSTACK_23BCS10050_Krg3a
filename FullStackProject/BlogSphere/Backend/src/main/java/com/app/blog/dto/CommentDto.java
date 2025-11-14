package com.app.blog.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
	private int id;
	private String content;
	private String username;
	private LocalDateTime createdAt;
}
