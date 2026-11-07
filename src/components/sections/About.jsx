const STAGES = [
  {
    num: '01',
    title: 'Today',
    text: 'NEXCRAFT is independent and founder-led. Brendan Okonji designs, builds and delivers the work personally, so there is one conversation and no layers between an idea and the result.',
  },
  {
    num: '02',
    title: 'Approach',
    text: 'Design and development are treated as a single process. Brand, interface and code are decided together, so the finished product feels coherent instead of assembled.',
  },
  {
    num: '03',
    title: 'Direction',
    text: 'The goal is to grow NEXCRAFT into a full creative technology practice, bringing in collaborators and capabilities as the work calls for them, without lowering the standard of craft.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-light" aria-labelledby="about-heading">
      <div className="section-label">Section 01</div>
      <h2 className="section-heading" id="about-heading">About <em>NEXCRAFT</em></h2>
      <div className="about-grid reveal">
        <div className="about-left">
          <p className="about-lead">
            Design and engineering, done by the same hands.
          </p>
          <p className="about-text">
            <strong>NEXCRAFT</strong> is an independent creative technology studio. It brings web development, interface design, graphic design, branding and workflow automation into one practice, so a project can move from identity to interface to working system without being handed from one party to the next.
          </p>
          <p className="about-text">
            The studio's belief is simple: <strong>a digital presence should earn trust before it asks for attention.</strong> That means clear structure, honest writing, considered typography, and code that is built to be maintained rather than only launched.
          </p>
        </div>
        <ol className="about-stages">
          {STAGES.map((s) => (
            <li className="about-stage reveal" key={s.num}>
              <span className="about-stage-num">{s.num}</span>
              <div>
                <h3 className="about-stage-title">{s.title}</h3>
                <p className="about-stage-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
