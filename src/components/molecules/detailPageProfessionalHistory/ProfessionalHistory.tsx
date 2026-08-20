function ProfessionalHistory() {
  return (
    <div className="content text-dark w-100">
      <div className="info-group">
        <header>
          <h2 className="m-0">Nisum</h2>
          <h3 className="m-0">Full-Stack Developer (FSD) & SDET</h3>
          <h5 className="m-0">Senior | Contractor | Remote</h5>
        </header>

        <div className="entry-list">
          <div className="mb-2">
            <h4 className="m-0">Compliance Platform (Migration to AWS)</h4>
            <p className="fs-13">Customer: Kipu Health (2025-2 / 2026-2)</p>
            <ul className="fs-12">
              <li>Achieved 0% downtime after migration and completed the transfer of ~12 Terabyte (TB) of data (c compliance, system and user-generated files, usage and telemetry logs) by integrating 10 system feat with S3, implementing MinIO for development environments and creating a batch processing command to copy files.</li>
              <li>Stabilized a HIPAA-compliant production environment as measured by over 50% drop in peak resource utilization and zero subsequent server failures by normalizing + optimizing (indexing, queries,  MySQL database, applying good practices and design patterns and migrating heavy business logic from front-end to high-performance backend services.</li>
              <li>[QA] Achieved a 100% adoption across 4 departments (EMR/EHR, CRM, RCM, GRC) as foundation for company-wide migration towards Playwright by creating a framework-agnostic Playwright + TypeScript en framework from scratch, designing a sequential test-chaining engine that mirrors end-to-e journeys and creating a seamless database-agnostic data-hydration pipeline.</li>
            </ul>
          </div>

          <div className="mb-2">
            <h4 className="m-0">Taxation API - Project Recovery</h4>
            <p className="fs-13">Customer: Toast Inc. (2024-3 / 2024-8)</p>
            <ul className="fs-12">
              <li>[DEV] Led the technical turnaround of a high-risk taxation API, acting as dual Technical Lead and Quality Architect for a 3-person team to deliver a critical integration with Vertex Tax Technology..</li>
              <li>[DEV] Re-engineered the core system architecture by re-creating the OpenAPI definition, implementing complex inter-state transaction logic in Kotlin, and establishing a shift-left testing strategy using the PACT framework.</li>
              <li>[QA] Designed and deployed a full-stack test automation framework for a mission-critical taxation API, covering mobile, web, and backend layers.</li>
              <li>[QA] Built end-to-end regression and smoke suites utilizing Selenium and Appium (Android), while implementing PACT framework contract testing to validate API integration with the existing ecosystem.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalHistory;
