const conf={
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWritePojectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
console.log(import.meta.env.VITE_APPWRITE_URL)
export default conf;