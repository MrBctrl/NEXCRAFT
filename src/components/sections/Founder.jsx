import NanoText from '../shared/NanoText.jsx'
import NanoBlock from '../shared/NanoBlock.jsx'
// Skills are grouped by how they are actually used. "Working" means used
// in real projects; "Developing" means actively being learned. No
// percentages: they implied precision that cannot honestly be claimed.
const SKILL_GROUPS = [
  {
    label: 'Build',
    working: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'PHP', 'MySQL', 'Supabase'],
    developing: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    label: 'Design',
    working: ['Figma', 'UI / UX design', 'Graphic design', 'Branding & identity', 'Website layout', 'CorelDRAW'],
    developing: [],
  },
  {
    label: 'Automate',
    working: ['n8n workflows', 'App & service integration', 'Operational automation'],
    developing: [],
  },
]

const EDUCATION = [
  { place: 'ISCOM University, Cotonou', detail: 'Computer Science' },
  { place: 'IFA TOSSI', detail: 'Final-year studies, Computer Science' },
]

export default function Founder() {
  return (
    <section id="founder" className="section-dark" aria-labelledby="founder-heading">
      <div className="section-label accent-label">Section 02</div>
      <NanoText className="section-heading light-heading" id="founder-heading">The <em>Founder</em></NanoText>

      <div className="founder-grid">
        <figure className="founder-photo">
          <NanoBlock className="founder-photo-frame" cols={7} rows={8}>
            <img
              src="/images/brendan-okonji.png"
              alt="Portrait of Brendan Okonji, founder of NEXCRAFT, wearing a dark blazer over a white open-collared shirt against a blue background"
              width="567"
              height="525"
              loading="lazy"
              decoding="async"
            />
          </NanoBlock>
          <figcaption>
            <span className="founder-cap-name">Brendan Okonji</span>
            <span className="founder-cap-role">Founder · Developer · Designer</span>
          </figcaption>
        </figure>

        <div className="founder-body">
          <div className="reveal">
            <p className="founder-lead">
              I'm Brendan Okonji, a Computer Science graduate who designs and builds for the web.
            </p>
            <p className="founder-text">
              NEXCRAFT is the studio I founded to do that work independently, and for now I'm the one doing all of it: the design, the code, the automation and the conversations in between.
            </p>
            <p className="founder-text">
              My work sits where software development meets visual design. I build interfaces with HTML, CSS, JavaScript and React, shape them in Figma, and give them an identity through graphic design and branding. I also build n8n workflows that connect applications and take repetitive operational work off people's hands.
            </p>
            <p className="founder-text">
              What I enjoy most is making useful digital experiences and solving practical problems with technology and design.
            </p>
          </div>

          <div className="founder-skills reveal">
            <div className="founder-skills-head">
              <span className="founder-block-label">Skills &amp; tools</span>
              <span className="founder-legend" aria-hidden="true">
                <span className="founder-legend-item"><i className="skill-chip-sample"></i>In use</span>
                <span className="founder-legend-item"><i className="skill-chip-sample dev"></i>Developing</span>
              </span>
            </div>
            {SKILL_GROUPS.map((g) => (
              <div className="skill-group" key={g.label}>
                <h3 className="skill-group-label">{g.label}</h3>
                <ul className="skill-chips">
                  {g.working.map((s) => <li className="skill-chip" key={s}>{s}</li>)}
                  {g.developing.map((s) => (
                    <li className="skill-chip dev" key={s}>
                      {s}<span className="visually-hidden"> (currently learning)</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="founder-edu reveal">
            <span className="founder-block-label">Education</span>
            <ul>
              {EDUCATION.map((e) => (
                <li key={e.place}>
                  <strong>{e.place}</strong>
                  <span>{e.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="founder-cta reveal">
            <a href="#work" className="btn-primary">See the Work</a>
            <a href="#contact" className="btn-secondary">Start a Conversation</a>
          </div>
        </div>
      </div>
    </section>
  )
}
