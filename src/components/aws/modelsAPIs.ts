import { ComponentEntity } from '../model';
import AWS from "aws-sdk"

export const getFileS3 = async (s3Config: AWS.S3, bucket: string, fileKey: string) => {
    try {
        const params = {
            Bucket: bucket,
            Key: fileKey
        }
        s3Config.getObject(params, (err, data) => {
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
