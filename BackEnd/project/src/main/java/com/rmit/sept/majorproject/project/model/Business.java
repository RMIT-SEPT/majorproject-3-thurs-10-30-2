package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;
    @OneToMany( cascade = {CascadeType.ALL}, orphanRemoval = true)
    @JoinColumn(name = "business_id")
    private List<BusinessHours> businessHours = new ArrayList<>();

    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "employer_id")
    @JsonManagedReference()
    private List<User> employees = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    @NotNull(message = "Admin cannot be null.")
    @JsonBackReference
    private User admin;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public List<BusinessHours> getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(BusinessHours businessHours) {
        this.businessHours.add(businessHours);
    }

    public User getAdmin() { return admin; }

    public void setAdmin(User admin) { this.admin = admin; }

    public void removeAllBusinessHours() {
        this.businessHours.clear();
    }

    public void addEmployee(User user){
        employees.add(user);
    }
    public List<User> getEmployees(){
        return employees;
    }

    public void removeEmployee(User user){
        employees.remove(user);
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

}
