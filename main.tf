# install terraform
# terraform init
# terraform validate
# terraform apply

# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.3.0"
}

provider "azurerm" {
  features {}
}

provider "azuread" {
  tenant_id = "b0abdf42-4e2a-4e89-8019-c0185a735e0a"
}

resource "azuread_domain" "custom_domain" {
  domain_name = "delivery.cloud-workflow.com"
}

resource "azuread_user" "new_user" {
  user_principal_name = "admin-wf@delivery.cloud-workflow.com"
  display_name        = "admin workflow"
  mail_nickname       = "admin_workflow"
  password            = "Duca952765!"
  force_password_change = true
}

resource "azuread_user" "new_user" {
  user_principal_name = "user-wf@delivery.cloud-workflow.com"
  display_name        = "user workflow"
  mail_nickname       = "user_workflow"
  password            = "Arfd936583#"
  force_password_change = true
}

resource "azurerm_resource_group" "rg" {
  name     = "delivery-wf"

}
