import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert(`Thanks ${formData.name || 'there'}, we got your message!`)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact">
      <div className="overlay"></div>

      <div className="contact-box">
        <h1>Contact-Us</h1>
        <p>We'd love to hear from you!!</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
