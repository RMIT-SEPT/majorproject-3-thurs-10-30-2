package com.rmit.sept.majorproject.project.security;

public class SecurityConstants {
    public static final String H2_URL = "h2-console/**";
    public static final String HEADER_STRING = "Authorization";

    // TODO: Determine if this key needs to be of some particular format
    public static final String SECRET = "somesecretkeyfromsomewhere...";
    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final long TOKEN_EXPIRATION_TIME = 30_000;
    public static final String TOKEN_PREFIX= "Bearer ";
}
