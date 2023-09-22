# inflr-ms-auth

This repo is a template for Node.js microservices hosted on Google Cloud Functions. It already includes tests and linting built-in a ci workflow, as well as Google Cloud Build configureation files for continuous deployment.

You can clone this repo locally, change its remote origin to a new repo, and commit your new microservice to it. Don't forget to find and replace all mentions to "service-name" with the actual service name. Also, check npm scripts on `package.json`

If this is going to be deployed through cloud build, change the function name from 'template' to your function name in the files `cloudbuild-hml.yaml` and `cloudbuild.yaml`. If not, you can just remove these files.

## Database Config

The configuration file is in the path.

```bash
  /src/app/configs
```

There are several options for each environment.

## Creating a migration

After creating a migration using `sequelize cli`, located in `/dist/app/database/migrations`.

It is necessary to copy the migration to src `/src/app/database/migrations`.

The extension must be renamed to `.ts`.

Configure the migration as in the Example migration localized in `src/app/databse/migrations/Example.ts`.

Here goes the README.md template:

# inflr-ms-auth

Describe here the purpose of the microservice you are creating...

## Running locally

```bash
  $ npm dev
```

## ms-images

This microservice need an `ms-images` instance to handle image uploads for the application. 
We will need to register these types:

```json
[
  {
    "name": "user_image",
    "height": 500,
    "width": 500,
    "crop": false,
    "path": "users/:user_id/profile",
    "fields": [
      {
        "name": "user_id",
        "description": "Id do usuário",
        "example": "1234",
        "required": true,
        "type": "number"
      }
    ]
  },
  {
    "name": "influencer_image",
    "height": 500,
    "width": 500,
    "crop": false,
    "path": "influencers/:influencer_id/profile",
    "fields": [
      {
        "name": "influencer_id",
        "description": "Id do influenciador",
        "example": "1234",
        "required": true,
        "type": "number"
      }
    ]
  }
]
```

## Testing and linting

```bash
  $ npm test
  $ yarn lint
  $ yarn lint:fix
```
