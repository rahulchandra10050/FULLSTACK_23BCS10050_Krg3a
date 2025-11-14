package com.app.blog.custom;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.blog.model.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    // Treat email as the username for login
    @Override
    public String getUsername() {
        return user.getEmail(); // this is critical for email-based login
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // or map roles here if you have them
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    // Optional accessors
    public String getEmail() {
        return user.getEmail();
    }

    public String getActualUsername() {
        return user.getUsername();
    }
    
    public User getUser() {
        return this.user;
    }

}

