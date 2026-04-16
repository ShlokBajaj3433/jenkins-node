pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Start') {
            steps {
                sh 'npm start &'
                sh 'sleep 2'
                sh 'curl -f http://localhost:3000/health'
            }
        }
    }
}
