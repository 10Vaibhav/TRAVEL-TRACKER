# Travel Tracker

A web application that allows users to track and visualize countries they have visited on a world map. Users can add family members and manage their travel histories individually.

## Features

- Interactive world map visualization
- Multi-user support with family member profiles
- Color-coded country tracking per user
- Country name autocomplete and validation
- PostgreSQL database integration
- Error handling for duplicate entries and invalid countries

## Screenshots

### Main Interface with Multiple Users
![Main Interface](./Output%20Images/vaibhav.png)
The main interface showing a world map with highlighted countries (UK, France, and India) in turquoise color Visited by Vaibhav. The interface includes user tabs for "Vaibhav," "Rajani," and "Bhimrao" along with an "Add Family Member" option.

### Canada and France Visualization
![Canada and France](/Output%20Images/Rajani.png)
Map view showing visited countries in light blue, specifically highlighting Canada and France, with a total country count of 2 Visited by Rajani.

### Australia and Greenland View
![Australia and Greenland](/Output%20Images/Junior%201%20(that%20added%20recently).png)
Map displaying visited countries in green, featuring Australia and Greenland marked as visited territories by Junior 1.

### Asia Region Focus
![Asia Region](/Output%20Images/bhimrao.png)
Focused view of the Asian region with India and Japan highlighted in red travel by Bhimrao, demonstrating the multi-country selection feature.

### Add Family Member Interface
![Add Family Member](/Output%20Images/add%20memeber.png)
The interface for adding new family members, featuring:
- A text input field for the name ("Junior 1")
- A color picker with 10 different color options
- A teal-colored "ADD" button
- Clean, user-friendly design on a dark background

## Technology Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv for environment variables
- EJS for templating

### Frontend
- HTML/CSS
- JavaScript
- SVG World Map

## Database Schema

### Users Table
```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) UNIQUE NOT NULL,
    color VARCHAR(15)
);
```

### Visited Countries Table
```sql
CREATE TABLE visited_countries(
    id SERIAL PRIMARY KEY,
    country_code CHAR(2) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up PostgreSQL database and create tables using the provided SQL code
4. Create a `.env` file with the following variables:
   ```
   user=your_db_user
   host=your_host
   database=your_database
   password=your_password
   port=your_port
   ```
5. Start the server:
   ```bash
   node index.js
   ```
6. Access the application at `http://localhost:3000`

## Features in Detail

### Country Addition
- Input validation for country names
- Automatic capitalization
- Error handling for:
  - Already visited countries
  - Non-existent countries

### User Management
- Add new family members
- Customize user color schemes
- Switch between user profiles
- Individual travel tracking per user

## Error Handling

The application includes comprehensive error handling for:
- Duplicate country entries
- Invalid country names
- Database connection issues
- User validation

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

