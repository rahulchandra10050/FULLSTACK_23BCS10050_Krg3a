package com.app.blog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.blog.model.Blog;
import com.app.blog.model.User;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long>{

	List<Blog> findByCreatedBy(User user);

}
