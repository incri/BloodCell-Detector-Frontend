# BloodCell-Detector-Frontend

## Overview

BloodCell-Detector-Frontend is a user-friendly interface developed using React and TypeScript, designed to provide an exceptional user experience for the BloodCell-Detector project. The frontend leverages Chakra UI for a consistent and appealing UI/UX, ensuring that users can easily interact with the blood cell detection capabilities provided by the backend service.

## Features

- **React + TypeScript**: Built with React for a dynamic and responsive UI, and TypeScript for type safety and improved development experience.
- **Chakra UI**: Utilizes Chakra UI for modern, accessible, and highly customizable components.
- **User Authentication**: Implements secure user authentication with an `AuthProvider` and `useAuth` hook.
- **Protected Routes**: Ensures that only authenticated users can access certain routes using a `ProtectedRoute` component.
- **Patient Management**: Allows users to register patients, view patient details, and manage blood test data.
- **Blood Test Processing**: Enables users to upload images, process them with the backend service, and view labeled results with counts of RBC, WBC, and Platelets.
- **Responsive Design**: Designed to be fully responsive and accessible on various devices.
- **State Management**: Efficient state management using React Query for data fetching and caching.
