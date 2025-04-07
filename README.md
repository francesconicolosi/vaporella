# Vaporella: A Jira User Access Cleansing tool

## Description
This application allows you to manage user access for Jira and Confluence by identifying inactive users and updating their permissions. Inactive users are identified based on the number of months of inactivity specified by the user. The application allows you to remove access to Jira and Confluence, leaving only access to Jira Service Management.

## Features
- **Specify Inactivity Period**: Users can specify the number of months of inactivity to identify inactive users.
- **Fetch Inactive Users**: The application fetches inactive users from Jira based on the specified inactivity period.
- **Update Permissions**: The application allows you to remove access to Jira and Confluence for inactive users, leaving only access to Jira Service Management.
- **User-Friendly Interface**: The application features a simple and intuitive user interface.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vaporella.git
   cd vaporella
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local server**:
   ```bash
   live-server
   ```

## Usage
1. **Configuration**:
    - Open the `index.html` file in your browser.
    - Enter the Jira Base URL, Jira API Token, Jira Email, and the number of months of inactivity.

2. **Fetch Inactive Users**:
    - Click the "Fetch Inactive Users" button to retrieve inactive users.

3. **Update Permissions**:
    - Click the "Confirm" button next to each user to update their permissions.

## Contributions
If you would like to contribute to this project, feel free to open a pull request or report issues in the repository.

## License
This project is licensed under the ISC License. See the LICENSE file for more details.