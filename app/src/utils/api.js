import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Accept: "application/json",
    },
});

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         switch (error.response.status) {
//             case 401: // Not logged in
//             case 419: // Session expired
//             case 503: // Down for maintenance
//                 // Bounce the user to the login screen with a redirect back
//                 alert("Your session has expired, you will be logged out.");
//                 clearUser();
//                 window.location.href = "/login";
//                 break;
//             case 500:
//                 alert("Oops, something went wrong!");
//                 break;
//             default:
//                 // Allow individual requests to handle other errors
//                 return Promise.reject(error);
//         }
//     }
// );

export default instance;
