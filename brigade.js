const { events, Job, Group } = require("brigadier");

// Triggers the event

events.on("exec", (e,project) => {

// Shared Storage for all Jobs

  var dest = "/mnt/brigade/share"


// Job for Installing Application Dependency

  var build = new Job("dependency-installation");
  
  build.image = "node:alpine";
  
  build.env = {

// Place these Nexus credentials while creating brigade project

    NEXUS_AUTH: project.secrets.nexusAuth,
    NEXUS_EMAIL: project.secrets.nexusEmail,
    NEXUS_REGISTRY: project.secrets.nexusRegistry

  }
  
  build.tasks = [

    "cd /src",

// Configuring Nexus Repo with Npm

    "npm config set _auth $NEXUS_AUTH",
    "npm config set email $NEXUS_EMAIL",
    "npm config set registry $NEXUS_REGISTRY",   
    "npm config set always-auth true",
    "npm install",
    "npm run build"
    
  ];
  

// Job for Application Unit Test

  var unit = new Job("unit-test");
  
  unit.image = "node:alpine";
  
  unit.tasks = [
    
    "cd /src",
    "npm run test:c",
    "npm run lint:fix"
    
  ];


// Job for Sonarqube

  var sonar = new Job("sonarqube");
  
  sonar.image = "sonarsource/sonar-scanner-cli";
  
  sonar.env = {
  
// Place these Sonarqube while creating brigade project
  
    SONAR_AUTH: project.secrets.sonarAuth,
    SONAR_PROJ_KEY: project.secrets.sonarKey,
    SONAR_URL: project.secrets.sonarUrl,
    SONAR_BRANCH: project.secrets.sonarBranch
 
  }
  
  sonar.tasks = [
  
   "sonar-scanner \
      -Dsonar.branch.name=$SONAR_BRANCH \
      -Dsonar.projectKey=$SONAR_PROJ_KEY \
      -Dsonar.sources=. \
      -Dsonar.test.inclusions=src/**/*.ts \
      -Dsonar.exclusions=src/entities/*.ts,src/index.ts,src/**/*.test.ts,src/**/*.spec.ts \
      -Dsonar.host.url=$SONAR_URL \
      -Dsonar.login=$SONAR_AUTH"  
  
  ]; 


// Job for Docker Build & Push
  
  var dockerPack = new Job("docker-packaging");
  
  dockerPack.image = "docker:dind";
  dockerPack.privileged = true;                              // dind needs to run in privileged mode
  
  dockerPack.env = {
    
    DOCKER_DRIVER: "overlay",
    
// Place these Docker credentials while creating brigade project    

    DOCKER_USER: project.secrets.dockerUser,
    DOCKER_PASS: project.secrets.dockerPass,
    DOCKER_REGISTRY: project.secrets.dockerRegistry
 
  }
    
  dockerPack.tasks = [
    
    "dockerd-entrypoint.sh &",                                  // Start the docker daemon
    "sleep 30",                                                 // Grant it enough time to be up and running
    "cd /src",                                                  // Go to the project checkout dir
    "docker build -t $DOCKER_REGISTRY:latest .",                // Replace with your own image tag
    "docker login -u $DOCKER_USER -p $DOCKER_PASS",             // Login to Dockerhub
    "docker push $DOCKER_REGISTRY:latest"                       // Replace with your own image tag
  
  ];
  
  
// Job for Deploying Application On Minikube 
  
  var deploy = new Job("deploy-application", "bitnami/kubectl")
  
  deploy.tasks = [
  
    "cd /src",  
    
// Applying yaml file
    
    "kubectl apply -f mongodb.yaml",
    "kubectl apply -f starterkit.yaml"
  
  ];
  
  build.storage.enabled = true
  unit.storage.enabled = true
  sonar.storage.enabled = true 
  dockerPack.storage.enabled = true
  deploy.storage.enabled = true
  
  
  Group.runEach([build, unit, sonar, dockerPack, deploy]);

});
