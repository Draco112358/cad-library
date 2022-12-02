export const s3Config = {
    bucketName: "esymia-storage",
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY as string,
    s3Url: "https://esymia-storage.s3.amazonaws.com/",
}
