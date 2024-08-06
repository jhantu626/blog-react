import conf from "../conf/conf";
import { Client,Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({name,email,password}){
        try{
            const user=await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(user){
                return await this.account.createEmailPasswordSession(
                    email,
                    password
                );
            }else{
                return user;
            }
        }catch(err){
            console.log(err)
            throw err;
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(err){
            console.log(err)
            throw err;
        }
    }
    
    async getCurrentUser(){
        try{
            const user= await this.account.get();
            return user;
        }catch(err){
            console.log(err)
            throw err;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

const authService=new AuthService();

export default authService;