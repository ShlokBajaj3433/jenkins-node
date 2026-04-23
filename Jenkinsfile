pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Web Smoke Test') {
            steps {
                sh '''
                    PORT=3000 npm start > node-server.log 2>&1 &
                    NODE_PID=$!
                    trap "kill $NODE_PID" EXIT
                    sleep 3
                    curl -f http://localhost:3000/health
                '''
            }
        }

    }
}
