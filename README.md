# Eco Service Request Portal

## Description

This front-end application is built using AWS Amplify and React. It includes user authentication, displays static content from an S3 bucket, and provides a mini portal where authenticated users can submit service requests. Submitted requests are saved to DynamoDB via AWS AppSync (GraphQL API) and dynamically displayed on the UI.

The project is designed with an eco-friendly theme using pastel colors. The application features a modern, responsive design with:
- A custom sliding window gallery that displays up to 5 images from S3 at a time.
- A service request form with automatic resolution date calculation based on severity:
  - **Low:** +5 days
  - **Medium:** +3 days
  - **High:** +1 day
- Dynamic refresh of the list of service requests immediately after a new submission.
- A default login page provided by Amplify Auth, with optional custom theming.

## Features

- **User Authentication:** Users sign in using Amazon Cognito through Amplify’s built-in UI.
- **Static Content Display:** Fetches images from an S3 bucket and displays them in a sliding window gallery.
- **Service Request Portal:**
  - **Form Fields:** 
    - Service Request Name
    - Service Request Description
    - Creation Date (DD/MM/YYYY)
    - Severity (Low, Medium, High)
    - Reporter Name
    - Contact Information (Email)
    - Location
    - Resolution Date (auto-calculated)
  - **Auto-calculated Resolution Date** based on severity:
    - Low = +5 days
    - Medium = +3 days
    - High = +1 day
  - **Unique Case Number:** Automatically generated (using UUID).
  - **Dynamic Data Display:** Submitted requests are stored in DynamoDB and shown in a table below the form.
- **Modern UI/UX:** Uses a pastel color palette and smooth animations to create an eco-friendly, modern interface.
- **Custom Theme for Authenticator (Optional):** The default Amplify login page can be themed using custom tokens.

## Technologies Used

- **AWS Amplify** for hosting, auth, GraphQL API, and storage (S3).
- **Amazon Cognito** for user authentication.
- **Amazon S3** for static content (images).
- **AWS AppSync & DynamoDB** for GraphQL API and data persistence.
- **React** as the front-end framework.
- **Day.js** for date manipulation.
- **UUID** for unique case number generation.
- **@aws-amplify/ui-react** for built-in authentication UI (with optional theming).

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/eco-service-request-portal.git
   cd eco-service-request-portal
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure AWS Amplify:**

   Ensure you have the Amplify CLI installed:
   ```bash
   npm install -g @aws-amplify/cli
   ```

   Configure Amplify:
   ```bash
   amplify configure
   ```

   Initialize the Amplify project:
   ```bash
   amplify init
   ```

   Add Authentication:
   ```bash
   amplify add auth
   ```

   Add API:
   ```bash
   amplify add api
   ```

   Add Storage:
   ```bash
   amplify add storage
   ```

   Push the configuration:
   ```bash
   amplify push
   ```

   Generate GraphQL code:
   ```bash
   amplify codegen
   ```

4. **Place the Background Image (Optional):**
   - Well not working right now :(

5. **Run the Application:**

   ```bash
   npm start
   ```

## Project Structure

```
.
├── public
│   └── res
│       └── background_img.jpg
├── src
│   ├── components
│   │   ├── Gallery.js
│   │   ├── NavigationBar.js
│   │   ├── ServiceRequestForm.js
│   │   └── ServiceRequestList.js
│   ├── graphql
│   │   ├── queries.js
│   │   ├── mutations.js
│   │   └── subscriptions.js
│   ├── App.js
│   ├── index.js
│   └── aws-exports.js
├── package.json
└── README.md
```

## Assumptions and Trade-offs

- The application uses Amplify’s default `withAuthenticator` for authentication (or `<Authenticator>`).  
- The gallery displays a maximum of 5 images at a time using a sliding window approach. If there are more than 5 images, navigation arrows cycle through them.  
- The resolution date is automatically computed based on severity (Low=+5 days, Medium=+3 days, High=+1 day).  
- Inline styles are used for demonstration. In a production environment, consider using external CSS or a CSS-in-JS solution for better maintainability.  
- Pastel colors were chosen to reflect an eco-friendly theme.  

- **Login instructions**: Use your Cognito user credentials or register an account.

## Conclusion

This application demonstrates effective integration of AWS Amplify services, including authentication via Amazon Cognito, static content fetching from S3, and data management using AWS AppSync and DynamoDB. The UI/UX is designed with a modern, eco-friendly aesthetic using pastel colors and smooth animations.

Happy exploring! And thanks for giving me the chance to build this amazing project!
