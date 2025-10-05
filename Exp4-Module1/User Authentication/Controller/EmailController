package com.app.blog.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.blog.dto.ResetPasswordRequest;
import com.app.blog.model.User;
import com.app.blog.repository.UserRepo;
import com.app.blog.service.EmailService;

@RestController
@RequestMapping("/api/auth/public")
public class EmailController {

	@Autowired
	EmailService emailService;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/send-reset-link")
	public String sendEmail(@RequestBody Map<String, String> payload) {
		String email=payload.get("email");
		Optional<User> userOptional=userRepo.findByEmail(email);
		if(userOptional.isEmpty()) {
			return "User not found!";
		}
		
		User user=userOptional.get();
		String token=UUID.randomUUID().toString();
		user.setResetToken(token);
		user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(10));
		userRepo.save(user);
		
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        String subject = "Reset Your Password";
        String message = "Click the link to reset your password:\n" + resetLink;

        return emailService.sendEmail("rahuljsr62021@gmail.com", user.getEmail(), message, subject);
		
	}
	
	@PostMapping("/reset-password")
	public String resetPassword(@RequestBody ResetPasswordRequest req) {
	    User user = userRepo.findByResetToken(req.getToken());

	    if (user == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
	        return "Invalid or expired token";
	    }

	    user.setPassword(passwordEncoder.encode(req.getNewPassword()));
	    user.setResetToken(null);
	    user.setResetTokenExpiry(null);
	    userRepo.save(user);

	    return "Password reset successful!";
	}

}
