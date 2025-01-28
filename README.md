4. Push Docker Image to AWS Elastic Container Registry (ECR)
Once you’ve tested the image locally, you can push it to AWS ECR so that AWS Lambda can use it.

4.1: Create ECR Repository
Create a repository in ECR to store your Docker image:

aws ecr create-repository --repository-name lambda-post-handler

4.2: Log in to ECR
Log in to AWS ECR using Docker:

aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<your-region>.amazonaws.com

4.3: Tag and Push Docker Image
Tag your image for ECR and push it:

docker tag lambda-post-handler:latest <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/lambda-post-handler:latest
docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/lambda-post-handler:latest

5. Create or Update AWS Lambda Function
Once the image is in ECR, you can create or update your Lambda function to use the new Docker image.

5.1: Create or Update Lambda Function

aws lambda update-function-code \
    --function-name lambda-post-handler \
    --image-uri <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/lambda-post-handler:latest
    
6. Set Up Lambda Function URL
To make your Lambda function accessible via HTTP requests, you’ll need to enable a Lambda Function URL.

6.1: Enable Lambda Function URL

aws lambda create-function-url \
    --function-name lambda-post-handler \
    --auth-type NONE
    
This will return a URL like:

https://<function-id>.lambda-url.<region>.on.aws/
7. Test Your Lambda Function
Now that the Function URL is set up, test the Lambda function via curl:

curl -X POST "<function-url>" \
     -H "Content-Type: application/json" \
     -d '{"name": "Alice"}'
You should get a response like:

{
    "message": "Hello, Alice!"
}
