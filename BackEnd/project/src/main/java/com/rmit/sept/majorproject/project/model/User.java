package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "bookingsAsCustomer", "bookingsAsWorker", "business"})
public class User implements UserDetails {

    public enum AccountType {
        ADMIN,
        CUSTOMER,
        WORKER }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Please enter your full name")
    private String fullName;

    @Email(message = "Username needs to be a valid email")
    @NotBlank(message = "Username is required")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @Transient
    private String confirmPassword;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date created_At;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updated_At;

    @OneToMany(
            mappedBy = "customer",
            fetch = FetchType.LAZY
    )
    private Set<Booking> bookingsAsCustomer;

    @OneToMany(
            mappedBy = "worker",
            fetch = FetchType.LAZY
    )
    private Set<Booking> bookingsAsWorker;

    @OneToOne(mappedBy = "admin", fetch = FetchType.LAZY)
    @JsonManagedReference
    private Business business;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() { return fullName; }

    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() { return confirmPassword; }

    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

    public Set<Booking> getBookingsAsCustomer() { return bookingsAsCustomer; }

    public Set<Booking> getBookingsAsWorker() { return bookingsAsWorker; }

    public Business getBusiness() { return business; }

    public void setBusiness(Business business) { this.business = business; }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public AccountType getAccountType(){ return accountType; }

    public void setAccountType(AccountType accountType) { this.accountType = accountType; }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }


    // UserDetails interface methods

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

}
