package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class User {

    enum AccountType{
        ADMIN,
        CUSTOMER,
        WORKER }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Size(min = 3, max = 15, message = "Please enter 3-15 characters")
    @NotBlank(message = "User name is required")
    private String name;

    @Email(message = "Valid email is required")
    private String email;

    @Size(min = 6, message = "Please enter a minimum of 6 characters")
    private String password;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;



    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

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



}
