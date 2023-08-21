## Contents

- [Description](#description)
- [Why our project?](#why-our-project)
- [Project goals](#project-goals)
- [Technological stack](#technological-stack)
- [Setup and local development](#setup-and-local-development)
- [Scripts](#scripts)
- [Usage](#usage)

## Description <a name="description"></a>

#### Welcome to our eCommerce application!

Unleash Your Pet Store Dream with our PetJoy eCommerce Platform!
Are you envisioning a thriving online pet store where pet owners can find everything their furry companions need? Look no further than PetJoy, your ultimate partner in turning your pet business dream into reality

This platform replicates real-world shopping experiences in a digital environment 🏪.
It's a comprehensive online shopping portal that provides an interactive and seamless experience to users.
From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px.
This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

### Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

## Why our project? <a name="why-our-project"></a>

## :dog::cat::rabbit:

Join hands with PetJoy and transform your pet business idea into a successful reality. With our robust platform, extensive features, and customer-focused approach, your online pet store will become a go-to destination for pet owners seeking quality products and a genuine connection. Let's make your pet store dream a thriving digital reality with PetJoy! 🐕🐈

### Here's why our project is the ultimate destination for all your needs:

- **Seamless Shopping Experience:** Easily add your favorite items to the cart and breeze through the checkout process.

- **Personalization for You:** User registration and login functionality enhances your experience, making it easy to manage orders and tailor preferences for your pets.

- **Swift Product Discovery:** Navigate our range with ease, thanks to powerful search functionality that helps you find exactly what your pets need.

- **Organized and Accessible:** Categories and sorting options enhance your shopping journey, offering efficient and engaging browsing sessions.

- **Flexible Promotion Creation:** Empower Your Pet Store with Dynamic Promotions and Offers!

With our responsive design and robust CommerceTools-powered foundation, we aim to create a joyful and carefree shopping journey for pet enthusiasts.

## Project goals <a name="project-goals"></a>

The main goals of our eCommerce application are:

- Provide an immersive and seamless online shopping experience.
- Allow users to explore a wide range of products with detailed descriptions.
- Enable users to add products to their basket and proceed to checkout effortlessly.
- Implement user registration and login for a personalized experience.
- Incorporate search, categorization, and sorting features for easy product discovery.
- Create a responsive design to ensure compatibility with various devices.
- Utilize CommerceTools as a reliable and powerful commerce solution for a robust platform.

The application is powered by CommerceTools 🌐, a leading provider of commerce solutions for B2C and B2B enterprises.
CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

## Technological stack <a name="technological-stack"></a>

<p align="center">
<img width="40" src="https://user-images.githubusercontent.com/1072928/224541607-4bebbd74-c9a0-4ffc-8b14-e117894a2be0.png">
<img width="40" src="https://user-images.githubusercontent.com/1072928/224541636-cf5a6322-e229-4bbb-b01a-c9b1a3ffd10c.png">
<img width="40" src="https://user-images.githubusercontent.com/11247099/145112184-a9ff6727-661c-439d-9ada-963124a281f7.png">
<img width="40" src="https://user-images.githubusercontent.com/1072928/224541674-efab49b1-5261-4562-8f57-21d778433a5d.svg">
<img width="40" src="https://avatars.githubusercontent.com/u/13142323?s=200&v=4">
<img width="40" src="https://avatars.githubusercontent.com/u/33663932?s=200&v=4">
<img width="40" src="https://www.svgrepo.com/show/354262/react-router.svg">
<img width="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/eslint/eslint.png?size=48">

</p>

<p align="center">
    <h4 align="center"> TypeScript, Vite, Vitest, React, Redux, MUI, React Router, ESLint </h1>
  </a>
</p>

## Setup and Local Development <a name="setup-and-local-development"></a>

#### Getting started

To get started with this project, follow these steps:

1. Clone the project repository using Git:

   ```bash
   $ git clone https://github.com/EvgenKlo/eCommerce-Application.git
   ```

2. Navigate to the project directory:
   ```bash
   $ cd eCommerce-Application
   ```
3. Install the project dependencies (Node.js must be installed):
   ```bash
   $ npm install
   ```
4. Start the project in development mode:
   ```bash
   $ npm run dev
   ```

These commands will clone the project to your local machine, install the necessary dependencies, and start the project in development mode.
After executing these steps, your project should be set up and running locally.

## Scripts <a name="scripts"></a>

In this section, you will find the available scripts to manage your project and instructions on how to use them.

`npm run dev`

- Starts the development server using Vite, enabling you to work on your project with hot module replacement and other development features.

`npm run build`

- Builds your project for production. It first transpiles TypeScript files using `tsc`, and then generates a production build using Vite.

`npm run lint`

- Runs ESLint to check the syntax of your TypeScript and TypeScript React files (`*.ts`, `*.tsx`) in the `src` directory. It displays errors and warnings found during the check.

`npm run lint:fix`

- Runs ESLint to check the syntax of your TypeScript and TypeScript React files (`*.ts`, `*.tsx`) in the `src` directory and automatically fixes fixable issues.

`npm run preview`

- Starts a development server that allows you to preview your project before building it for production using Vite.

`npm run prepare`

- Installs Husky, a tool used for setting up Git hooks, which allows you to run scripts automatically at certain stages of the Git workflow.

`npm run lintstaged`

- Runs lint-staged to run ESLint only on the files that were staged for commit, improving performance for pre-commit hooks.

`npm run style`

- Uses stylelint to lint your CSS files (`*.css`) in the `src` directory and report any issues found during linting.

`npm run test`

- Runs tests using `vitest`.

`npm run coverage`

- Runs a codebase test coverage check.

Feel free to use these commands to manage and develop your project.
You can run each of them by executing the respective `npm run` command in your terminal.

## Usage <a name="usage"></a>

Before committing your changes, please follow these guidelines:

#### Commitlint

Commitlint is a tool used to enforce commit message format and rules. It applies specific rules and templates to commit messages to ensure consistency and a clear understanding of each commit's purpose.

For more information, visit the [Conventional Commits website](https://www.conventionalcommits.org/en/v1.0.0).

#### Code Linting

We use `ESLint` for linting JavaScript code, `Prettier` for automatic code formatting, and `Stylelint` for linting CSS code. This enables us to maintain a consistent coding style and high-quality code across the project.

Make sure your code passes the linting and formatting checks before committing.

#### Git Hooks

We have set up `Git Hooks` to automate pre-commit checks. The pre-commit hook ensures that your code passes linting and other checks before committing changes. This helps catch issues early and maintain code quality throughout the development process.

#### Deployment Restriction

To maintain a stable and organized development process, direct deployments to the `main` and `development` branches are not allowed. Instead, we follow the feature-branch workflow and create pull requests for merging changes into these branches. This approach ensures that changes are properly reviewed, tested, and approved before being merged into the main codebase.

By adhering to these guidelines and best practices, we can collaborate effectively and create high-quality code for our project.
