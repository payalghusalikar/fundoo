import axios from "axios";

const URL = process.env.VUE_BASEURL;

export default {
    registerUser(data) {
        console.warn("saving start", data);
        console.warn("saving start data");
        console.warn("saving url1", URL);
        const url = "http://localhost:2001" + "/register";
        console.warn("saving url", url);
        console.warn("axios", axios);
        // return axios.post(url, data)
        return axios.post(url, data);
    },
};

// class User {
//     registerUser = async(data) => {
//         console.warn("saving start", data)
//         console.warn("saving start data")
//         console.warn("saving base url1", URL)
//         const url = 'http://localhost:2001' + '/register'
//         console.warn("saving url", url)
//         const url2 = process.env.VUE_BASEURL + '/register'
//         console.warn("saving url1", url2)
//         try {
//             const response = await axios.post(url, data)
//             console.warn("axios responce ", response)
//         } catch (error) {
//             console.warn("axios error ", error)
//         }

//     }
// }

//module.exports = new User();