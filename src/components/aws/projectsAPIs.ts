import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from './s3Config';

export const uploadFileS3 = async (file: File) => {
    const s3 = new ReactS3Client(s3Config);
    const filename = file.name;

    try {
        const res = await s3.uploadFile(file, filename);

        console.log(res);
        /*
        * {
        *   Response: {
        *     bucket: "bucket-name",
        *     key: "directory-name/filename-to-be-uploaded",
        *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
        *   }
        * }
        */
    } catch (exception) {
        console.log(exception);
        /* handle the exception */
    }
}
