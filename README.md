Shopping System - Ministry of Defense Assignment
Shopping System - Home Assignment for Ministry of Defense
Overview
A complete shopping system including three main components:

Client Side - React + Redux Toolkit
Categories Server - .NET 8 + Entity Framework + SQL Server
Orders Server - Node.js + Express + Elasticsearch
System Architecture
System Components
1. Client Side (React Application)
Technologies: React 18, Redux Toolkit, TypeScript
UI Framework: shadcn/ui + Tailwind CSS
Features:
Shopping list screen with category selection
Adding products to cart
Order summary screen with details form
Global state management with Redux
2. Categories Server (.NET 8)
Technologies: ASP.NET Core 8, Entity Framework Core
Database: SQL Server
Features:
RESTful API for fetching categories
Automatic seed data
CORS configuration
Swagger documentation
3. Orders Server (Node.js)
Technologies: Express.js, Elasticsearch Client
Database: Elasticsearch
Features:
Saving orders in NoSQL structure
Advanced search in orders
Custom mapping
Installation and Running Instructions
Prerequisites
Node.js 18+
.NET 8 SDK
Docker & Docker Compose
SQL Server (or Docker container)
Elasticsearch (or Docker container)
Local Installation
1. Environment Setup
# Clone the repository
git clone <repository-url>
cd shopping-system

# Install React dependencies
npm install

# Install Node.js server dependencies
cd node-server
npm install
cd ..

# Restore .NET dependencies
cd dotnet-server
dotnet restore
cd ..
2. Running Databases
# Start databases with Docker Compose
docker-compose up -d sqlserver elasticsearch
3. Running Servers
# Terminal 1: .NET API
cd dotnet-server
dotnet run

# Terminal 2: Node.js API
cd node-server
npm run dev

# Terminal 3: React App
npm start
Docker Installation
# Build and run all services
docker-compose up --build

# Access the application at http://localhost
Cloud Architecture - Azure
Main Components
1. Azure Kubernetes Service (AKS)
Role: Managed container platform
Benefits:
Auto-scaling
High availability
Managed updates
Integration with Azure services
2. Azure Front Door + CDN
Role: Global load balancer and CDN
Benefits:
Global content distribution
SSL termination
DDoS protection
Caching strategies
3. Application Gateway + WAF
Role: Layer 7 load balancer with security
Benefits:
Web Application Firewall
SSL offloading
URL-based routing
Health probes
4. Azure SQL Database
Role: Managed relational database
Benefits:
Automatic backups
Point-in-time restore
Built-in security
Performance insights
5. Azure Cosmos DB
Role: Managed NoSQL database
Benefits:
Global distribution
Multiple APIs (MongoDB, Cassandra)
Automatic scaling
SLA guarantees
6. Azure Container Registry (ACR)
Role: Private container registry
Benefits:
Geo-replication
Security scanning
Integration with AKS
Webhook support
Security
1. Azure Key Vault
Storage of secrets, keys and certificates
Managed identities integration
Access policies and RBAC
Audit logging
2. Microsoft Defender for Cloud
Security posture management
Threat detection
Compliance monitoring
Security recommendations
3. Azure Active Directory
Identity and access management
Multi-factor authentication
Conditional access policies
Application registration
Monitoring and Logs
1. Azure Monitor
Metrics collection
Custom dashboards
Alert rules
Performance insights
2. Log Analytics Workspace
Centralized logging
KQL queries
Log retention policies
Integration with monitoring tools
3. Application Insights
Application performance monitoring
Dependency tracking
Exception tracking
User analytics
DevOps and Automation
1. Azure DevOps
Pipelines: CI/CD automation
Repos: Source control
Boards: Work item tracking
Artifacts: Package management
2. Terraform
Infrastructure as Code
State management
Resource provisioning
Environment consistency
3. GitOps Workflow
# Example Azure DevOps Pipeline
trigger:
  branches:
    include:
      - main
      - develop

stages:
  - stage: Build
    jobs:
      - job: BuildContainers
        steps:
          - task: Docker@2
            inputs:
              command: 'buildAndPush'
              repository: '$(imageRepository)'
              tags: '$(Build.BuildId)'

  - stage: Deploy
    jobs:
      - deployment: DeployToAKS
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: KubernetesManifest@0
                  inputs:
                    action: 'deploy'
                    manifests: 'k8s/*.yaml'
Kubernetes Configuration
Deployment Examples
# React App Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-app
  template:
    metadata:
      labels:
        app: react-app
    spec:
      containers:
      - name: react-app
        image: acr.azurecr.io/react-app:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
Cost and Optimization
1. Cost Management
Azure Cost Management + Billing
Budget alerts
Resource tagging
Reserved instances
2. Performance Optimization
Auto-scaling policies
Resource right-sizing
CDN optimization
Database performance tuning
Important Links
GitHub Repository: [Link to repository]
Azure DevOps Project: [Link to project]
Monitoring Dashboard: [Link to dashboard]
Documentation: [Link to docs]
Contact
For additional questions or clarifications, please contact:

Email: [your-email@example.com]
Phone: [your-phone-number]
Note: This system was developed specifically for the Ministry of Defense home assignment and contains all the technical requirements that were defined.
