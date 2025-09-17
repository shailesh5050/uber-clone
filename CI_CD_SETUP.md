# CI/CD Pipeline Setup

This project uses GitHub Actions for continuous integration and deployment to AWS EC2.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)
- **Triggers**: Push to `main`/`develop`, Pull Requests to `main`
- **Jobs**:
  - **Test & Lint**: Runs tests and linting for both backend and frontend
  - **Build**: Builds Docker images and tests docker-compose
  - **Deploy**: Automatically deploys to EC2 when pushing to `main`

### 2. Manual Deploy (`deploy.yml`)
- **Triggers**: Manual workflow dispatch
- **Features**:
  - Choose environment (production/staging)
  - Option to force rebuild Docker images
  - Health checks after deployment

### 3. PR Checks (`pr-check.yml`)
- **Triggers**: Pull Requests
- **Features**:
  - Detects which parts of the codebase changed
  - Runs targeted tests only for changed components
  - Security vulnerability scanning
  - Docker build testing

## Required GitHub Secrets

Add these secrets to your GitHub repository settings:

```
EC2_HOST=54.251.161.87
EC2_USER=ec2-user
EC2_SSH_KEY=<your-private-key-content>
```

### Setting up EC2_SSH_KEY Secret

1. Copy the content of your private key file (`Uber-key.pem`):
   ```bash
   cat /Users/shailesh5050/Downloads/Uber-key.pem
   ```

2. Go to GitHub Repository → Settings → Secrets and variables → Actions

3. Click "New repository secret"

4. Name: `EC2_SSH_KEY`

5. Value: Paste the entire private key content (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

## EC2 Server Setup

Ensure your EC2 instance has:

1. **Docker and Docker Compose installed**:
   ```bash
   sudo yum update -y
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Git repository cloned**:
   ```bash
   cd /home/ec2-user
   git clone https://github.com/shailesh5050/uber-clone.git app
   cd app
   ```

3. **Environment files**:
   - Create `Backend/.env` with your environment variables
   - Create `frontend/.env` with your environment variables

## Security Group Configuration

Ensure your EC2 security group allows:
- Port 22 (SSH) from GitHub Actions IP ranges
- Port 4000 (Backend API)
- Port 5173 (Frontend dev server)
- Port 80/443 (if using reverse proxy)

## Deployment Process

### Automatic Deployment
1. Push changes to `main` branch
2. GitHub Actions will automatically:
   - Run tests
   - Build Docker images
   - Deploy to EC2
   - Perform health checks

### Manual Deployment
1. Go to GitHub Actions tab
2. Select "Manual Deploy" workflow
3. Click "Run workflow"
4. Choose environment and options
5. Click "Run workflow"

## Monitoring Deployment

### Check deployment status:
```bash
# SSH to EC2
ssh -i /path/to/Uber-key.pem ec2-user@54.251.161.87

# Check running containers
docker compose ps

# View logs
docker compose logs -f

# Check service health
curl http://localhost:4000/health  # Backend health check
curl http://localhost:5173         # Frontend
```

### Troubleshooting

1. **Deployment fails**:
   ```bash
   # Check logs
   docker compose logs
   
   # Restart services
   docker compose down
   docker compose up -d
   ```

2. **Build fails**:
   ```bash
   # Clean rebuild
   docker compose build --no-cache
   ```

3. **SSH connection issues**:
   - Verify EC2_SSH_KEY secret is correct
   - Check security group allows SSH from GitHub Actions
   - Ensure EC2 instance is running

## Adding Tests

To enable proper testing in the CI pipeline:

### Backend Tests
```bash
cd Backend
npm install --save-dev jest supertest
```

Add to `Backend/package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### Frontend Tests
```bash
cd frontend
npm install --save-dev vitest @testing-library/react
```

Add to `frontend/package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

## Environment Management

### Production Environment Variables
Create environment-specific files:
- `Backend/.env.production`
- `frontend/.env.production`

### Staging Environment
For staging deployments, modify the deploy workflow to use different:
- EC2 instance
- Environment variables
- Database connections

## Best Practices

1. **Always test locally** before pushing to main
2. **Use feature branches** and create pull requests
3. **Review PR checks** before merging
4. **Monitor deployment logs** after each deployment
5. **Keep secrets secure** and rotate them regularly
6. **Use semantic versioning** for releases
7. **Backup database** before major deployments

## Rollback Strategy

If deployment fails:

1. **Quick rollback**:
   ```bash
   # SSH to EC2
   git log --oneline -5  # Find previous commit
   git checkout <previous-commit-hash>
   docker compose down
   docker compose build
   docker compose up -d
   ```

2. **Automated rollback** (add to workflow if needed):
   - Keep previous Docker images
   - Implement blue-green deployment
   - Use database migrations with rollback support