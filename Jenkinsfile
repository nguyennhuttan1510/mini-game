pipeline {
  agent any
  stages {
    stage('Build image') {
      steps {
        withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
          sh '''
            docker build -t docker-jenkens .
            docker push docker-jenkens
          '''
        }
      }
    }
  }
}