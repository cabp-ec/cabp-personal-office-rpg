function RecentHistory() {
  return (
    <div className="content text-dark w-100 test-border-red">
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
              <li>Achieved 0% downtime after migration and completed the transfer of ~12 Terabyte (TB) of data (clinical compliance, system and user-generated files, usage and telemetry logs) by integrating 10 system features with S3, implementing MinIO for development environments and creating a batch processing command to copy files.</li>
              <li>Stabilized a HIPAA-compliant production environment as measured by over 50% drop in peak resource utilization and zero subsequent server failures by normalizing + optimizing (indexing, queries, etc.) a MySQL database, applying good practices and design patterns and migrating heavy business logic from the front-end to high-performance backend services.</li>
              <li>Achieved a 100% adoption across 4 departments (EMR/EHR, CRM, RCM, GRC) as foundation for a company-wide migration towards Playwright by creating a framework-agnostic Playwright + TypeScript end-to-end test framework from scratch, designing a sequential test-chaining engine that mirrors end-to-end user journeys and creating a seamless database-agnostic data-hydration pipeline.</li>
            </ul>
          </div>

          <div className="mb-2">
            <h4 className="m-0">Taxation API - Project Recovery</h4>
            <p className="fs-13">Customer: Toast Inc. (2024-3 / 2024-8)</p>
            <ul className="fs-12">
              <li>Rescued a high-risk, failing taxation API project within an Agile/Scrum environment, measured by a 100% deficit recovery and on-time production deployment by introducing the trust triangle as part of customer relationship management and leading the integration with Vertex Tax Technology.</li>
              <li>Restored customer relations, measured by 1 customer commendation for trust building and leadership by introducing the trust triangle as part of customer relationship management and leading the integration with Vertex Tax Technology.</li>
            </ul>
          </div>

          <div className="mb-2">
            <h4 className="m-0">Clinical Trials</h4>
            <p className="fs-13">Customer: Science37 (2024-3 / 2024-8)</p>
            <ul className="fs-12">
              <li>Earned a customer commendation for quickly achieving a 30% reduction in front-end rendering latency for Next.js in an AWS infrastructure by identifying and fixing bottlenecks and implementing localization.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentHistory;
