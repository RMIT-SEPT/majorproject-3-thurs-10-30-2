package com.rmit.sept.majorproject.project.model;

import javax.validation.constraints.NotNull;
import java.util.List;

public class BusinessHolder {
    @NotNull
    private Business business;
    @NotNull
    private List<BusinessHours> businessHours;

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public List<BusinessHours> getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(List<BusinessHours> businessHours) {
        this.businessHours = businessHours;
    }
}
