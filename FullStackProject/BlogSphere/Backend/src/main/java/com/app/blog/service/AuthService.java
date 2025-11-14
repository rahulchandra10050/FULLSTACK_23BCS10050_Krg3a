package com.app.blog.service;

import java.util.HashSet;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.app.blog.jwt.JwtUtils;
import com.app.blog.model.User;
import com.app.blog.repository.UserRepo;
import com.app.blog.custom.CustomUserDetails;
import com.app.blog.dto.LoginResponse;

@Service
public class AuthService {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserRepo userRepo;
	
	public ResponseEntity<?> signup(String username, String email, String password) {
		// TODO Auto-generated method stub
		if(userRepo.existsByEmail(email)) {
			return new ResponseEntity<>("Email already in use!",HttpStatus.BAD_REQUEST);
		}
		
		User user=new User();
		user.setUsername(username);
		user.setPassword(passwordEncoder.encode(password));
		user.setEmail(email);
		
        HashSet<String> roles = new HashSet<>();
        roles.add("USER");
        user.setRoles(roles);

        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
	}

	public ResponseEntity<?> signin(String email, String password) {
	    Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(email, password)
	    );

	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    
	    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
	    String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

	    // Optional: fetch user roles from your User entity
	    String emailFromJwt = userDetails.getUsername(); // this is email

	    // You can also cast to CustomUserDetails if needed to access roles
	    CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
	    List<String> roles = new java.util.ArrayList<>(customUserDetails.getUser().getRoles());
	    LoginResponse response = new LoginResponse(emailFromJwt, roles, jwtToken);
	    return ResponseEntity.ok(response);
	}

}
