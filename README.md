# Example of Laravel-API - Nginx - NextJs-SPA in Kubernetes

### Folders
- lara-api Laravel app
- nextjs-spa frontend SPA.
- docker configs to create docker images.
- lara-kube Helm charts to deploy to Kubernetes (in progress)
- lara-kube.yaml - config to deploy to the Kubernetes
- terraform not implemented yet ...

## Commands
Build docker images
```
docker build -t kubnginx:<tag> (0.0.8) -f docker/nginx/Dockerfile .
docker build -t php-fpm83:0.0.1 -f docker/php/Dockerfile .
docker build -t kubnextjs-app:0.0.1 -f docker/nextjs/Dockerfile .
```

### Azure
Login to the azure and login to the Azure Container Registry
```
az login
az acr login --name <ACR_NAME>
```
Tag the Docker Image: Replace <ACR_NAME> and <IMAGE_NAME> with your ACR name and desired image name:
```
docker tag <local-image>:<tag> <ACR_NAME>.azurecr.io/<IMAGE_NAME>:<tag>
```
Push the Image:
```
docker push <ACR_NAME>.azurecr.io/<IMAGE_NAME>:<tag>
```

### Kubernetes
```
kubectl apply -f lara-kube-azure.yaml
```
or for minikube
```
kubectl apply -f lara-kube.yaml
```

```
kubectl get pods
kubectl get servises
kubectl get ingress
kubectl logs <pod_name> -c <container_name>
kubectl exec <pod_name> -c <container_name> -- ls -la
```

## Local deployment with minikube
install minikube, then:
```
minikube start
minikube addons enable ingress
minikube image load kubnginx:0.0.7
minikube dashboard
```
add minikube IP to the /etc/hosts
```
192.168.49.2 lara-kube.lcl
```

###Swith between azure and minikube
```
minikube stop
kubectl config get-contexts
az aks get-credentials --resource-group <myResourceGroup> --name <myAKSCluster>
or next time:
kubectl config use-context <myAKSCluster>
```
Create mysql-secret secret
```
kubectl create secret generic mysql-secret \
  --from-literal=MYSQL_ROOT_PASSWORD=your-root-password \
  --from-literal=MYSQL_DATABASE=your-database-name \
  --from-literal=MYSQL_USER=your-user-name \
  --from-literal=MYSQL_PASSWORD=your-user-password
```