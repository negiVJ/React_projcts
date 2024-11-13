import { Client, Databases, Storage, ID , Query} from "appwrite";
import conf from "../conf/config";

export class services{
    client = new Client()
    database;
    Storage;
    
    constructor(){
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWritePojectId)
        this.database = new Databases(this.client);
        this.Storage = new Storage(this.client)
    }

    async createPost({title, content, featuredImageId, userId, status}){
        try {
            return  await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImageId,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log("Error in :: createPost ", error)
        }
    }

    async updatePost(Id, {title, content, featuredImageId, userId, status}){
        try {
            return await this.database.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                Id,
                {
                    title,
                    content,
                    featuredImageId,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log("Error in :: updatePost", error)
        }
    }

    async deletePost(Id){
        try {
            await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                Id
            )
            return true
        } catch (error) {
            console.log("Error in :: deletePost", error)
            return false
        }
    }

    async getPost(Id){
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                Id
            )
        } catch (error) {
            console.log("Error in :: getPost", error)
        }
    }
    
    async getPosts(query = [Query.equal("status", "active")]){
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                query
            )
        } catch (error) {
            console.log("Error in :: getPosts", error)
        }
    }
    

    //file handling

    async uploadFile(file){
        try {
            return await this.Storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error occured in :: createFile ", error)
        }
    }
    
    async deleteFile(fileId){
        try {
            return await this.Storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Error occured in :: fileId ", error)
            return true
        }
    }

    getFilePreview(fileId){
        return this.Storage.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }

}

const service = new services()

export default service;