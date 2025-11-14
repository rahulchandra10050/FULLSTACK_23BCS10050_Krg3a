package com.app.blog.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.blog.model.Blog;
import com.app.blog.model.Like;
import com.app.blog.model.User;

@Repository
public interface LikeRepo extends JpaRepository<Like, Long>{

	Optional<Like> findByUserAndBlog(User user, Blog blog);
	List<Like> findByUser(User user);
	List<Like> findByBlog(Blog blog);
	int countByBlog(Blog blog);
}
