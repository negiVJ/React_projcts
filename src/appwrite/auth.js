import conf from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWritePojectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            return await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (user) {
                //login 
                //this is step is not necessary we can have user login explicitly but we are doing it implicitly
                return this.logIn({email,  password})
            } else {
                return user;
            }
        } catch (error) {
            if (error.code == 409) {
                console.log("user account already exists");
            }
            console.log("An error occueed :: createAccount ", error)
            
        }

    }

    async logIn({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );
            
        } catch (error) {
            // throw new Error("There is some error in ::  logIn()", error);
            console.log("An error occured in :: logIn", error)
            
        }
    
    }

    async getUser(){
        try {
            return await this.account.get()
        } catch (error) {
            // console.log("An error occured in :: getUser() ", error)
            return null;
        }
        
    }

    async logOut(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("An error occured in :: logOUt", error)
        }
    }

}


const authService = new AuthService();

export default authService;