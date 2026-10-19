# Security Policy

## Scope and platform

This repository is a static website intended for GitHub Pages deployment. It does not include a backend service, database, or server-side request handling in this repository.

## Reporting a vulnerability

Please report suspected security issues by opening a GitHub issue in this repository with:

- a clear description of the issue,
- affected page(s) or file(s),
- reproduction steps,
- impact assessment.

Do not include secrets, passwords, tokens, API keys, or private personal data in reports.

## Known static-site limitations

- Client-side validation is only a usability measure and does **not** replace server-side validation, rate limiting, or abuse prevention.
- The contact form is handled by a third-party service (FormSubmit). Spam/abuse risk exists for any public form endpoint, even with CAPTCHA and honeypot fields enabled.
- Security headers and runtime protections depend on the hosting platform configuration (GitHub Pages and third-party services).

## Secrets handling

Never commit secrets to this repository, including:

- API keys
- access tokens
- private credentials
- certificate private keys
- sensitive personal data
