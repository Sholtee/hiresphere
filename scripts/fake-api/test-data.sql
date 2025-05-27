/*
 * File: test-data.sql
 * Project: job-ad
 *
 * Author: Denes Solti
 */
BEGIN;

CREATE TABLE role(id INTEGER PRIMARY KEY, name TEXT CHECK(LENGTH(name) <= 20));
CREATE UNIQUE INDEX idx_role_name ON role(name);
INSERT INTO role(name) VALUES ('employer');

CREATE TABLE user(id INTEGER PRIMARY KEY, name TEXT);
CREATE UNIQUE INDEX idx_user_name ON user(name);
INSERT INTO user(name) VALUES
   ('test@employer1.hu'),
   ('test@employer2.hu'),
   ('test@employer3.hu');

CREATE TABLE job(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 50),
  location TEXT NOT NULL CHECK(LENGTH(location) <= 50),
  company TEXT NOT NULL CHECK(LENGTH(company) <= 50),
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  image_base64 TEXT NOT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE UNIQUE INDEX idx_name_company ON job(name, company);
CREATE INDEX idx_location ON job(location);

CREATE TABLE tag(
  id INTEGER PRIMARY KEY,
  job_id INTEGER NOT NULL,
  color TEXT CHECK(LENGTH(color) = 7),
  value TEXT NOT NULL CHECK(LENGTH(value) <= 25),

  FOREIGN KEY (job_id) REFERENCES job(id)
);

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Junior Frontend Developer',
'Szeged',
'CodeForge Innovations',
'Join our dynamic web team to help build responsive and intuitive user interfaces with modern tools and practices.',
'# About the Role
As a **Junior Frontend Developer**, you will collaborate with designers and backend engineers to craft seamless digital experiences.

### Responsibilities
- Implement UI components using modern JavaScript frameworks
- Collaborate in Agile sprints
- Ensure cross-browser compatibility

### Requirements
- Basic knowledge of React or Vue
- Understanding of HTML/CSS and Git
- Team spirit and communication skills',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer1.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());

INSERT INTO tag(job_id, color, value)
SELECT id, '#4285F4', 'Home office available' FROM temp_last_job_id
UNION ALL
SELECT id, '#34A853', 'Cafeteria' FROM temp_last_job_id
UNION ALL
SELECT id, '#FBBC05', 'Agile team' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Warehouse Operator',
'Győr',
'LogiTrack Ltd.',
'Handle goods in a high-volume warehouse environment with a focus on accuracy and efficiency.',
'# Job Summary
We are seeking a motivated **Warehouse Operator** to join our logistics team.

### Responsibilities
- Sorting, packing, and labeling items
- Operating forklifts and pallet jacks
- Keeping inventory records updated

### Requirements
- Basic computer literacy
- Experience with warehouse equipment preferred
- Attention to detail and physical stamina',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer1.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());

INSERT INTO tag(job_id, color, value)
SELECT id, '#6ab053', 'Shift work' FROM temp_last_job_id
UNION ALL
SELECT id, '#ff6b61', 'SZÉP Card accepted' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Customer Support Specialist',
'Budapest',
'Helpline Pro Kft.',
'Provide first-line support to customers via phone, email, and chat.',
'# Role Overview
Join our **customer happiness team** to assist users in resolving their issues promptly and kindly.

### Responsibilities
- Answer queries and guide users
- Document cases and follow up
- Collaborate with QA and product teams

### Requirements
- Fluent Hungarian and English
- Strong communication skills
- Empathy and patience',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer1.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());

INSERT INTO tag(job_id, color, value)
SELECT id, '#4285F4', 'Remote possible' FROM temp_last_job_id
UNION ALL
SELECT id, '#6ab053', 'Flexible hours' FROM temp_last_job_id
UNION ALL
SELECT id, '#ff6b61', 'Health insurance' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Software QA Tester',
'Debrecen',
'TechNest Solutions',
'Test web and mobile applications to ensure bug-free releases.',
'# What You’ll Do
As a **QA Tester**, you''ll validate our software across multiple platforms.

### Responsibilities
- Manual and automated testing
- Writing test cases and documenting issues
- Participating in sprint planning

### Requirements
- Basic knowledge of test tools (e.g. Selenium)
- Good logical and analytical thinking
- Team player',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer1.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());

INSERT INTO tag(job_id, color, value)
  SELECT id, '#34A853', 'Performance bonus' FROM temp_last_job_id
  UNION ALL
  SELECT id, '#6ab053', 'Company laptop' FROM temp_last_job_id
  UNION ALL
  SELECT id, '#FBBC05', 'Agile environment' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Graphic Designer',
'Sopron',
'StudioPixel',
'Design marketing assets and UI elements for digital campaigns and applications.',
'# About the Position
We are looking for a **creative Graphic Designer** who loves crafting visual stories.

### Responsibilities
- Design social media posts and website banners
- Create UI mockups and prototypes
- Collaborate with developers and content creators

### Requirements
- Proficiency in Adobe Creative Suite or Figma
- Eye for detail and typography
- Portfolio of previous works',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer2.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());

INSERT INTO tag(job_id, color, value)
  SELECT id, '#ff6b61', 'Creative projects' FROM temp_last_job_id
  UNION ALL
  SELECT id, '#4285F4', 'Hybrid work' FROM temp_last_job_id
  UNION ALL
  SELECT id, '#6ab053', 'SZÉP Card accepted' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Mechanical Engineer',
'Kecskemét',
'AutoSys Engineering',
'Join an R&D team developing next-gen automotive components.',
'# Position Overview
AutoSys is hiring a **Mechanical Engineer** to contribute to prototyping and testing innovative parts.

### Responsibilities
- CAD modeling and simulations
- Support manufacturing process design
- Write and update documentation

### Requirements
- Degree in mechanical engineering
- Experience with SolidWorks or CATIA
- Fluent in English or German',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer2.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());

INSERT INTO tag(job_id, color, value)
  SELECT id, '#FBBC05', 'Lunch support' FROM temp_last_job_id
  UNION ALL
  SELECT id, '#34A853', 'Professional development' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Logistics Coordinator',
'Budapest',
'TransGlobal Freight',
'Coordinate domestic and international freight movement in a fast-paced logistics team.',
'# Job Overview
**TransGlobal Freight** is seeking a highly organized **Logistics Coordinator** to manage shipments and support our growing network of international clients.

### Responsibilities
- Organize transportation schedules
- Track shipments in real-time
- Liaise with customs and carriers

### Requirements
- Experience in logistics or supply chain
- Good English & problem-solving skills
- SAP knowledge a plus',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer2.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());
INSERT INTO tag(job_id, color, value)
SELECT id, '#6ab053', 'Travel reimbursement' FROM temp_last_job_id
UNION ALL
SELECT id, '#ff6b61', 'Health insurance' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Customer Support Agent',
'Debrecen',
'HelpNest Kft.',
'Assist customers via phone and chat in a friendly, solution-oriented support center.',
'# Join Our Support Team
As a **Customer Support Agent**, you’ll be the first point of contact for our customers. HelpNest is a remote-first company with offices across Hungary.

### Key Tasks
- Answer support tickets
- Maintain high CSAT scores
- Escalate bugs or requests to dev team

### Requirements
- Fluent Hungarian and English
- Clear communication
- Previous call center experience helpful',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer2.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());
INSERT INTO tag(job_id, color, value)
SELECT id, '#6ab053', 'Remote-friendly' FROM temp_last_job_id
UNION ALL
SELECT id, '#4285F4', 'Training provided' FROM temp_last_job_id
UNION ALL
SELECT id, '#fbbc05', 'Weekend shifts' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Factory Machine Operator',
'Győr',
'SteelCore Manufacturing Zrt.',
'Operate automated machinery in a precision metal parts facility.',
'# Machine Operator Role
We’re looking for mechanically inclined professionals to run CNC machines in our state-of-the-art factory.

### Duties
- Operate and monitor production equipment
- Perform quality checks
- Report malfunctions

### Qualifications
- Experience in manufacturing or technical school
- Safety-first mindset
- Shift flexibility',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer3.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());
INSERT INTO tag(job_id, color, value)
SELECT id, '#ff6b61', 'Shift work' FROM temp_last_job_id
UNION ALL
SELECT id, '#6ab053', 'Meal subsidy' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Senior Data Analyst',
'Budapest',
'QuantEdge Analytics',
'Drive business insights through data modeling, visualization and reporting.',
'# Senior Analyst Position
**QuantEdge** is seeking a **Senior Data Analyst** to lead data discovery and dashboard creation.

### Responsibilities
- Build dashboards using Power BI / Tableau
- Work with stakeholders to identify KPIs
- Clean, model and visualize complex datasets

### Required Skills
- SQL, Python or R
- 3+ years in data analytics
- Financial sector experience a plus',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer3.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());
INSERT INTO tag(job_id, color, value)
SELECT id, '#4285F4', 'Flexible schedule' FROM temp_last_job_id
UNION ALL
SELECT id, '#6ab053', 'Cafeteria' FROM temp_last_job_id
UNION ALL
SELECT id, '#ff6b61', 'Performance bonus' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

CREATE TEMP TABLE temp_last_job_id (id INTEGER);

INSERT INTO job(name, location, company, short_description, long_description, image_base64, user_id) SELECT
'Waiter / Waitress',
'Siófok',
'Lakeside Bistro',
'Serve food and drinks with a smile in a busy lakeside restaurant.',
'# We’re Hiring Waitstaff!
**Lakeside Bistro** is looking for enthusiastic and reliable **waiters/waitresses** for the summer season.

### What You’ll Do
- Take customer orders
- Ensure fast, friendly service
- Help keep dining areas clean

### Perks
- Beautiful lakefront location
- Tip-sharing system
- On-site meals during shifts',
'invalid',
(SELECT id FROM user WHERE name = 'test@employer3.hu');

INSERT INTO temp_last_job_id(id) VALUES (last_insert_rowid());
INSERT INTO tag(job_id, color, value)
SELECT id, '#6ab053', 'Seasonal job' FROM temp_last_job_id
UNION ALL
SELECT id, '#ff6b61', 'Free meals' FROM temp_last_job_id
UNION ALL
SELECT id, '#fbbc05', 'Tips included' FROM temp_last_job_id;

DROP TABLE temp_last_job_id;

/*--------------------------------------------------------------------------------------------------------------------*/

END;