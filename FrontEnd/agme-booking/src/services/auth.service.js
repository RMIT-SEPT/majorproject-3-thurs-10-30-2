import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthService {
    async login(username, password) {
        const response = await axios({
            method: "POST",
            url: 'http://localhost:8080/api/users/login',
            headers: {},
            data: {
                "username": username,
                "password": password
            }
        });
        console.log(response);
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token)
            var data = jwt_decode(response.data.token.split(" ")[1]);
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            return response.data;
        }
    }

    logout() {
        localStorage.removeItem("user");
        window.location.href = "/"
    }

    async register(username, fname, password, passwordConfirm, type) {
        await axios({
            method: "POST",
            url: "http://localhost:8080/api/users/register", 
            headers: {},
            data: {
                "username": username,
                "fullName": fname,
                "password": password,
                "confirmPassword": passwordConfirm,
                "accountType": type
            }
        });
        return this.login(username, password);
    }
}

export default new AuthService();