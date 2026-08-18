function CurrentActivities() {
  return (
    <div className="content text-dark w-100 test-border-red">
      <div className="info-group">
        <header>
          <h2 className="m-0">Personal Projects</h2>
          <h5 className="m-0">Managing the whole endeavor, from ideation to implementation and deployment.</h5>
        </header>

        <div className="entry-list">
          <div className="mb-2">
            <h4 className="m-0">Charlie's Little Office</h4>
            <p className="fs-13 mb-1">Project Type: free, for public usage</p>

            <h5 className="section-title mb-1">Disrupting the "6-Second Review" Bias</h5>

            <p className="fs-12 mb-1">On average, recruiters spend only <strong>6 seconds</strong> scanning a static
              resume, leading to rapid, unconscious bias based on formatting, name, or educational pedigree.</p>
            <p className="fs-12 mb-1">By transforming the review process into an interactive gameplay mechanic,
              we <strong>increase the reader's cognitive engagement</strong>.</p>
            <p className="fs-12 mb-2">Because the data is delivered through structured game loops, recruiters focus on core
              competencies and verified skills rather than surface-level heuristics.</p>

            <h5 className="section-title mb-1">Here's a quick XYZ "formula" for the project.</h5>

            <p className="fs-12">A new anti-bias (ATI-Fair) and anti-fraud résumé reading ecosystem which neutralizes the cognitive screening bias, measured by the 100% elimination of the 6-second review bias and effective built-in bot and scraping defenses, by applying an inverted gamification architecture via "monomyth design" using Christopher Vogler’s narrative framework and replacing rapid-scan resume skimming with spatial exploration of a digital-twin home-office.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentActivities;
