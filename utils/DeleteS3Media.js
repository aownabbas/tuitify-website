import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';

const DeleteS3Media = async (objects) => {
  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;
  const s3Client = new S3Client({
    region: awsBucketRegion,
    credentials: {
      accessKeyId: awsBucketKey,
      secretAccessKey: awsBucketSeKey,
    },
  });

  let array = [];

  for (let i = 0; i < objects.length; i++) {
    array.push({ Key: objects[i] });
  }

  const bucketParams = {
    Bucket: awsBucket,
    Delete: {
      Objects: array,
    },
  };
  try {
    const data = await s3Client.send(new DeleteObjectsCommand(bucketParams));
    console.log('datskfnksa', data);
    return data;
  } catch (error) {
    console.log(`Error deleting object from S3: ${error}`);
    throw error;
  }
};

export default DeleteS3Media;
