pipeline {
  agent any
  stages {
    stage('Build image') {
      steps {
        withDockerRegistry(credentialsId: 'docker-jenkins', url: 'https://hub.docker.com/') {
          sh '''
            docker build -f Dockerfile -t docker-jenkens .
            docker push docker-jenkens
          '''
        }
      }
    }
  }
}