import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthService {
    async login(username, password) {
        const response = await axios({
            method: "POST",
            url: 'http://localhost:3000/api/users/login',
            headers: {},
            data: {
                "username": document.getElementById("formLoginEmail").value,
                "password": document.getElementById("formLoginPassword").value
            }
        });
        console.log(response);
        if (response.status === 200) {
            var data = jwt_decode(response.data.token.split(" ")[1]);
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            return response.data;
        }
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, password) {
        return axios.post("http://localhost:3000/api/users/register", {
            username,
            password
        });
    }
}

export default new AuthService();