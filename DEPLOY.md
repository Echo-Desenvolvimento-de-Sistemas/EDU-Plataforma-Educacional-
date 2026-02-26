# EDU Platform - Deployment Guide

Complete guide for deploying the EDU educational platform to the VPS at `echo.dev.br`.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Deployment Process](#deployment-process)
- [Post-Deployment](#post-deployment)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### VPS Requirements
- **OS**: Linux (Ubuntu 20.04+ recommended)
- **Docker**: 20.10+
- **Docker Swarm**: Initialized
- **Network**: `echonet` overlay network created
- **Database**: MariaDB 10.6+ accessible on `echonet`
- **Reverse Proxy**: Traefik configured with SSL

### Access Requirements
- SSH access to VPS
- GitHub account with access to the repository
- GitHub Personal Access Token (PAT) with `read:packages` permission

### Infrastructure Details
```
Network: echonet (10.0.1.0/24)
Database Host: mariadb
Database Port: 3306
Database Name: edu
Database User: root
Database Password: Akio2604*
Application URL: https://app.colegiorosadesharom.com.br
```

---

## Initial Setup

### 1. Clone the Repository

```bash
# SSH into your VPS
ssh user@echo.dev.br

# Navigate to your projects directory
cd clientes/rosa/app

# Clone the repository
git clone https://github.com/Echo-Desenvolvimento-de-Sistemas/EDU-Plataforma-Educacional.git edu
cd edu
```

### 2. Configure Environment

```bash
# Copy production environment file
cp .env.production .env

# Edit environment variables if needed
nano .env
```

**Important environment variables to verify:**
- `APP_URL`: Should be `https://app.colegiorosadesharom.com.br`
- `DB_HOST`: Should be `mariadb`
- `DB_DATABASE`: Should be `edu`
- `DB_PASSWORD`: Verify it matches your MariaDB password
- `MAIL_*`: Configure SMTP settings for email functionality

### 3. Set Deployment Script Permissions

```bash
chmod +x deploy.sh
```

### 4. Login to GitHub Container Registry

```bash
# Login with your GitHub username and Personal Access Token
docker login ghcr.io
# Username: your-github-username
# Password: your-github-personal-access-token
```

**To create a GitHub PAT:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scope: `read:packages`
4. Copy the token and use it as password

### 5. Verify Network

```bash
# Check if echonet network exists
docker network ls | grep echonet

# If not exists, it should already be created by your infrastructure
# If needed, create it:
docker network create --driver overlay echonet
```

---

## Deployment Process

### Automated Deployment (Recommended)

```bash
# Run the deployment script
./deploy.sh
```

The script will:
1. Login to GitHub Container Registry
2. Pull the latest Docker image
3. Create `.env` file if not exists
4. Generate `APP_KEY` if missing
5. Create the database if not exists
6. Deploy the stack to Docker Swarm
7. Show service status and logs

### Manual Deployment

If you prefer manual control:

```bash
# 1. Login to GHCR
docker login ghcr.io

# 2. Pull the latest image
docker pull ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest

# 3. Create database
docker exec $(docker ps -q -f name=database_mariadb) \
  mysql -uroot -pAkio2604* \
  -e "CREATE DATABASE IF NOT EXISTS edu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 4. Deploy the stack
docker stack deploy -c docker-compose.yml --with-registry-auth edu

# 5. Check status
docker stack services edu
```

### Emergency Manual Deployment (GitHub Actions Failure)

If the GitHub Actions pipeline fails and you need to build and deploy locally on the VPS, follow these steps to bypass Docker Swarm's default image caching (which always prioritizes the remote registry):

```bash
# 1. Pull the latest code
cd /opt/apps/edu
git pull origin main

# 2. Build the image locally without cache
docker build --no-cache -t ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest .

# 3. Tag the image as a local-only image
# This forces Swarm to use the local image instead of checking the registry
docker tag ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest edu-local:v1

# 4. Temporarily update docker-compose.yml to use the local image
sed -i 's|ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest|edu-local:v1|g' docker-compose.yml

# 5. Deploy the stack (without registry auth)
docker stack deploy -c docker-compose.yml edu

# 6. Force the service to update
docker service update --force edu_app
```

> [!TIP]
> **Restore Normal Deployment:** Once GitHub Actions is fixed and you want to return to automated remote deployments, revert your `docker-compose.yml` file back to the remote image:
> ```bash
> git checkout docker-compose.yml
> ```

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Check service status
docker stack services edu

# View logs
docker service logs edu_app -f

# Check if containers are running
docker ps | grep edu
```

### 2. Run Database Migrations

Migrations run automatically via the entrypoint script. To verify:

```bash
# Check migration status
docker exec $(docker ps -q -f name=edu_app) php artisan migrate:status
```

### 3. Admin User Created Automatically

The deployment automatically creates a default admin user:

**Credentials:**
- **Email**: `admin@admin.com`
- **Password**: `admin123`

> [!WARNING]
> **Change the admin password immediately after first login!** This is a default credential for initial access only.

To change the password after login, use the profile settings or run:

```bash
docker exec $(docker ps -q -f name=edu_app) php artisan tinker
# In tinker:
$user = App\Models\User::where('email', 'admin@admin.com')->first();
$user->password = bcrypt('your-new-secure-password');
$user->save();
exit
```

### 4. Verify Application Access

1. Open browser and navigate to `https://app.colegiorosadesharom.com.br`
2. Verify SSL certificate is valid
3. Login with admin credentials
4. Test basic functionality

### 5. Configure Storage

```bash
# Verify storage permissions
docker exec $(docker ps -q -f name=edu_app) ls -la /var/www/html/storage

# If needed, fix permissions (already done in Dockerfile)
docker exec $(docker ps -q -f name=edu_app) chown -R www-data:www-data /var/www/html/storage
```

---

## Maintenance

### Updating the Application

Always run a manual update to ensure your host files (like scripts and `docker-compose.yml`) are in sync before pulling the latest image.

1. Navigate to your project directory:
```bash
cd /opt/apps/edu
```

2. Pull the latest code and deploy:
```bash
# Pull latest code
git pull origin main

# Run the deployment script (which pulls the image and updates the stack)
./deploy.sh
```

*(Alternatively, if doing everything manually without the script)*
```bash
# Pull latest code
git pull origin main

# Pull latest image
docker pull ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest

# Update the stack
docker stack deploy -c docker-compose.yml --with-registry-auth edu
```

### Database Backups

```bash
# Create backup directory
mkdir -p /opt/backups/edu

# Backup database
docker exec $(docker ps -q -f name=database_mariadb) \
  mysqldump -uroot -pAkio2604* edu > /opt/backups/edu/edu_$(date +%Y%m%d_%H%M%S).sql

# Compress backup
gzip /opt/backups/edu/edu_$(date +%Y%m%d_%H%M%S).sql
```

**Automated backups with cron:**
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * docker exec $(docker ps -q -f name=database_mariadb) mysqldump -uroot -pAkio2604* edu | gzip > /opt/backups/edu/edu_$(date +\%Y\%m\%d_\%H\%M\%S).sql.gz
```

### Viewing Logs

```bash
# Application logs
docker service logs edu_app -f

# Redis logs
docker service logs edu_redis -f

# Last 100 lines
docker service logs edu_app --tail 100

# Logs since 1 hour ago
docker service logs edu_app --since 1h
```

### Scaling Services

```bash
# Scale app to 2 replicas
docker service scale edu_app=2

# Scale back to 1 replica
docker service scale edu_app=1
```

---

## Troubleshooting

### Application Not Accessible

**Check service status:**
```bash
docker stack services edu
```

**Check container logs:**
```bash
docker service logs edu_app --tail 50
```

**Verify Traefik routing:**
```bash
docker service logs traefik_traefik | grep edu
```

### Database Connection Issues

**Test database connectivity:**
```bash
docker exec $(docker ps -q -f name=edu_app) php artisan tinker
# In tinker: DB::connection()->getPdo();
```

**Check if database exists:**
```bash
docker exec $(docker ps -q -f name=database_mariadb) \
  mysql -uroot -pAkio2604* -e "SHOW DATABASES LIKE 'edu';"
```

**Verify network connectivity:**
```bash
docker exec $(docker ps -q -f name=edu_app) ping -c 3 mariadb
```

### SSL Certificate Issues

**Check Traefik logs:**
```bash
docker service logs traefik_traefik | grep app.colegiorosadesharom.com.br
```

**Verify DNS:**
```bash
nslookup app.colegiorosadesharom.com.br
```

### Container Keeps Restarting

**Check health status:**
```bash
docker ps -a | grep edu_app
```

**View detailed logs:**
```bash
docker service logs edu_app --tail 200
```

**Common issues:**
- Missing `APP_KEY` in `.env`
- Database connection failure
- Permission issues on storage directories
- Missing dependencies

### Storage/Upload Issues

**Check volume mounts:**
```bash
docker volume ls | grep edu
docker volume inspect edu_storage_data
```

**Verify permissions:**
```bash
docker exec $(docker ps -q -f name=edu_app) ls -la /var/www/html/storage
```

### Performance Issues

**Check resource usage:**
```bash
docker stats
```

**Clear application cache:**
```bash
docker exec $(docker ps -q -f name=edu_app) php artisan cache:clear
docker exec $(docker ps -q -f name=edu_app) php artisan config:clear
docker exec $(docker ps -q -f name=edu_app) php artisan view:clear
```

**Optimize for production:**
```bash
docker exec $(docker ps -q -f name=edu_app) php artisan config:cache
docker exec $(docker ps -q -f name=edu_app) php artisan route:cache
docker exec $(docker ps -q -f name=edu_app) php artisan view:cache
```

### Rollback to Previous Version

```bash
# Find previous image SHA
docker images | grep edu-plataforma-educacional

# Update service to use specific image
docker service update --image ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:sha-<commit-sha> edu_app
```

---

## Additional Commands

### Accessing the Container

```bash
# Get shell access
docker exec -it $(docker ps -q -f name=edu_app) sh

# Run artisan commands
docker exec $(docker ps -q -f name=edu_app) php artisan <command>
```

### Removing the Stack

```bash
# Remove the entire stack
docker stack rm edu

# Remove volumes (WARNING: This deletes all data!)
docker volume rm edu_storage_data edu_cache_data edu_redis_data
```

### Monitoring

```bash
# Watch service status
watch -n 2 'docker stack services edu'

# Monitor logs in real-time
docker service logs edu_app -f
```

---

## Support

For issues or questions:
- Check application logs: `docker service logs edu_app`
- Review this documentation
- Contact the development team

**Useful Links:**
- Application: https://app.colegiorosadesharom.com.br
- Portainer: https://portainer.echo.dev.br
- Database Admin: https://db.echo.dev.br
