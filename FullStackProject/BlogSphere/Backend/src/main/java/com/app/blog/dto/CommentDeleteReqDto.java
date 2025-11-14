package com.app.blog.dto;

import lombok.Data;

@Data
public class CommentDeleteReqDto {
	Long blogId;
	int commentId;
}
