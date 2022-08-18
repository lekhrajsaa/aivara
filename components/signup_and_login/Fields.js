//Input box while signing up and and logging in used on Form.js
const Fields = {
    login:[{
       
            label:"email",
            show:false,
            type:"hidden",
            placeholder:"enter email Id"
    },
       {    label:"password",
            show:false,
            type:"hidden",
            placeholder:"enter password"
        }
    ],
    signUp:{
        userName:{
            show:false,
            type:"hidden",
            placeholder:"enter your name"
        },
        email:{
            show:false,
            type:"hidden",
            placeholder:"enter email id"
        },
        phoneNumber:{
            show:false,
            type:"hidden",
            placeholder:"enter phone number"
        },
        password:{
            show:false,
            type:"hidden",
            placeholder:"enter password"
        },
        confirmPassword:{
            show:false,
            type:"hidden",
            placeholder:"confirm password"
        }
    }
}
export default Fields;
