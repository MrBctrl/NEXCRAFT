import { useState } from 'react'
import { submitMessage } from '../../services/messagesService.js'

const PROJECT_TYPES = [
  'Brand Identity Design',
  'Web Design & Development',
  'UI / UX Design',
  'Social Media Design',
  'Creative Design Support',
  'Something else',
]

const EMPTY_FORM = {
  name: '', email: '', phone: '', whatsapp: '', company: '', projectType: '', message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return

    setStatus('submitting')
    const { error } = await submitMessage(form)
    if (error) {
      setStatus('error')
      setErrorMsg(error)
      return
    }
    setStatus('success')
    setForm(EMPTY_FORM)
  }

  if (status === 'success') {
    return (
      <div className="contact-form contact-form-success">
        <div className="contact-form-success-icon">✓</div>
        <h3>Message sent.</h3>
        <p>Thanks for reaching out — we'll get back to you shortly.</p>
        <button className="btn-secondary" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label htmlFor="cf-name">Name *</label>
          <input id="cf-name" type="text" required value={form.name} onChange={update('name')} />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-email">Email *</label>
          <input id="cf-email" type="email" required value={form.email} onChange={update('email')} />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" type="tel" value={form.phone} onChange={update('phone')} />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-whatsapp">WhatsApp</label>
          <input id="cf-whatsapp" type="tel" value={form.whatsapp} onChange={update('whatsapp')} />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-field">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" type="text" value={form.company} onChange={update('company')} />
        </div>
        <div className="contact-form-field">
          <label htmlFor="cf-project-type">Project Type</label>
          <select id="cf-project-type" value={form.projectType} onChange={update('projectType')}>
            <option value="">Select one</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="contact-form-field">
        <label htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" rows={5} required value={form.message} onChange={update('message')} />
      </div>

      {status === 'error' && (
        <p className="contact-form-error">{errorMsg}</p>
      )}

      <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
