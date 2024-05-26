# dpg-adnl-tests

# Automation Tests for AD.nl Portal

This project contains a series of automated tests implemented using Playwright to validate the functionalities of the [AD.nl](https://ad.nl) portal.

## Test Scenarios

1. **Home Page - User Login**:
    - Verify that a user can successfully log in to the website.

2. **Home Page - Article Search**:
    - Verify that a user can search for an article.

3. **Podcast Page - Listen to Podcast**:
    - Verify that a user can interact with and listen to a podcast.

4. **Podcast Page - Open Random Podcast**:
    - Verify that a user can open randomly selected podcast correctly.

## Running the Tests

To run the tests, follow these steps:

1. **Install Playwright**:
    ```sh
    npm install
    npm init playwright@latest
    ```

2. **Execute the Tests**:
    ```sh
    npm run dpg-tests
    # or
    npx playwright test --project=dpg-media --trace=on
    ```

## Notes

- Ensure you have Node.js installed on your machine before running the commands.
- The tests include trace generation (`--trace=on`) for detailed debugging and analysis.

## Contribution

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License.