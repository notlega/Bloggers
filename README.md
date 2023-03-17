# Bloggers

This is a blog made using NextJS

## Table of Contents

- [Installation](#installation)
- [Code Coverage](#code-coverage)

## Installation

1. Clone the repository

```bash
git clone git@github.com:notlega/express-jest-ci.git
```

2. Install dependencies

```bash
npm ci
```

3. Build the project

```bash
npm run build
```

4. Run the tests

```bash
npm run e2e:headless
```

5. View cypress coverage

```
npm run coverage
```

## Code Coverage

Code coverage is basically the same as test coverage, the percentage of code that has been covered by tests

I have setup a way for developers to view their code coverage at the end of the GitHub Actions workflow

```yml
preview-deploy:
    if: ${{ github.event_name == 'pull_request' }}
    runs-on: ubuntu-latest
    needs: ['prepare', 'e2e-tests']
    steps:
      - uses: actions/checkout@v3

      - name: Installs cypress-coverage
        uses: actions/download-artifact@v3
        with:
          name: cypress-coverage
          path: coverage

      - name: Deploy branch coverage to Netlify as preview
        uses: jsmrcaga/action-netlify-deploy@v2.0.0
        with:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          build_directory: coverage/lcov-report
          install_command: "echo Skipping installing the dependencies"
          build_command: "echo Skipping building the web files"

      - name: Status check
        uses: Sibz/github-status-action@v1.1.6
        with:
          authToken: ${{ secrets.GITHUB_TOKEN }}
          context: Netlify preview
          state: success
          target_url: ${{ env.NETLIFY_PREVIEW_URL }}
```

This uses Netlify's production and preview deployments to deploy the static website containing the code coverage

When a pull request is made, the branch will be tested and the code coverage will be deployed to a preview deployment

When the pull request is merged, the code coverage will be deployed to the production deployment

This will allow developers to view the coverage within the develop and main branches at all time
