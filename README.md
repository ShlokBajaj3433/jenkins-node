# Jenkins Node Project

Simple Node.js Express project with Docker and Jenkins pipeline support.

## Project Overview

The app starts an Express server on port `3000` by default and provides:

- `GET /` -> Hello message
- `GET /health` -> JSON health response

Main files:

- `app.js` (entry point)
- `src/server.js` (Express server)
- `test/server.test.js` (Jest test)
- `Dockerfile`
- `Jenkinsfile`

## Project Structure

```text
project2-node/
  app.js
  Dockerfile
  Jenkinsfile
  package.json
  README.md
  src/
    server.js
  test/
    server.test.js
```

## Prerequisites

Install:

- Node.js 18+
- npm
- Docker (optional)
- Jenkins (optional)

## Run Locally

From the `project2-node` folder:

### 1. Install dependencies

```bash
npm install
```

### 2. Start server

```bash
npm start
```

Expected startup log:

```text
Server running on port 3000
```

### 3. Verify endpoints

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
```

Expected `/health` response:

```json
{"status":"ok"}
```

## Run Tests

```bash
npm test
```

## Run with Docker

### 1. Build image

```bash
docker build --no-cache -t my-app .
```

### 2. Run container

```bash
docker run --rm -p 3000:3000 my-app
```

### 3. Test endpoint

```bash
curl http://localhost:3000/health
```

## Run Jenkins Inside Docker

Use this setup when you want Jenkins itself to run in Docker and execute this project pipeline from there.

### 1. Start Jenkins container

```powershell
docker volume create jenkins_home

docker run -d --name jenkins `
  -p 8080:8080 -p 50000:50000 `
  -v jenkins_home:/var/jenkins_home `
  -v //var/run/docker.sock:/var/run/docker.sock `
  -v c:/codes/Jenkins:/workspace `
  jenkins/jenkins:lts-jdk17
```

### 2. Install Docker CLI inside Jenkins container

```powershell
docker exec -u 0 jenkins sh -c "apt-get update && apt-get install -y docker.io"
```

### 3. Open Jenkins and unlock

- URL: `http://localhost:8080`
- Get admin password:

```powershell
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Install suggested plugins and complete the first admin user setup.

## Jenkins Pipeline (Inside Docker Jenkins)

Current Jenkins pipeline has two stages:

1. Docker Build
2. Run Container

### Create Jenkins job for this project

1. Create a new **Pipeline** job.
2. Choose **Pipeline script from SCM**.
3. SCM: Git
4. Repository URL: `https://github.com/ShlokBajaj3433/jenkins-node.git`
5. Branch: `main`
6. Script Path: `Jenkinsfile`
7. Click **Build Now**.

### Notes

- This setup uses Docker-outside-of-Docker via the mounted Docker socket.
- The current `Run Container` stage uses `docker run my-app`, so the container keeps running because Node server is long-lived.
- For CI pipelines, you may want detached mode with explicit health checks and container cleanup.

## Troubleshooting

- `npm: command not found`:
  - Install Node.js and npm
- Port already in use:
  - Set another port: `PORT=4000 npm start`
- Docker not available in Jenkins:
  - Ensure Docker socket is mounted and Docker CLI is installed in the Jenkins container

## Keep It Simple and Standard

- Use `npm install`, `npm start`, `npm test`
- Keep routes and startup in one server module
- Use Jenkins only for build/run automation
