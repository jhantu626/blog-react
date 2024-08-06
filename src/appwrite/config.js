import conf from './../conf/conf'
import { Client,Id,Databases,Storage,Query } from 'appwrite'



export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,feturedImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                    {
                        title,
                        content,
                        feturedImage,
                        status,
                        userId
                    }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug,{title,content,feturedImage,status},){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log(error);
        }
    }
    async getPosts(queries=[Query.equal("status",'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                100
            )
        } catch (error) {
            console.log(error)
        }
    }



    //File upload functions
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                Id.unique(),
                file
            )
        } catch (error) {
            console.log(error);
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log(error);
        }
        return true;
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )        
        } catch (error) {
            console.log(error)
        }
    }
}

const service =new Service();
export default service