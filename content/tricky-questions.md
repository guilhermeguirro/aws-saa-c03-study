# Tricky Questions and Gotchas - AWS SAA-C03

## Introduction

In this section, you'll find tricky questions and common "gotchas" that may appear on the AWS SAA-C03 exam. These questions are designed to test your attention to detail and deep knowledge of AWS services, their limitations, and use cases.

## Section 1: Core Services Gotchas

### Question 1
**A company needs to create a storage solution on AWS that guarantees 99.999999999% (11 nines) availability for business-critical files. Which service meets this requirement?**

A) Amazon EBS with regular snapshots  
B) EC2 instances with RAID 10 instance storage  
C) Amazon S3 Standard with cross-region replication  
D) Amazon S3 Glacier with expedited retrieval  

**Correct Answer: C**

**Explanation:** This is a gotcha about durability vs. availability. Amazon S3 Standard offers 99.999999999% (11 nines) durability, not availability. S3 Standard availability is 99.99%. However, S3 with cross-region replication (CRR) can achieve higher availability by replicating data across regions. Durability refers to the annual probability of object loss, while availability refers to the time the service is accessible.

### Question 2
**An administrator needs to configure AWS CloudTrail to log all API calls across all AWS regions. Where should they configure CloudTrail to ensure complete coverage with minimum administrative effort?**

A) Configure a separate trail in each AWS region  
B) Configure a trail in us-east-1 that logs global events  
C) Configure a trail in any region and enable "Include global services"  
D) Configure a trail in each AWS partition (AWS, AWS China, AWS GovCloud)  

**Correct Answer: C**

**Explanation:** This is a gotcha about CloudTrail configuration. A single trail can be configured to log events from all regions. By creating a trail in any region and enabling the "Include global services" option, you capture events from global services (like IAM, AWS STS, CloudFront) as well as events from all regions. You don't need to configure a trail in each region or specifically in us-east-1.

### Question 3
**A company uses Amazon RDS Multi-AZ for their PostgreSQL database. During a primary availability zone failure, what is the approximate expected failover time?**

A) Instantaneous (0-10 seconds)  
B) 30-60 seconds  
C) 5-10 minutes  
D) Up to 30 minutes  

**Correct Answer: B**

**Explanation:** This is a gotcha about RDS failover times. In an RDS Multi-AZ configuration, failover typically takes between 30-60 seconds, not instantaneously as many might think. During a failover, RDS automatically updates the DNS endpoint to point to the standby instance, which causes a brief interruption. It's important not to confuse RDS Multi-AZ (for high availability) with Aurora (which has faster failover, typically <30 seconds) or with read replicas (which don't provide automatic failover).

## Section 2: Networking and Security Gotchas

### Question 4
**A company wants to allow its EC2 instances in a private subnet to access Amazon S3, but not the public internet. Which configuration meets this requirement?**

A) Add an Internet Gateway and configure the subnet's route table  
B) Implement a NAT Gateway and a route to S3  
C) Configure a VPC Endpoint Gateway for S3  
D) Use an HTTP proxy in a public subnet  

**Correct Answer: C**

**Explanation:** This is a gotcha about VPC connectivity. A VPC Endpoint Gateway for S3 allows direct connectivity between instances in the VPC and S3 through AWS's internal network, without needing an Internet Gateway or NAT Gateway. Option A would allow access to the public internet (not meeting the requirement). Option B would also allow public internet access through the NAT Gateway. Option D would require additional management and would still use the public internet.

### Question 5
**A company has configured an Application Load Balancer (ALB) with an HTTPS listener and wants to ensure clients use only secure encryption protocols. Which configuration is required?**

A) Configure a Network Load Balancer with TLS termination  
B) Configure a custom security policy on the ALB that specifies allowed ciphers  
C) Implement AWS WAF with rules to block insecure protocols  
D) Use CloudFront in front of the ALB with modern security policies  

**Correct Answer: B**

**Explanation:** This is a gotcha about ALB security features. An Application Load Balancer allows you to configure security policies that specify which protocols and ciphersuites are allowed for HTTPS connections. You can select a predefined policy or create a custom one to ensure that only secure protocols (such as TLS 1.2 or higher) and modern ciphers are used. Option C (AWS WAF) doesn't control encryption protocols, it only inspects HTTP/HTTPS content.

### Question 6
**A web application runs on EC2 instances behind an Application Load Balancer. Administrators need to obtain the original client IP addresses for analysis. How should this be implemented?**

A) Enable Proxy Protocol v2 on the ALB  
B) Configure sticky sessions on the ALB  
C) Check the X-Forwarded-For header in requests  
D) Use a Network Load Balancer instead of the ALB  

**Correct Answer: C**

**Explanation:** This is a gotcha about how load balancers handle client information. The Application Load Balancer automatically adds an HTTP X-Forwarded-For header that contains the original client IP address. The application needs to be configured to check this header. Option A (Proxy Protocol) is available for NLB and CLB, but not for ALB in the way described. Option B (sticky sessions) doesn't provide the client IP. Option D would completely change the architecture.

## Section 3: Storage and Database Gotchas

### Question 7
**A company needs to store database backups with the following characteristics: rarely accessed, must be retrievable within 3-5 hours, with 7-year retention. What is the most cost-effective storage option?**

A) Amazon S3 Standard  
B) Amazon S3 Glacier  
C) Amazon S3 Glacier Deep Archive  
D) Amazon S3 One Zone-IA  

**Correct Answer: B**

**Explanation:** This is a gotcha about S3 storage classes. The key requirement here is "retrievable within 3-5 hours." S3 Glacier has a standard retrieval time of 3-5 hours, perfectly aligned with this requirement. S3 Glacier Deep Archive is cheaper but has retrieval times of 12 hours or more, not meeting the time requirement. S3 Standard and One Zone-IA are significantly more expensive for rarely accessed data. It's important to know the retrieval times and relative costs of each storage class.

### Question 8
**A company runs a MySQL database on Amazon RDS that needs to handle a large number of read queries. Which configuration would help scale the reads without modifying the application?**

A) Implement Multi-AZ for the RDS  
B) Increase the RDS instance capacity (scale up)  
C) Create an RDS read replica and use its specific endpoint  
D) Configure RDS Proxy with read load balancing  

**Correct Answer: D**

**Explanation:** This is a gotcha about RDS scalability, with the critical part being "without modifying the application." RDS Proxy can automatically route read connections to read replicas without changes to the application's connection string, allowing transparent read load balancing. Option C would require modifying the application to explicitly use the replica endpoint for read queries. Multi-AZ (A) is for high availability, not read scalability. Scaling up the instance (B) has limits and doesn't scale horizontally for reads.

### Question 9
**A startup is using DynamoDB with provisioned read and write capacity for their application. During marketing campaigns, the application frequently receives ProvisionedThroughputExceededException errors. Which solution resolves this problem with the lowest cost and operational effort?**

A) Implement DynamoDB Accelerator (DAX)  
B) Manually increase provisioned capacity before campaigns  
C) Switch to on-demand capacity mode  
D) Implement exponential backoff and jitter strategies in the application code  

**Correct Answer: C**

**Explanation:** This is a gotcha about different DynamoDB capacity modes. On-demand capacity mode allows DynamoDB to scale automatically to accommodate traffic spikes without prior planning, ideal for unpredictable workloads like marketing campaigns. Option B would require accurate estimates and manual intervention. DAX (A) would help with reads but not writes. Exponential backoff (D) would only manage failures, not prevent them. On-demand mode is specifically designed for variable or unpredictable traffic patterns.

## Section 4: Auto Scaling and Elasticity Gotchas

### Question 10
**An application runs in an Auto Scaling Group with limits of 2-10 instances and a CPU utilization tracking policy with a 70% target. During a major event, average CPU utilization reaches 85%, but the number of instances remains at 10. What is the most likely cause?**

A) The tracking policy is configured incorrectly  
B) The cooldown period is too long  
C) The Auto Scaling Group has reached its maximum capacity limit  
D) The AMI used for scale-out is unavailable  

**Correct Answer: C**

**Explanation:** This is a gotcha about how Auto Scaling Groups operate. Even with a tracking policy that would indicate a need for more instances (CPU at 85% vs. 70% target), the ASG will never exceed its configured maximum limit (10 instances in this case). The policy is working correctly, but the maximum limit is constraining additional scaling. If traffic is consistently high, the maximum limit should be reviewed.

### Question 11
**A web application runs in an Auto Scaling Group. Developers have noticed that when scale-in occurs, instances with active user sessions are sometimes terminated, disconnecting users. Which configuration solves this problem?**

A) Increase the Auto Scaling Group cooldown period  
B) Implement sticky sessions on the Load Balancer  
C) Configure a custom termination policy on the ASG  
D) Enable scale-in protection for instances with connections  

**Correct Answer: D**

**Explanation:** This is a gotcha about instance protection in Auto Scaling. Scale-in protection (instance protection) allows specific instances to be marked to prevent termination during scale-in events. Combined with application logic to enable/disable this protection based on active sessions, this prevents user disruption. Sticky sessions (B) ensure a user continues to access the same instance but doesn't prevent that instance from being terminated. A custom termination policy (C) only defines which instance to terminate first, not preventing termination.

### Question 12
**A company uses an Auto Scaling Group for an application that experiences predictable traffic spikes every Monday at 9 AM. Which configuration is most efficient for handling these spikes?**

A) Configure larger capacity instances in the Launch Template  
B) Implement predictive scaling with recurring schedule  
C) Configure a dynamic CloudWatch alarm based on day of week  
D) Use target tracking policy with a custom metric  

**Correct Answer: B**

**Explanation:** This is a gotcha about different types of auto scaling. For highly predictable traffic patterns that occur at specific times, predictive scaling is the most efficient solution. It proactively provisions capacity before the expected spike, avoiding the delay inherent in reactive scaling. AWS Auto Scaling now supports recurring predictive scaling for patterns that repeat on specific days. Option D (tracking policies) is reactive, responding only after load increases.

## Section 5: High Availability and Disaster Recovery Gotchas

### Question 13
**A company has implemented an application using Amazon RDS Multi-AZ and wants to ensure business continuity in case of a regional failure. What additional configuration is needed?**

A) Implement a cross-region Auto Scaling Group  
B) Configure RDS Read Replicas in another region  
C) Implement RDS Multi-AZ across multiple regions  
D) Configure automated backup and restore to another region  

**Correct Answer: B**

**Explanation:** This is a gotcha about the difference between multi-AZ and multi-region. RDS Multi-AZ protects against availability zone failures but not regional failures. For protection against regional failures, data must be replicated to another region. RDS Read Replicas can be created in different regions and promoted to primary if the original region fails. Option C is incorrect because "RDS Multi-AZ across multiple regions" is not a valid concept - Multi-AZ operates only within a region. Backups (D) have a much higher RTO.

### Question 14
**A company has a critical application that requires an RTO of 5 minutes and zero RPO in case of regional disasters. Which architecture meets these requirements?**

A) EC2 Auto Scaling across regions with Amazon Aurora Global Database  
B) Active/active site distributed across regions with DynamoDB Global Tables  
C) Serverless architecture with Lambda@Edge and DynamoDB Global Tables  
D) RDS Multi-AZ with automated snapshots across regions  

**Correct Answer: B**

**Explanation:** This is a gotcha about stringent DR requirements. A zero RPO (no data loss) with 5-minute RTO during regional failures requires an active/active architecture distributed across regions. DynamoDB Global Tables provides bi-directional replication with near-zero RPO and minute-level RTO. Option A cannot guarantee zero RPO, as Aurora Global Database has asynchronous replication (typical RPO <1 minute). Option D definitely doesn't meet the requirements, as snapshots have much larger intervals between backups.

### Question 15
**A company operates a critical application on EC2 that must remain available even during AMI updates. Which deployment strategy minimizes downtime?**

A) In-place deployment with updated AMI  
B) Blue/green deployment with AWS CodeDeploy  
C) Canary deployment with gradual update  
D) Immutable deployment with Auto Scaling Group  

**Correct Answer: B**

**Explanation:** This is a gotcha about deployment strategies. Blue/green deployment involves creating a completely new environment (green) while the current environment (blue) continues to operate. After validating the new environment, traffic is redirected, resulting in zero downtime. CodeDeploy can automate this process. In-place deployments (A) result in downtime. Canary deployments (C) expose some users to potential issues. Immutable deployments (D) can still cause disruptions during the transition.

## Section 6: Hybrid Architectures and Migration Gotchas

### Question 16
**An organization needs to migrate a legacy mainframe application to AWS with minimal downtime. The application uses a proprietary database and COBOL code. Which approach is most suitable?**

A) Refactor the application to use AWS native services  
B) Rewrite the application in a modern language and migrate to Lambda  
C) Use AWS App2Container to containerize the application  
D) Rehost (lift-and-shift) the application to EC2 using mainframe emulation services  

**Correct Answer: D**

**Explanation:** This is a gotcha about migration strategies for specific legacy systems. Mainframe applications with COBOL code and proprietary databases typically cannot be containerized with App2Container (C), which is designed for Java and .NET applications. Refactoring (A) or rewriting (B) would require significant time and introduce risks. Rehosting (lift-and-shift) using mainframe emulation services, such as those offered by AWS partners, allows keeping the existing code and database while running on AWS infrastructure, minimizing downtime and risk.

### Question 17
**A company wants to extend their on-premises data center infrastructure to AWS. They need to maintain full consistency between environments, including networking, policies, and management tools. Which AWS service is most suitable?**

A) AWS Direct Connect with VPN as backup  
B) VMware Cloud on AWS  
C) AWS Storage Gateway in volume mode  
D) AWS Outposts  

**Correct Answer: D**

**Explanation:** This is a gotcha about hybrid computing services. AWS Outposts is a fully managed service that extends AWS infrastructure, services, and tools to virtually any data center or on-premises facility. It allows running AWS native services on-premises with the same APIs and tools. Direct Connect (A) provides only connectivity. VMware Cloud on AWS (B) facilitates migrating VMware workloads but doesn't extend AWS infrastructure to the data center. Storage Gateway (C) is only for storage.

### Question 18
**A company is migrating 500 on-premises servers to AWS but has limited internet bandwidth. The servers total 100TB of data. Which migration method is most efficient?**

A) Use AWS Application Migration Service for online replication  
B) Request multiple AWS Snowball devices for offline transfer  
C) Set up AWS Direct Connect and migrate using AWS DataSync  
D) Perform phased migration using Site-to-Site VPN  

**Correct Answer: B**

**Explanation:** This is a gotcha about data transfer options. For a large volume of data (100TB) with limited bandwidth, offline transfer using AWS Snowball is generally the most efficient option. AWS Snowball allows transferring large amounts of data to AWS without depending on internet connectivity. Option A may be unfeasible due to limited bandwidth for initial replication. Option C (Direct Connect) would require time to set up and would still be limited by the provisioned bandwidth. Option D would be very slow and inefficient.

## Section 7: Advanced Services Gotchas

### Question 19
**A company has implemented a data lake on Amazon S3 and wants to allow SQL analytics on CSV, JSON, and Parquet files without transforming them into a database format. Which service should be used?**

A) Amazon Redshift Spectrum  
B) Amazon RDS with data import  
C) Amazon Athena  
D) Amazon EMR with Hive  

**Correct Answer: C**

**Explanation:** This is a gotcha about analytics services. Amazon Athena allows running SQL queries directly on data stored in S3 without needing transformation or loading into a database. Athena natively supports CSV, JSON, and Parquet files. Redshift Spectrum (A) also allows querying data in S3 but requires a Redshift cluster. RDS (B) would require importing data. EMR with Hive (D) is more complex to set up and manage for simple queries on files.

### Question 20
**A company wants to implement a personalized recommendation system on their e-commerce site without hiring ML experts. Which AWS service is most suitable?**

A) Amazon SageMaker with custom models  
B) Amazon Personalize  
C) Amazon Forecast  
D) Amazon Comprehend  

**Correct Answer: B**

**Explanation:** This is a gotcha about AWS AI/ML services. Amazon Personalize is specifically designed to implement personalized recommendation systems without requiring ML expertise. It uses the same algorithms as Amazon.com for product recommendations. SageMaker (A) would require specialized ML knowledge. Amazon Forecast (C) is for time-series forecasting. Amazon Comprehend (D) is for text analysis and sentiment analysis, not for recommendations.

### Question 21
**A serverless application needs to store database credentials and third-party API keys with automatic rotation. Which AWS service is most suitable?**

A) AWS Systems Manager Parameter Store  
B) AWS Secrets Manager  
C) AWS KMS  
D) Amazon S3 with server-side encryption  

**Correct Answer: B**

**Explanation:** This is a gotcha about secrets management services. The key difference is in the "automatic rotation" requirement. AWS Secrets Manager is specifically designed to store credentials with built-in support for automatic secret rotation, especially for RDS, DocumentDB, and Redshift. Parameter Store (A) can store credentials but doesn't have built-in automatic rotation functionality. KMS (C) manages encryption keys, not credentials. S3 (D) is for object storage, not secrets management.

## Section 8: Complex Multi-Choice Gotchas

### Question 22
**A media company needs to ingest large video streams, process them in real-time, and deliver the content to millions of users globally. Which AWS services should be used? (Select TWO options)**

A) Amazon Kinesis Video Streams for ingestion and processing  
B) Amazon S3 with versioning for video storage  
C) AWS Elemental MediaLive for video processing  
D) Amazon CloudFront for global content delivery  
E) Amazon ECS with Auto Scaling for video processing  

**Correct Answers: C, D**

**Explanation:** This is a gotcha about specialized media services vs. generic services. AWS Elemental MediaLive is a specialized service for live video processing (transcoding, packaging, etc.), specifically designed for professional media workflows. CloudFront is essential for efficient global distribution of video content. Kinesis Video Streams (A) is more suited for video analytics and machine learning, not large-scale media distribution. ECS (E) is not optimized for video processing like MediaLive.

### Question 23
**A startup is implementing a high-traffic web application with a limited budget. Which compute options are most cost-effective? (Select TWO options)**

A) EC2 Reserved Instances for baseline capacity  
B) EC2 On-Demand instances for all capacity  
C) EC2 Spot Instances for non-critical workloads  
D) AWS Fargate for all application components  
E) Lambda functions for web application front-end  

**Correct Answers: A, C**

**Explanation:** This is a gotcha about EC2 cost optimization. A common cost-effective strategy is to use Reserved Instances to cover predictable baseline capacity (saving up to 75% vs. On-Demand) and supplement with Spot Instances for variable non-critical capacity (saving up to 90% vs. On-Demand). On-Demand instances (B) are the most expensive for consistent usage. Fargate (D) typically costs more than optimized EC2. Lambda (E) is not ideal for high-traffic web application front-ends with long-running connections (would be more expensive and less efficient).

### Question 24
**A company is designing a system to track IoT sensor data in real-time. Which services are most suitable for this architecture? (Select TWO options)**

A) Amazon Kinesis Data Streams for real-time ingestion  
B) Amazon S3 with Glacier for long-term storage  
C) Amazon DynamoDB for current sensor state storage  
D) Amazon Redshift for real-time sensor data analytics  
E) Amazon RDS Multi-AZ for sensor data  

**Correct Answers: A, C**

**Explanation:** This is a gotcha about IoT architectures and real-time processing. Kinesis Data Streams is optimized for ingesting and processing large volumes of data in real-time, perfect for IoT telemetry. DynamoDB is ideal for storing current sensor states due to its consistent millisecond latency for reads/writes and schemaless model. Redshift (D) is a data warehouse for historical analysis, not real-time processing. RDS (E) is not optimized for IoT workloads with high write frequency. S3 with Glacier (B) would be for historical data, not real-time access.

## Conclusion

These questions highlight common "gotchas" that may appear on the AWS SAA-C03 exam. When studying, pay special attention to:

1. **Keywords and qualifiers**: Terms like "most cost-effective," "minimum operational effort," "real-time," "without modifying the application" often determine the correct answer.

2. **Subtle differences between related services**: Such as the differences between Multi-AZ (availability) and Read Replicas (scalability), or between durability and availability.

3. **Service limitations**: Knowing the limits and constraints of AWS services is crucial for identifying the correct answer.

4. **Specific use cases**: Understanding what scenarios each service is optimized for can help eliminate incorrect options.

Remember to read each question carefully and identify the critical requirements before selecting an answer. Often, the difference between the correct and incorrect answer lies in a seemingly small detail.
