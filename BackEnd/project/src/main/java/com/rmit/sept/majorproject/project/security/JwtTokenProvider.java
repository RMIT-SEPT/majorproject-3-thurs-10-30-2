package com.rmit.sept.majorproject.project.security;

import com.rmit.sept.majorproject.project.model.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.rmit.sept.majorproject.project.security.SecurityConstants.SECRET;
import static com.rmit.sept.majorproject.project.security.SecurityConstants.TOKEN_EXPIRATION_TIME;

@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expiryDate = new Date(now.getTime()+TOKEN_EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("username", user.getUsername());
        claims.put("accountType", user.getAccountType());
        claims.put("fullName", user.getFullName());

        return Jwts.builder().setSubject(userId)
                             .setClaims(claims)
                             .setIssuedAt(now)
                             .setExpiration(expiryDate)
                             .signWith(SignatureAlgorithm.HS512, SECRET)
                             .compact();
    }

    public boolean validateToken(String token) {
        boolean success = false;

        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            success = true;
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token");
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token");
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty");
        }

        return success;
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }
}
