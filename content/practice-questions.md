# Practice Questions and Answers - AWS SAA-C03

## Section 1: Designing Resilient Architectures

### Question 1
**A company needs to host a web application that must be highly available and tolerate failures in an availability zone. The application uses a relational database to store transaction data. Which solution meets these requirements with the least management effort?**

A) EC2 instances across multiple zones with a self-managed MySQL database  
B) EC2 instances across multiple zones with Amazon RDS Multi-AZ  
C) EC2 instances in a single zone with Amazon Aurora database with read replicas  
D) AWS Lambda with Amazon DynamoDB  

**Correct Answer: B**

**Explanation:** Amazon RDS Multi-AZ provides high availability with automatic failover to the standby in case of infrastructure failure in the availability zone. Combined with EC2 instances across multiple zones, this provides a resilient solution with minimal management effort.

### Question 2
**A web application is experiencing slow loading times due to increasing global traffic. Users are accessing the application from different regions worldwide, and static files (images, CSS, JavaScript) account for 80% of the loading time. Which combination of AWS services would improve performance for end users?**

A) Migrate the application to larger EC2 instances and configure Auto Scaling  
B) Implement Amazon CloudFront with S3 as the origin for static content  
C) Use AWS Global Accelerator with Load Balancers in multiple regions  
D) Migrate the database to DynamoDB Global Tables  

**Correct Answer: B**

**Explanation:** CloudFront is a CDN (Content Delivery Network) that caches content at edge locations globally, reducing latency for users in different locations. Using S3 as the origin for static content reduces the load on the backend server and significantly improves loading time.

### Question 3
**A company has an application that generates large files that must be stored for 30 days for immediate processing and then archived for 5 years for regulatory compliance. After the initial 30 days, the data is rarely accessed. What is the most cost-effective storage solution?**

A) Store all data in Amazon S3 Standard for 5 years and 30 days  
B) Store in S3 Standard for 30 days, then move to S3 One Zone-IA  
C) Store in S3 Standard for 30 days, then move to S3 Glacier Deep Archive  
D) Use EBS for the first 30 days, then back up to S3 Standard  

**Correct Answer: C**

**Explanation:** S3 Standard is ideal for the first 30 days when frequent access is needed. After this period, since the data is rarely accessed and needs to be kept for 5 years, the most cost-effective option is to transfer it to S3 Glacier Deep Archive, which is optimized for long-term retention with very infrequent access.

## Section 2: Designing High-Performance Architectures

### Question 4
**A microservices-based application needs to process orders in real-time. Each order must be processed exactly once, in the correct order, and the application must scale automatically as volume increases. Which combination of services is most suitable?**

A) Amazon SNS with multiple Lambda consumers  
B) Amazon SQS Standard Queue with EC2 Auto Scaling Group  
C) Amazon Kinesis Data Streams with Lambda consumers  
D) Amazon SQS FIFO Queue with EC2 Auto Scaling Group  

**Correct Answer: D**

**Explanation:** Amazon SQS FIFO Queue ensures that messages are delivered exactly once and in the order they were sent (First-In-First-Out). Combined with an EC2 Auto Scaling Group, this provides automatic scaling based on queue depth.

### Question 5
**An e-commerce application needs to store user session and shopping cart data with extremely low latency. The data is temporary, and loss is acceptable in case of system failure. What is the most suitable solution?**

A) Amazon RDS MySQL with read replicas  
B) Amazon DynamoDB with provisioned capacity  
C) Amazon ElastiCache using Redis in cluster mode  
D) Amazon ElastiCache using Memcached  

**Correct Answer: D**

**Explanation:** Amazon ElastiCache with Memcached is optimized for simple use cases that require caching objects with the lowest possible latency. Unlike Redis, Memcached doesn't offer persistence, but this is acceptable in this scenario as temporary loss of session data is allowed.

### Question 6
**A news website experiences unpredictable traffic spikes when major events occur. During these events, the SQL database reaches 100% CPU utilization. Which approach provides the best performance during these spikes?**

A) Increase the RDS instance class to a larger one  
B) Implement Amazon ElastiCache in front of RDS  
C) Migrate the database to DynamoDB  
D) Add RDS read replicas and use a Load Balancer  

**Correct Answer: B**

**Explanation:** Implementing ElastiCache allows caching of frequent query results, significantly reducing the load on the RDS database during traffic spikes. This provides better performance and scalability for content that is frequently read but infrequently modified.

## Section 3: Designing Secure Architectures

### Question 7
**A company wants to ensure that all data stored in Amazon S3 is encrypted and that the encryption keys are managed by the organization. Which option meets these requirements?**

A) Enable default bucket encryption for S3 using SSE-S3  
B) Configure S3 bucket encryption using SSE-KMS with customer-managed CMKs  
C) Implement client-side encryption before uploading to S3  
D) Use AWS CloudHSM to manage keys and SSE-S3 for encryption  

**Correct Answer: B**

**Explanation:** SSE-KMS with Customer Managed Keys (CMKs) allows the company to maintain control over the encryption keys used to protect the data in S3, meeting the requirement for keys to be managed by the organization. This provides an additional layer of control compared to AWS-managed keys.

### Question 8
**A company has multiple AWS accounts and wants to implement consistent security controls across all of them. What is the most efficient approach to ensure all accounts follow standardized security policies?**

A) Configure identical IAM roles and policies in each account separately  
B) Implement AWS Config Rules in each account  
C) Use AWS Organizations with Service Control Policies (SCPs)  
D) Create a script to check and apply policies periodically  

**Correct Answer: C**

**Explanation:** AWS Organizations with Service Control Policies (SCPs) allows you to define centralized permission policies that apply to multiple accounts in your organization. SCPs limit the permissions available in member accounts, ensuring consistent governance across the organization.

### Question 9
**A web application hosted on AWS needs to be protected against SQL injection and Cross-Site Scripting (XSS) attacks. Which AWS service should be implemented?**

A) AWS Shield Standard  
B) Amazon Inspector  
C) AWS WAF  
D) AWS Network Firewall  

**Correct Answer: C**

**Explanation:** AWS WAF (Web Application Firewall) is specifically designed to protect web applications against common layer 7 attacks such as SQL injection and XSS. It allows you to create custom rules to filter out malicious traffic before it reaches your application.

## Section 4: Designing for Cost Optimization

### Question 10
**A company runs batch processing workloads that can be interrupted and restarted without issues. These workloads take approximately 15 hours to complete and need to run daily. Which option offers the most cost-effective solution?**

A) EC2 Reserved Instances  
B) EC2 Spot Instances  
C) EC2 On-Demand Instances  
D) AWS Batch with Fargate instances  

**Correct Answer: B**

**Explanation:** EC2 Spot Instances are significantly cheaper (up to 90% discount) compared to On-Demand instances. Since the workload can be interrupted and restarted, it is ideal for using Spot instances. The company can configure a recovery strategy to handle potential interruptions.

### Question 11
**A company has an application that processes data and stores the results in Amazon S3. After analysis, it was determined that 80% of the data is not accessed after 30 days, and another 15% is rarely accessed after 90 days. How can storage costs be optimized?**

A) Move all data to S3 Glacier after 30 days  
B) Implement an S3 lifecycle policy for automatic transition to S3 Standard-IA after 30 days and to Glacier after 90 days  
C) Use S3 Intelligent-Tiering to automatically manage the lifecycle of objects  
D) Compress all data before storing it in S3 Standard  

**Correct Answer: B**

**Explanation:** An S3 lifecycle policy allows automatic transitions between storage classes based on object age. Moving less accessed data to S3 Standard-IA after 30 days and to Glacier after 90 days will significantly reduce storage costs while maintaining appropriate levels of accessibility.

### Question 12
**A startup is building a new application and wants to minimize costs while maintaining the ability to scale. The application consists of a REST API that performs short-lived operations. Which architecture is most cost-effective?**

A) EC2 instances in an Auto Scaling Group with ELB  
B) Amazon ECS with Fargate instances  
C) Amazon API Gateway integrated with AWS Lambda  
D) EC2 Reserved Instances with Application Load Balancer  

**Correct Answer: C**

**Explanation:** The combination of API Gateway and Lambda offers a serverless architecture where you pay only for actual usage (invocations and execution time). For short-lived operations, this approach eliminates costs of idle infrastructure and scales automatically, making it ideal for startups with budget constraints.

## Section 5: Specific Service Questions

### Question 13
**A company needs to migrate 80 TB of data from its data center to AWS within a week. The company's internet connection has limited bandwidth of 100 Mbps. Which method is most suitable for this migration?**

A) Direct upload to S3 via AWS CLI  
B) Set up an AWS Direct Connect and transfer via S3 API  
C) Use AWS DataSync with an agent installed on-premises  
D) Request an AWS Snowball Edge  

**Correct Answer: D**

**Explanation:** With a 100 Mbps bandwidth, transferring 80 TB would take approximately 74 days (well beyond the one-week timeframe). AWS Snowball Edge is a physical device that can store up to 100 TB and be shipped to AWS, allowing for fast migrations of large data volumes without relying on internet connectivity.

### Question 14
**An application needs to send notifications to end users via SMS and also trigger processing in different AWS services when specific events occur. Which service is most suitable for this scenario?**

A) Amazon SQS  
B) Amazon SNS  
C) Amazon EventBridge  
D) AWS Step Functions  

**Correct Answer: B**

**Explanation:** Amazon SNS (Simple Notification Service) supports multiple delivery protocols, including SMS for end users and HTTP/HTTPS, Lambda, SQS, and email for integration with other services. It's specifically designed for pub/sub messaging where multiple subscribers can receive the same notification.

### Question 15
**A company wants to host a static website with HTML, CSS, and JavaScript files. The site will receive global traffic and needs to be highly available, scalable, and cost-effective. What is the best solution?**

A) EC2 instances with Auto Scaling and Application Load Balancer  
B) Amazon S3 with static website hosting and CloudFront  
C) AWS Amplify Hosting  
D) Amazon Lightsail  

**Correct Answer: B**

**Explanation:** For a static website, S3 offers highly available and durable hosting without the need to manage servers. When combined with CloudFront, it provides global content distribution with low latency. This is the most cost-effective solution as it eliminates compute infrastructure costs.

## Section 6: Complex Architecture Questions

### Question 16
**A healthcare company needs to create an architecture on AWS to store and process sensitive patient data. Requirements include: encryption of data at rest and in transit, detailed audit logs for all actions, and the ability to recover data after regional disasters. Which combination of services best meets these requirements?**

A) EC2 with encrypted EBS, CloudTrail, and EBS snapshots copied to another region  
B) RDS with encryption enabled, CloudWatch Logs, and automated backup with multi-region replication  
C) S3 with default encryption, CloudTrail, AWS Config, and cross-region replication  
D) DynamoDB with encryption, CloudTrail, AWS Backup with cross-region copies  

**Correct Answer: C**

**Explanation:** Amazon S3 offers encryption at rest and in transit, CloudTrail provides detailed audit logs for all API operations, AWS Config can monitor resource configurations for compliance, and S3 cross-region replication ensures recovery after regional disasters. This combination meets all the security and compliance requirements for sensitive data.

### Question 17
**An e-commerce company has a three-tier architecture with load balancers, web servers, and a database. During sales events, traffic increases 20-fold. The company wants a solution that scales automatically, minimizes costs during low-traffic periods, and maintains high availability. What is the best architecture?**

A) ALB with EC2 Auto Scaling, and RDS Multi-AZ  
B) ALB with EC2 Spot Instances and Lambda to process orders, and Aurora Serverless  
C) ALB with EC2 Auto Scaling using a mix of On-Demand and Spot instances, and Aurora with Auto Scaling  
D) CloudFront, API Gateway with Lambda, and DynamoDB with on-demand capacity  

**Correct Answer: C**

**Explanation:** The combination of EC2 Auto Scaling using On-Demand instances for base capacity and Spot for cost-effective expansion during peaks, along with Aurora with Auto Scaling, offers the best balance of cost, scalability, and availability. This architecture scales dynamically for both the application and database tiers.

### Question 18
**A company needs to implement a data lake on AWS to consolidate terabytes of structured and unstructured data from multiple sources. The data needs to be cataloged, searchable, and accessible for analytics by various teams. Which combination of services is most suitable?**

A) Amazon RDS for storage, Redshift for analytics  
B) Amazon S3 for storage, AWS Glue for cataloging, Athena for SQL queries  
C) Amazon EFS for storage, EMR for processing  
D) DynamoDB for storage, Kinesis Analytics for real-time processing  

**Correct Answer: B**

**Explanation:** Amazon S3 is ideal for a data lake due to its virtually unlimited storage and cost-effectiveness. AWS Glue provides data cataloging and automated schema discovery. Amazon Athena allows SQL queries directly on S3 data without the need to load it into a separate database. This combination is AWS's standard solution for data lakes.

## Section 7: Migration Scenario Questions

### Question 19
**A company is migrating a legacy Oracle application to AWS. The application requires high availability and needs to maintain compatibility with specific Oracle features. What is the best migration approach?**

A) Migrate to Aurora PostgreSQL using AWS DMS for schema conversion  
B) Use RDS for Oracle with Multi-AZ deployment  
C) Reimplement the application to use DynamoDB  
D) Run Oracle Database on EC2 instances in an Auto Scaling Group  

**Correct Answer: B**

**Explanation:** RDS for Oracle with Multi-AZ deployment provides high availability with automatic failover while maintaining full compatibility with Oracle-specific features. For a legacy application that depends on Oracle-specific features, this is the most straightforward and lowest-risk migration approach.

### Question 20
**A company needs to migrate 500 on-premises VMs to AWS with minimal business disruption. The VMs run a mix of Windows and Linux. Which AWS service is most suitable for this migration?**

A) AWS Server Migration Service (SMS)  
B) AWS Database Migration Service (DMS)  
C) AWS Application Migration Service (MGN)  
D) AWS Backup  

**Correct Answer: C**

**Explanation:** AWS Application Migration Service (formerly CloudEndure Migration) is specifically designed to migrate large numbers of physical, virtual, or cloud-based servers to AWS with minimal disruption. It supports both Windows and Linux and automates the migration process, including continuous replication and testing before cutover.

## Section 8: AWS Services High-Level Questions

### Question 21
**Which AWS service should be used to automate infrastructure deployment using code?**

A) AWS Systems Manager  
B) AWS CodeDeploy  
C) AWS Elastic Beanstalk  
D) AWS CloudFormation  

**Correct Answer: D**

**Explanation:** AWS CloudFormation is AWS's infrastructure as code service that allows you to model, provision, and manage AWS and third-party resources by treating infrastructure as code. It automates the creation of resources in a consistent and repeatable manner.

### Question 22
**Which AWS service allows you to monitor, store, and access log files from AWS resources?**

A) AWS CloudTrail  
B) Amazon CloudWatch Logs  
C) AWS Config  
D) Amazon S3  

**Correct Answer: B**

**Explanation:** Amazon CloudWatch Logs allows you to monitor, store, and access log files from various sources, including EC2, Lambda, CloudTrail, and other AWS services. It centralizes logs for easy analysis, alarm configuration, and long-term retention.

### Question 23
**A company needs to provide secure access to specific AWS services for applications running on on-premises servers without exposing access keys. Which solution should be implemented?**

A) IAM Access Keys stored in an encrypted configuration file  
B) IAM Roles with temporary credentials  
C) AWS IAM Identity Center (formerly SSO)  
D) AWS Security Token Service with IAM Roles for external identities  

**Correct Answer: D**

**Explanation:** AWS Security Token Service (STS) with IAM Roles for external identities allows on-premises applications to assume IAM roles temporarily, providing short-term credentials without the need to store long-term access keys.

## Section 9: Multi-Answer Questions

### Question 24
**A company is setting up their AWS environment to ensure high availability. Which of the following options help achieve this goal? (Select TWO)**

A) Distribute resources across multiple AWS regions  
B) Implement Multi-AZ for services like RDS and ElastiCache  
C) Use EC2 Spot instances for all workloads  
D) Implement redundant AWS Direct Connect  
E) Use a single availability zone with multiple instance sets  

**Correct Answers: B, D**

**Explanation:** Implementing Multi-AZ for critical services like RDS provides automatic failover in case of zone failure. Redundant AWS Direct Connect provides resilient connectivity between on-premises environments and AWS. Multiple regions (A) would be for disaster recovery, not just high availability. Spot instances (C) can be interrupted and don't guarantee availability. Using a single AZ (E) creates a single point of failure.

### Question 25
**When designing for cost optimization in AWS, which of the following strategies are effective? (Select THREE)**

A) Use Reserved Instances for predictable long-term workloads  
B) Implement Auto Scaling to adjust capacity as needed  
C) Always choose the most powerful instances to ensure performance  
D) Utilize appropriate S3 storage classes based on access patterns  
E) Retain all snapshots and backups indefinitely for maximum safety  
F) Monitor and eliminate unused resources  

**Correct Answers: A, B, D, F** (choose THREE from these four)

**Explanation:** Reserved Instances (A) reduce costs for predictable workloads. Auto Scaling (B) adjusts capacity based on demand, avoiding idle resources. Using appropriate S3 storage classes (D) optimizes costs based on access patterns. Eliminating unused resources (F) prevents unnecessary spending. Choosing oversized instances (C) and retaining all backups indefinitely (E) increase costs without necessarily adding value.
