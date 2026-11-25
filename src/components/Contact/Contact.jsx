import { useState } from "react";
import { Mail, GitHub, LinkedIn, Shell } from "../Icons/Icons.jsx";
import { profile, web3formsKey } from "../../data/site.js";
import "./Contact.css";

const STATUS = {
  sending: "Sending...",
  sent: "Thank you! Your message is on its way. I'll get back to you soon.",
  error: "Something went wrong sending that. Please try again or email me directly.",
  missingKey: "The form isn't connected yet. Please email me directly for now.",
};

export default function Contact() {
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return;
    if (!web3formsKey) return setState("missingKey");
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: web3formsKey,
          subject: `Portfolio message (${data.topic}) from ${data.name}`,
          from_name: "Madi Callahan portfolio",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="band contact" id="contact">
      <div className="wrap contact__grid">
        <div>
          <h2>Let's grow something together.</h2>
          <p className="contact__intro">Want to collaborate or chat? Here are the best ways to reach me:</p>
          <div className="links">
            <a className="link" href={`mailto:${profile.email}`}><Mail /> Email <small>{profile.email}</small></a>
            <a className="link" href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub <small>madscalls</small></a>
            <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn <small>Madison Callahan</small></a>
            <a className="link" href={profile.studio} target="_blank" rel="noreferrer"><Shell /> WhelkWorks.com <small>my studio</small></a>
          </div>
          <p className="contact__note">Or send a note with the form for freelance builds, collaborations or a piece from the shop.</p>
        </div>

        <form className="form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="f-name">Name</label>
            <input id="f-name" name="name" autoComplete="name" placeholder="Your name" required />
          </div>
          <div className="field">
            <label htmlFor="f-email">Email</label>
            <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div className="field field--wide">
            <label htmlFor="f-topic">What's it about?</label>
            <select id="f-topic" name="topic" defaultValue="Freelance project">
              <option>Freelance project</option>
              <option>Job opportunity</option>
              <option>Collaboration</option>
              <option>Buying art</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="field field--wide">
            <label htmlFor="f-msg">Message</label>
            <textarea id="f-msg" name="message" required />
          </div>
          <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="form__foot">
            <button className="btn btn--teal" type="submit" disabled={state === "sending"}>Send message</button>
            <p className="form__status" role="status" data-state={state === "error" || state === "missingKey" ? "error" : state}>
              {STATUS[state] || ""}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
