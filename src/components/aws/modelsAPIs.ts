import { ComponentEntity } from '../model';
import {s3} from './s3Config';

export const getFileS3 = async (fileKey: string) => {
    try {
        const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME as string,
            Key: fileKey
        }
        s3.getObject(params, (err, data) => {
            if(err){
                return [] as ComponentEntity[]
            }
            return JSON.parse(data.Body?.toString() as string) as ComponentEntity[]
        })
    } catch (exception) {
        console.log(exception);
        return [] as ComponentEntity[]
    }
}
