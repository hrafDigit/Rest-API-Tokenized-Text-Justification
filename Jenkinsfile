pipeline {
    agent { 
        label 'angular-sonnarscanner' 
    }

    stages {
        stage('sh command') {
            steps {
                deleteDir()
                git branch: 'main', url: 'https://github.com/hrafDigit/Rest-API-Tokenized-Text-Justification.git'
                withSonarQubeEnv('sonar-srv-1') {
                    sh '''
                    sonar-scanner \
                      -Dsonar.projectKey=Rest-API-Tokenized-Text-Justification \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://176.132.202.34:9090 \
                      -Dsonar.token=sqp_581c3968cd0820752a70c37b424b24486c8717b4
                    '''
                }
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
