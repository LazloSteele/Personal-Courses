# Personal Courses — Project Documentation

## Overview

This is a multi-course learning workspace designed for structured, stateful learning across different subject areas. Each course lives in its own subdirectory and uses Matt Pocock's `/teach` skill to maintain learning state and progress.

## Structure

```
personal-courses/
├── courses/
│   └── [course-subdirectories]       # Each course maintains its own .teach/ state
├── .claude/
│   └── settings.json                 # Project-scoped Claude settings
├── CLAUDE.md                         # This file
├── README.md                         # Public project overview
└── .gitignore                        # Git configuration
```

## Installed Plugins

**mattpocock-skills** (project scope)
- Provides the `/teach` skill for stateful learning environments
- Access via `/mattpocock:teach <topic>` (fully qualified)
- Always-on context: ~1,419 tokens per session
- Other 21 skills available (code review, TDD, domain modeling, etc.)

## Course Workflow

1. **Create a course directory**
   ```bash
   mkdir -p courses/my-course
   cd courses/my-course
   ```

2. **Invoke the teach skill**
   ```
   /teach "Topic or concept to learn"
   ```

3. **Learning state persists**
   - Each course maintains `.teach/` directory with learning state
   - State persists across sessions and Claude restarts
   - Pick up where you left off automatically

4. **Multiple courses coexist**
   - Each subdirectory is independent
   - Switch between courses by changing directories

## Teaching Workspace

The `.teach/` directory (created automatically by the teach skill) contains:
- Progress tracking
- Session notes
- Concept definitions
- Learning artifacts

This directory is excluded from git via `.gitignore` to keep learning state local and session-specific.

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
