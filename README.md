# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## What would I do?

If I'd have more time or if this would be a larger-scale application, I would prioritize the following enhancements:

1. **Code Quality and Testing**: Improve code quality, add unit and make sure the coverage is above 95%, and set up end-to-end tests for robust functionality. 

2. **User Interface**: Enhance the UI with transitions, animations, styled error states, and introduce code splitting with suspense and lazy loading.

3. **Project Structure**: Consider moving the project to Vite from CRA, create a generic component library for commonly used components, and establish a theme and variables for CSS. 

4. **State Management**: Leverage a state management library like Redux or MobX, and modularize the project structure for maintainability. This includes creating additional helper functions and improving their placement.

5. **Functionality Enhancements**: 
   - Add autofocus to inputs for immediate typing when adding/editing cards or columns.
   - Combine add/edit card functions into a single helper function for use in NewCard/EditCardModal components.
   - Implement sorting by priority and drag-drop functionality for cards within the same list.
   - Enable auto-scrolling to a new card if it's not within the user's view.
   - Allow assignment of tickets (cards) to users, with functionality to add/remove users.
   - Make the application more responsive, starting with mobile-first design and adding styles for small-medium devices.
   - Centralize type definitions in a single file within the each components folder.
   - Use styled-components or CSS modules for better CSS management and to avoid style conflicts.