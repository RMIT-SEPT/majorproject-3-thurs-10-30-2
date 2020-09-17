package com.rmit.sept.majorproject.project.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHolder;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import com.rmit.sept.majorproject.project.web.BusinessController;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
public class BusinessControllerTest {
    @MockBean
    private Business business;
    private List<BusinessHours> businessHours;
    private BusinessHolder holder;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @BeforeAll
    void setup() {
        business = new Business();
        business.setName("Test");
        businessHours = new ArrayList<BusinessHours>();
        businessHours.add(new BusinessHours());
        holder = new BusinessHolder();
        holder.setBusiness(business);
        holder.setBusinessHours(businessHours);

    }

    @Test
    void addBusiness_returnsNewBusiness_ifValidCall() throws Exception {
        MvcResult mvcResult = mockMvc.perform(post("/api/Business").contentType("application/json")).andReturn();

        String expectedResponseBody = "{\n" +
                "    \"id\": 1,\n" +
                "    \"name\": \"Test\",\n" +
                "    \"created_At\": \"2020-57-16\",\n" +
                "    \"updated_At\": null,\n" +
                "    \"businessHours\": []\n" +
                "}";
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        Assertions.assertEquals(expectedResponseBody, actualResponseBody);
    }
}
