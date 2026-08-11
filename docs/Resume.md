#cabp #officeRpgCv
## Playwright Testing Framework

### Situation

- Multiple features had 0% test coverage
- Bugs re-appeared from time to time
- Ent-2-End testing was inexistent

### Task

- Integrate Playwright into the Compliance Platform (i.e. a Symfony monolith)

### Actions

1. Architectured and implemented a framework-agnostic Playwright + TypeScript E2E testing and test strategy from scratch.
2. Created a database-agnostic data-hydration pipeline paired with local MinIO storage, AWS S3 for production and GitHub Actions.
3. Included a sequential test-chaining engine that mirrors end-to-end user journeys using Gherkin.

### Results

1. Eliminated manual regression testing.
2. Introduced smoke testing.
3. Reduced manual testing overhead.
4. Ensured test coverage of medical compliance features from 0% to 83.3%
5. My framework became the company-wide E2E framework for Symfony and Ruby on Rails.

---
