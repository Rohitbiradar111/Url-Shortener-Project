<div align="center">
  <div>
    <a href="https://lnk1.netlify.app" target="_blank">
      <img src="https://github.com/user-attachments/assets/7ed7c8b2-93e0-45e6-bf7d-f1f869352635" alt="Project Image">
    </a>
  </div>
  <h1 align="center">ClipIt - URL Shortener</h1>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 💡 [Overview](#overview)
2. 👩‍💻 [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. 📖 [Documentation](#documentation)
5. 📫 [Contribute](#contribute)
6. 🐛 [Issues](#issues)

## <a name="overview">💡 Overview</a>

ClipIt is a full-stack URL shortener with built-in AI URL Safety Scan powered by React, Spring Boot, MySQL, and Redis.

## <a name="tech-stack">👩‍💻 Tech Stack</a>

- React
- Spring Boot
- MySQL
- Redis
- Tailwind CSS
- Google Gemini AI
- Docker

## <a name="features">✨ Features</a>

- Transforms long, cumbersome URLs into short, manageable links and automatically generates ready-to-scan QR codes for quick sharing.
  
- Uses MySQL to map unique short-codes to original destination URLs with high data integrity.

- Checks links for phishing, scams, and malicious websites using the Google Gemini API before saving them.

- Caches active links in Redis for fast redirection, with an automatic MySQL fallback so links still work even if Redis is down.

- Tracks visitor clicks for each link so users can easily monitor link activity and performance.

- Links automatically expire after 5 days, and an automated background cron job cleans up expired records to keep the database fast.
  
- Provides a private dashboard for users to manage their links, secured by Spring Security and JWT authentication.

- Built with a clean Spring Boot REST API backed by global exception handling, logging, multi-environment Spring profiles, and automated JUnit testing.

- Containerized with a multi-stage Docker build for lightweight, consistent, and easy cloud deployment.

## <a name="documentation">📖 Documentation</a>

[React](https://react.dev/)

[Spring Boot](https://docs.spring.io/spring-boot/index.html)

[MySQL](https://dev.mysql.com/doc/)

[Tailwind CSS](https://tailwindcss.com/docs)

[Redis](https://redis.io/docs/)

[Docker](https://docs.docker.com/)

## <a name="contribute">📫 Contribute</a>

Contributions are always welcome. Please follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`).
3. **Make your changes** and commit them (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/your-feature-name`).
5. **Open a pull request**.

Please make sure to update tests as appropriate.

## <a name="issues">🐛 Issues</a>

If you encounter any issues while using or setting up the project, please check the issues section to see if it has already been reported. If not, feel free to open a new issue detailing the problem.

When reporting an issue, please include:

- A clear and descriptive title.
- A detailed description of the problem.
- Steps to reproduce the issue.
- Any relevant logs or screenshots.
- The environment in which the issue occurs (OS, browser, Node.js version, etc.).
