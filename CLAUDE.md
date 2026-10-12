# Personal Courses — Project Documentation

## Overview

This is a multi-course learning workspace designed for structured, stateful learning across different subject areas. Each course lives in its own subdirectory and uses Matt Pocock's `/teach` skill to maintain learning state and progress.

## Structure

```
personal-courses/
├── courses/
│   └── [course-subdirectories]       # Each course holds its own teach workspace
├── .claude/
│   ├── settings.json                 # Project-scoped Claude settings
│   └── skills/teach/                 # Vendored /teach skill
├── CLAUDE.md                         # This file
├── README.md                         # Public project overview
└── .gitignore                        # Git configuration
```

## Teach Skill

A copy of the `/teach` skill is vendored in `.claude/skills/teach/` so it works in
cloud sessions (where the plugin below isn't installed). Invoke it with `/teach`.

## Installed Plugins

**mattpocock-skills** (project scope)
- Provides the `/teach` skill for stateful learning environments
- Access via `/mattpocock:teach <topic>` (fully qualified)
- Always-on context: ~1,419 tokens per session
- Other 21 skills available (code review, TDD, domain modeling, etc.)

## Course Workflow

1. **Create a course directory**: `mkdir -p courses/my-course`
2. **Invoke the teach skill**: `/teach <topic>`. The skill resolves its workspace from
   the current directory. In cloud sessions the working directory is the repo root, so
   name the course, e.g. `/teach (workspace: courses/my-course) <topic>`, and treat that
   directory as the teaching workspace.
3. **Commit learning state**: cloud containers are ephemeral. Commit and push the
   course directory at the end of each session or progress is lost.

## Teaching Workspace

The teach skill writes these files directly into the course directory (not into a
hidden `.teach/` folder), and they are tracked in git:

- `MISSION.md`: why you're learning the topic; grounds every lesson
- `RESOURCES.md`: curated trusted sources and communities
- `GLOSSARY.md`: canonical terminology
- `NOTES.md`: teaching preferences and working notes
- `lessons/*.html`: numbered, self-contained lessons
- `reference/*.html`: cheat sheets and other quick-reference docs
- `learning-records/*.md`: numbered records of what you've demonstrated you know
- `assets/*`: shared stylesheets and components reused across lessons

## Conventions

- **Course naming**: Use lowercase with hyphens (e.g., `python-fundamentals`, `web-development`)
- **Teach invocation**: Always from within the course subdirectory
- **Session isolation**: Each course's learning state is independent

## References

- [Matt Pocock's Skills Plugin](https://github.com/mattpocock/skills)
- [Teach Skill Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/teach)

## Setup Commands (Optional)

To configure issue tracking and documentation paths for the plugin:
```
/mattpocock:setup-matt-pocock-skills
```

This is optional but recommended for full plugin integration.
