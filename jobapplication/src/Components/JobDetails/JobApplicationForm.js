import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './jobApplicationForm.css';

const JobApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    skills: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  const validate = () => {
    if (!form.fullName || !form.email || !resumeFile) {
      setError('Please fill your name, email, and attach a resume.');
      return false;
    }
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email);
    if (!emailOk) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Simulate API submission; replace with real endpoint when available
      const payload = {
        jobId: id,
        ...form,
        resumeName: resumeFile?.name,
      };
      await new Promise((res) => setTimeout(res, 1000));
      console.log('Application submitted:', payload);
      setSuccess('Application submitted successfully!');
      // Optionally navigate back to job details
      // navigate(`/jobs/${id}`);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="apply-app-container">
      <div className="apply-card">
        <h2 className="apply-title">Apply for this Job</h2>
        <p className="apply-subtitle">Job ID: {id}</p>
        <form className="apply-form" onSubmit={onSubmit}>
          <label className="apply-label" htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="apply-input"
            placeholder="Your full name"
            value={form.fullName}
            onChange={onChange}
            required
          />

          <label className="apply-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="apply-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="apply-label" htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="apply-input"
            placeholder="Optional"
            value={form.phone}
            onChange={onChange}
          />

          <label className="apply-label" htmlFor="skills">Key Skills</label>
          <input
            id="skills"
            name="skills"
            type="text"
            className="apply-input"
            placeholder="e.g., React, Node.js, SQL"
            value={form.skills}
            onChange={onChange}
          />

          <label className="apply-label" htmlFor="resume">Resume (PDF/DOC)</label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="apply-file"
            onChange={onResumeChange}
            required
          />

          <label className="apply-label" htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            className="apply-textarea"
            placeholder="Tell us why you're a great fit"
            rows={6}
            value={form.coverLetter}
            onChange={onChange}
          />

          {error && <p className="apply-error">{error}</p>}
          {success && <p className="apply-success">{success}</p>}

          <div className="apply-actions">
            <button type="button" className="apply-secondary" onClick={() => navigate(`/jobs/${id}`)}>Back</button>
            <button type="submit" className="apply-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
