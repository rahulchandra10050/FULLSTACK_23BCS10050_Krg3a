package com.app.blog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.blog.model.Blog;
import com.app.blog.model.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer>{

	List<Comment> findByBlog(Blog blog);

}
