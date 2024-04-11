export const validation = (type, value) => {

    switch (type) {
        case "name":
            if (value.length < 3) {
                return "name should be longer";
            }
            return "";

        case "surname":

            if (value.length < 3) {
                return "surname should be longer";
            }
            return "";

        case "email":
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "add a correct email";
            }
            return "";

            case "password":

            if (value.length < 6 ) {
            return "password incorrect"
            }

            return "";

        default:
            console.log("validation function");
       
    }

}