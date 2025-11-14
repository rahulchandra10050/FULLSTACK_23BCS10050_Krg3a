package com.app.blog.dto;

import java.time.LocalDateTime;
import java.util.List;


public class BlogResponseDTO {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private int likes;
    private int totalComments;
    private List<String> likedByUsernames;
    
    
    public BlogResponseDTO(Long id, String title, String content, String author, LocalDateTime createdAt, int likes,
			List<String> likedByUsernames,int totalComments) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.author = author;
		this.createdAt = createdAt;
		this.likes = likes;
		this.likedByUsernames = likedByUsernames;
		this.totalComments=totalComments;
	}
    
	public BlogResponseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getTotalComments() {
		return totalComments;
	}
	public void setTotalComments(int totalComments) {
		this.totalComments=totalComments;
	}
	public List<String> getLikedByUsernames() {
		return likedByUsernames;
	}
	public void setLikedByUsernames(List<String> likedByUsernames) {
		this.likedByUsernames = likedByUsernames;
	}
}

