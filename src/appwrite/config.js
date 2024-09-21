import conf from "../conf/conf.js";
import {Client, ID, Databases , Storage, Query } from 'appwrite';

export class Service {

    client = new Client();
    Databases;
    Bucket;

    constructor(){  
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.client)
        this.Bucket = new Storage(this.client)
    }

    async creatPost({title, slug, featuredImage, content, status, userId}){

        try {
            return await this.Databases.creatDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status,
                    userId
                }
            )

        } catch (error) {

            console.log('creatPost Error', error)
            return false
            
        }


    }

    async updatePost(slug,{title, featuredImage, content, status,}){
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    featuredImage,
                    content,
                    status,  
                }
            )
            
        } catch (error) {

            
            console.log('updatePost Error', error)
            return false
            
            
        }



    }

    async deletePost(slug){
        try {

                await this.Databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,

            )

            return true
            
        } catch (error) {

            console.log('deletePost Error', error)
            return false
            
            
        }

    }

    async getPost(slug){
        try {
            return await this.Databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,

            )
            
        } catch (error) {

            console.log('getPost Error', error)
            return false

            
        }


    }

    async allPost(queries = [Query.equal('status','active')]){
        try {

            return await this.Databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries,

            )
            
        } catch (error) {

            console.log('allPost Error', error)
            return false
            
        }

    }

    // file upload service 

    async uploadFlie(file){
        try {

            return await this.Bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

            
        } catch (error) {

            console.log('uploadFile Error', error)
            return false
            
        }
    }

    async deleteFile(fileId){
        try {

            await this.Bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true
            
        } catch (error) {
            console.log('uploadFile Error', error)
            return false
            
        }

    }

    getFilePreview(fileId){
        return this.Bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}









const service = new Service()

export default service 