import './About.css';

function About() {
  return (
    <div className="about-page">

      <div className="hero">
        <h1>About Avatar Universe</h1>
        <p className="subtitle">
          a fan-made tribute to the world of bending, balance, and spirit
        </p>
      </div>

      <div className="about-content">

        <section className="card air">
          <h2>What is this?</h2>
          <p>
            Avatar Universe is a fan-created project inspired by the worlds,
            characters, and lore of the Avatar franchise. This site is built
            as a creative space to share posts, ideas, and community stories
            centered around the elements: Air, Water, Earth, and Fire.
          </p>
        </section>

        <section className="card fire">
          <h2>Important Note</h2>
          <p>
            This is an unofficial fan page and is not affiliated with,
            endorsed by, or connected to Avatar Studios or its parent
            companies. All rights to original Avatar content belong to their
            respective creators.
          </p>
        </section>

        <section className="card water">
          <h2>Our Purpose</h2>
          <p>
            The goal of this project is to celebrate the Avatar universe by
            allowing fans to explore ideas, create posts, and interact with
            elemental themes in a simple and interactive platform.
          </p>
        </section>

        <section className="card earth">
          <h2>The Four Elements</h2>
          <ul>
            <li><strong>Air</strong> — freedom, movement, and balance</li>
            <li><strong>Water</strong> — adaptability and flow</li>
            <li><strong>Earth</strong> — strength and stability</li>
            <li><strong>Fire</strong> — passion and energy</li>
          </ul>
        </section>

      </div>

    </div>
  );
}

export default About;