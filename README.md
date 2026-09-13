# Full Stack Open Part 6

Current state-management exercise suite: Zustand Unicafe, Zustand Anecdotes with backend persistence, and TanStack Query Anecdotes with context-based notifications.

The supplied automated test projects are included alongside the applications.

## Repository contents

This repository contains the final local application versions for Part 6, including source files, package lockfiles, and available tests. Run npm ci in each application directory to install its dependencies; use the scripts in its package.json to run it. Local environment secrets and dependency folders are excluded.

## Course submission

Final application versions and separate repositories per part are allowed by the [course submission rules](https://fullstackopen.com/en/part0/general_info/#submitting-exercises). Uploading to GitHub does not mark exercises complete in the course submission system. Mark only completed exercises after finishing all intended work for this part.

## Updated submission format

This is a separate submission repository for this part. The official app and test directories live directly at the repository root, alongside `.github` and `.gitignore`.
The course states that passing automated tests are mandatory from September 21. Official test assertions are preserved, and the workflows run on pushes to `main`.

- Applications: `unicafe`, `anecdotes`, `query-anecdotes`.
- Official tests: `unicafe-tests`, `anecdotes-tests`, `query-anecdotes-tests`.
- Five enabled workflows: Unicafe, Anecdotes browser tests, Anecdotes unit-test quality checks, and the two Query Anecdotes suites.

Run `npm ci` in each app and test directory. In each browser test directory run `npx playwright install chromium`, then `npm test`. For the Zustand unit tests, run `npm test` inside `anecdotes`. The provided quality scripts in `anecdotes-tests` also check that tests exist, assert behavior, and fail when store updates are disabled.

Source: https://fullstackopen.com/en/part6/flux_architecture_and_zustand/#submission-repository

## Verification of submission update

All 33 official browser tests passed locally using installed Google Chrome. GitHub workflows use the original Chromium configuration. All application production builds passed.
Five Zustand store unit tests passed, together with all three official test-quality checks.
