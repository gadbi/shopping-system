Shopping System - Ministry of Defense Assignment
מערכת קניות - מטלת בית למשרד הביטחון
סקירה כללית
מערכת קניות מלאה הכוללת שלושה רכיבים עיקריים:

צד לקוח - React + Redux Toolkit
שרת קטגוריות - .NET 8 + Entity Framework + SQL Server
שרת הזמנות - Node.js + Express + Elasticsearch
ארכיטקטורת המערכת
רכיבי המערכת
1. צד הלקוח (React Application)
טכנולוגיות: React 18, Redux Toolkit, TypeScript
UI Framework: shadcn/ui + Tailwind CSS
תכונות:
מסך רשימת קניות עם בחירת קטגוריות
הוספת מוצרים לעגלה
מסך סיכום הזמנה עם טופס פרטים
ניהול מצב גלובלי עם Redux
2. שרת קטגוריות (.NET 8)
טכנולוגיות: ASP.NET Core 8, Entity Framework Core
מסד נתונים: SQL Server
תכונות:
API RESTful לשליפת קטגוריות
Seed data אוטומטי
CORS configuration
Swagger documentation
3. שרת הזמנות (Node.js)
טכנולוגיות: Express.js, Elasticsearch Client
מסד נתונים: Elasticsearch
תכונות:
שמירת הזמנות במבנה NoSQL
חיפוש מתקדם בהזמנות
Mapping מותאם אישית
הוראות התקנה והרצה
דרישות מקדימות
Node.js 18+
.NET 8 SDK
Docker & Docker Compose
SQL Server (או Docker container)
Elasticsearch (או Docker container)
התקנה מקומית
1. הכנת הסביבה
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
2. הרצת מסדי הנתונים
# Start databases with Docker Compose
docker-compose up -d sqlserver elasticsearch
3. הרצת השרתים
# Terminal 1: .NET API
cd dotnet-server
dotnet run

# Terminal 2: Node.js API
cd node-server
npm run dev

# Terminal 3: React App
npm start
התקנה עם Docker
# Build and run all services
docker-compose up --build

# Access the application at http://localhost
ארכיטקטורת ענן - Azure
רכיבים עיקריים
1. Azure Kubernetes Service (AKS)
תפקיד: פלטפורמת קונטיינרים מנוהלת
יתרונות:
Auto-scaling
High availability
Managed updates
Integration עם Azure services
2. Azure Front Door + CDN
תפקיד: Global load balancer ו-CDN
יתרונות:
הפצת תוכן גלובלית
SSL termination
DDoS protection
Caching strategies
3. Application Gateway + WAF
תפקיד: Layer 7 load balancer עם אבטחה
יתרונות:
Web Application Firewall
SSL offloading
URL-based routing
Health probes
4. Azure SQL Database
תפקיד: מסד נתונים יחסי מנוהל
יתרונות:
Automatic backups
Point-in-time restore
Built-in security
Performance insights
5. Azure Cosmos DB
תפקיד: מסד נתונים NoSQL מנוהל
יתרונות:
Global distribution
Multiple APIs (MongoDB, Cassandra)
Automatic scaling
SLA guarantees
6. Azure Container Registry (ACR)
תפקיד: רישום קונטיינרים פרטי
יתרונות:
Geo-replication
Security scanning
Integration עם AKS
Webhook support
אבטחה
1. Azure Key Vault
שמירת סודות, מפתחות ותעודות
Managed identities integration
Access policies ו-RBAC
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
ניטור ולוגים
1. Azure Monitor
Metrics collection
Custom dashboards
Alert rules
Performance insights
2. Log Analytics Workspace
Centralized logging
KQL queries
Log retention policies
Integration עם monitoring tools
3. Application Insights
Application performance monitoring
Dependency tracking
Exception tracking
User analytics
DevOps ואוטומציה
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
תצורת Kubernetes
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
עלויות ואופטימיזציה
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
קישורים חשובים

צור קשר
לשאלות נוספות או הבהרות, אנא פנו אל:

Email: gad.biran@outlook.co.il
Phone: 0534222056
הערה: מערכת זו פותחה במיוחד עבור מטלת הבית של משרד הביטחון ומכילה את כל הדרישות הטכניות שהוגדרו.
