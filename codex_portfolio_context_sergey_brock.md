# Codex Context: Portfolio Website for Sergey Brock

This file gives Codex the background it does not have about Sergey’s skills, experience, project history, and preferred positioning. Use it as the main product/context brief when building a personal portfolio website.

## 1. Who the portfolio is for

The website should present Sergey as a QA Engineer with strong manual QA experience, growing automation skills, and practical experience testing complex backend, cloud, billing, payment, and event-driven systems.

The target audience is recruiters, hiring managers, and engineering teams looking for:
- QA Engineer / Middle+ QA Engineer
- Manual QA with strong backend/system testing experience
- QA Automation Engineer in transition/growth
- QA Engineer for cloud, fintech, healthcare, billing, payment, or SaaS products
- QA who can investigate deeply, write clear documentation, and understand business logic

Preferred tone:
- Professional, clear, practical
- Confident but not exaggerated
- More “strong engineer who understands systems” than “generic tester”
- Avoid buzzword-heavy marketing language
- Emphasize real problem-solving and ownership

## 2. Short professional positioning

Sergey Brock is a QA Engineer with around 10 years in IT and around 6 years in QA, currently focused on testing complex healthcare billing and payment systems. His strongest areas are manual QA for backend and distributed systems, API testing, integration testing, log-based investigation, test design, and business-critical payment/billing flows.

He is also actively developing automation skills with Playwright and TypeScript, including E2E, API, component tests, mocks, and setting up automation frameworks from scratch in personal projects.

A good headline could be:

> QA Engineer focused on backend, API, cloud, billing, and payment systems

Alternative headline:

> QA Engineer who turns complex business logic into clear, testable, reliable systems

## 3. Current professional profile

Current role:
- QA Engineer at DataArt Solutions, Inc.
- Working on a US healthcare technology client/project
- Strong Middle QA level
- Main domain: healthcare billing, patient payments, invoices, ledgers, payment processing, and integrations with medical practice systems

Core strengths:
- Manual testing of complex backend systems
- API and integration testing
- Testing AWS-based microservices and event-driven flows
- Understanding of billing/payment business logic
- Investigation through logs, database checks, and system behavior
- Writing test plans, checklists, bug reports, and documentation
- Mentoring junior QA engineers
- Participating in requirement clarification, technical discussions, demos, and shift-left QA activities

## 4. Main project experience to highlight

### Healthcare Billing & Payment Platform

A cloud-based patient billing and payment platform for medical practices.

Important areas Sergey tested:
- Patient bill generation and updates
- Payment processing
- Patient-facing payment portal
- Cardholder Data Environment / secure embedded payment form
- Billing ledgers, charges, credits, payment plans, guarantors, and patient accounts
- Dunning / notification schedules
- On-hold bill logic
- Autopay limits and payment scheduling
- Integration flows with practice management systems
- Event-driven updates through AWS services
- Data consistency and versioning with DynamoDB

Suggested portfolio section title:
> Healthcare Billing & Payment Platform

Suggested description:
> Tested a cloud-based healthcare billing and payment platform used by medical practices. Focused on backend, API, integration, and payment flows where data consistency, security, and business logic accuracy were critical.

Suggested bullets:
- Designed and executed test scenarios for billing, ledger, invoicing, payment, and notification workflows.
- Tested API and integration flows across AWS-based microservices.
- Validated asynchronous event processing using queues, logs, and downstream data checks.
- Investigated defects through CloudWatch, Graylog, Grafana, API responses, and database state.
- Verified payment edge cases including card-on-file, autopay limits, failed flows, and asynchronous payment recording.
- Worked with complex business rules around bill status, insurance-related holds, credits, payment plans, and patient communication schedules.

## 5. Domain knowledge to represent

### Billing and payment logic
Sergey has tested systems involving:
- Bills
- Charges
- Ledgers
- Patient balances
- Guarantors
- Payment plans
- Credits
- Card payments
- Card on File
- Autopay
- Payment limits
- Billing notifications / dunning schedules
- Secure embedded card forms / CDE-like cardholder data isolation

### Event-driven systems
Sergey has worked with:
- AWS Lambda
- Step Functions
- DynamoDB
- SQS
- DLQ behavior
- Event queues
- Event bus style flows
- Asynchronous processing
- Version/order protection with version stamps
- Backend services where API request success does not always mean final business completion

### Testing style
Sergey is good at:
- Thinking through edge cases
- Understanding what can break in a distributed flow
- Testing not only “happy path” but failure/retry/incomplete-flow scenarios
- Checking logs and downstream data to confirm real system behavior
- Translating vague requirements into testable scenarios

## 6. Automation experience

Sergey is building and using automation mainly with:
- TypeScript
- JavaScript
- Playwright
- API tests
- E2E tests
- Component tests
- Mocks
- Test framework setup from scratch in personal projects

Important nuance:
Do not present Sergey as a pure senior automation engineer with many years of production automation ownership. Present him as a strong QA engineer with practical automation experience and a clear automation growth path.

Suggested text:
> Alongside manual and backend QA work, Sergey develops automation with Playwright and TypeScript. He has experience writing E2E, API, and component tests, using mocks, and setting up automation frameworks from scratch in personal projects.

## 7. Personal projects to include

### Language Learning / Memo Card App

Sergey has a TypeScript-based personal project for language learning.

Project idea:
- User translates a word
- The app saves it as a memo card
- Uses Supabase for database and auth
- Uses external services for translations/images/audio
- Has or is planned to have Playwright tests
- Can be used to demonstrate frontend + backend + testing thinking

Tech/context:
- TypeScript
- Supabase
- Auth
- Database
- External API integration
- Playwright tests
- Possible languages: Armenian and Greek
- TTS/audio storage through Supabase

Suggested portfolio project title:
> Language Learning Memo Cards

Suggested description:
> A personal TypeScript project for saving translated words as reusable memo cards. The project combines authentication, database storage, external API integrations, and automated tests.

Suggested bullets:
- Built around real learning needs rather than a toy example.
- Uses Supabase for user data and authentication.
- Integrates translation, image, and audio resources.
- Serves as a playground for Playwright E2E, API, and component testing.

### Dog Owner / Dogsitter Platform Concept

Sergey has planned a portfolio/API project for dog owners and dog sitters.

Important concept:
- Owners and dog sitters interact through a service
- The frontend actions should also be available through an API
- There is a “contract” entity tracking the relationship between owner and sitter
- Contract may include status, dates, payment confirmation, and chat

Suggested portfolio project title:
> Dog Sitting Service API Concept

Suggested description:
> A planned API-first service for dog owners and dog sitters, designed to demonstrate product thinking, API modeling, and testability.

Suggested bullets:
- API should support the same actions available in the UI.
- Contract entity tracks sitter-owner relationship state.
- Includes concepts for status, dates, payments, confirmations, and chat.
- Good candidate for future API tests, E2E tests, and documentation examples.

### AI Book Q&A / Vector DB Concept

Sergey wants to create an application where a user uploads a book and asks questions about it using AI and a vector database.

Suggested title:
> AI Book Q&A Concept

Suggested description:
> A planned AI-assisted application where a book is indexed into a vector database and users can ask contextual questions about its content.

Good to include only as “planned / experimental” unless implemented.

## 8. Technical skills to show

### Testing
- Manual testing
- Backend testing
- API testing
- Integration testing
- E2E testing
- Component testing
- Test design
- Risk-based testing
- Exploratory testing
- Regression testing
- Defect investigation
- Test documentation
- Bug reporting
- Requirement analysis
- Shift-left QA

### Automation
- Playwright
- TypeScript
- JavaScript
- API automation
- E2E automation
- Component testing
- Mocks
- Test framework setup
- Page Object Model awareness
- Test data setup / cleanup awareness

### Backend / Cloud / Data
- REST API
- AWS Lambda
- AWS Step Functions
- DynamoDB
- SQS
- DLQ
- CloudWatch
- Event-driven architecture
- SQL basics and complex queries
- NoSQL databases
- MongoDB
- MS SQL
- Logs and monitoring

### Tools
- Postman
- Insomnia
- Jira
- Confluence
- Git
- GitHub
- Graylog
- Grafana
- CloudWatch
- VS Code
- IntelliJ IDEA
- SoapUI
- Test IT

### Dev / Ops basics
- Linux command line
- SSH
- Docker basics
- Docker Compose basics
- Node.js basics
- Supabase
- DigitalOcean / VPS usage

## 9. Soft skills and working style

Emphasize:
- Deep investigation mindset
- Clear documentation
- Ability to explain technical topics
- Mentoring junior QA engineers
- Collaboration with developers and product owners
- Structured thinking
- Ownership of quality
- Good at finding root causes, not just reporting symptoms
- Comfortable with complex business rules
- Practical approach: tests should reduce risk, not exist for appearance

Do not overstate:
- Do not claim deep production DevOps ownership.
- Do not claim senior-level automation if not supported.
- Do not claim expert mobile automation.
- Do not present every concept as a finished production project.

## 10. Portfolio site structure suggestion

Recommended pages/sections:

### Home
Purpose:
- Strong headline
- Short summary
- CTA buttons: “View Projects”, “Download CV”, “Contact”

Example hero:
> QA Engineer for complex backend, API, billing, and payment systems.

Subtext:
> I test cloud-based systems where correctness, data consistency, and edge cases matter — from healthcare billing and patient payments to event-driven AWS workflows.

### About
Include:
- 10 years in IT, 6 years in QA
- Current focus on healthcare billing/payment systems
- Backend/API/system testing
- Automation growth with Playwright and TypeScript
- Interest in complex systems, root-cause analysis, and clear documentation

### Experience
Main card:
- DataArt Solutions, Inc.
- QA Engineer
- Healthcare billing/payment platform
- Responsibilities and achievements

### Projects
Include:
1. Healthcare Billing & Payment Platform
2. Language Learning Memo Cards
3. Dog Sitting Service API Concept
4. AI Book Q&A Concept, if desired as experimental

### Skills
Group by:
- Testing
- Automation
- Backend & Cloud
- Tools
- Databases
- Dev basics

### Case Studies
Useful case study cards:
1. Asynchronous payment recording
2. Autopay limit validation
3. Dunning schedule / bill notification logic
4. AWS event flow investigation
5. Playwright test framework for personal project

### Contact
Include:
- Email
- LinkedIn placeholder
- GitHub placeholder
- Location: Armenia / open to remote, if desired

## 11. Suggested case study content

### Case Study: Asynchronous Payment Recording

Problem:
Payment flows can fail partially. A frontend checkout/session flow may not complete, but the secure card entry/payment environment may still send an event that confirms the transaction.

What Sergey tested:
- Successful payment flow
- Interrupted frontend flow
- Backend event processing
- Queue behavior
- Final transaction state
- Logs and database records
- Failure routing to DLQ or error queue

Value:
This shows that Sergey understands distributed systems and does not rely only on UI confirmation.

### Case Study: Autopay Maximum Visit Amount

Problem:
Autopay can have a maximum allowed payment amount. The system must correctly choose between full bill amount and configured maximum.

Test cases:
- Maximum amount lower than bill amount
- Maximum amount higher than bill amount
- Maximum amount equal to bill amount
- Bill amount changed after schedule creation
- Notification amount matches expected payment behavior
- Actual transaction amount matches expected cap

Value:
Shows business-rule testing and edge-case thinking.

### Case Study: Dunning and On-Hold Bills

Problem:
Patient bills have notification schedules. Some bills should pause communication when insurance-related planned charges are pending.

Test areas:
- Initial notice
- Courtesy notices
- Past due notices
- Final notice
- Schedule reset rules
- On-hold status
- Resume behavior when pending balance becomes zero

Value:
Shows ability to test state machines, schedules, and domain-specific business logic.

## 12. Visual/style guidance

Suggested visual direction:
- Clean technical portfolio
- Dark or light theme both acceptable
- Prefer readable typography
- Use cards for projects and case studies
- Avoid overloaded animations
- Use diagrams or simple flow visuals for backend/event-driven experience
- Use tags/badges for tools and skills
- Make the site easy to scan

Potential design style:
- Minimal SaaS/engineering portfolio
- Sections with clear hierarchy
- Subtle code/system diagram accents
- Maybe include simple architecture-flow cards:
  API → Queue → Lambda → DynamoDB → Logs/Monitoring

## 13. What the site should NOT do

Avoid:
- Fake metrics
- Overclaiming automation seniority
- Generic “I am passionate about quality” filler
- Too many unrelated personal details
- Making every planned idea look production-ready
- Dense walls of text
- Listing every technology without context

## 14. Suggested concise copy snippets

### Hero headline
QA Engineer for complex backend, API, billing, and payment systems.

### Hero subheadline
I test cloud-based products where correctness, data consistency, and edge cases matter — from healthcare billing and patient payments to AWS event-driven workflows.

### About snippet
I am a QA Engineer with around 10 years in IT and around 6 years in QA. My strongest experience is testing complex backend systems, APIs, integrations, billing logic, and payment workflows. I combine careful manual testing with automation practice in Playwright and TypeScript.

### Skills intro
My focus is not only finding bugs, but understanding why they happen: business rules, data flow, logs, queues, database state, and user impact.

### Projects intro
These projects show both production experience and personal engineering practice: healthcare billing systems, Playwright automation, API-first product design, and AI/vector database experiments.

## 15. Suggested implementation details for Codex

Build the site so content is easy to edit.

Recommended stack if not otherwise specified:
- React + TypeScript
- Vite or Next.js
- CSS modules, Tailwind, or plain CSS
- Static content stored in a structured file such as `src/data/profile.ts`
- Components:
  - Hero
  - About
  - Experience
  - Skills
  - Projects
  - CaseStudies
  - Contact
  - Footer

Keep the content separated from presentation.

Example data model:
- `profile`
- `skills`
- `projects`
- `caseStudies`
- `experience`
- `contacts`

The first version should prioritize:
1. Strong content
2. Readability
3. Mobile responsiveness
4. Clean layout
5. Easy editing

Advanced extras can come later:
- Downloadable CV
- Blog/articles section
- Architecture diagrams
- GitHub project links
- Light/dark theme toggle
- PDF resume generation
