# Personal Courses

A multi-course learning workspace using Claude's `/teach` skill for structured, stateful learning across multiple subject areas.

## Structure

Each subdirectory represents a separate course or learning area:

```
personal-courses/
├── courses/
│   ├── python-fundamentals/
│   ├── web-development/
│   ├── data-structures/
│   └── [course-name]/
└── README.md
```

## Getting Started

1. Create a new course subdirectory: `mkdir courses/my-course`
2. Enter that directory and invoke the teach skill:
   ```
   cd courses/my-course
   /teach <topic or concept>
   ```
3. The teach skill writes its state (`MISSION.md`, `lessons/`, `learning-records/`, etc.) into the course directory. Commit it to keep progress across sessions

## Using the Teach Skill

The `/teach` skill from Matt Pocock's skills plugin creates a multi-session learning environment:

- **Stateful learning**: Your progress and notes persist in files in the course directory
- **Workspace-scoped**: Each course directory maintains its own learning state
- **Session-aware**: Pick up where you left off in future sessions

Example usage:
```
cd courses/python-fundamentals
/teach "List comprehensions in Python"
```

## Project Configuration

- **Claude settings**: `.claude/settings.json` (includes Matt Pocock's skills plugin)
- **Project docs**: `CLAUDE.md` (project structure and conventions)

## Resources

- [Matt Pocock's Skills Plugin](https://github.com/mattpocock/skills)
- [Teach Skill Documentation](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md)
