/**
 * ============================================================
 *  TRAINER EXPERIENCE DATA — YOUR RESUME AS A POKEMON JOURNEY
 * ============================================================
 *  Each REGION = a major era/phase of your life.
 *  Each experience = a specific job, internship, or volunteer role.
 *
 *  HOW TO CUSTOMIZE:
 *  1. Edit region eraLabel / eraSubtitle to describe that phase.
 *  2. Add/remove entries inside experiences[].
 *  3. For each entry, fill in:
 *       - name:    Job title or role name
 *       - org:     Company / university / organization
 *       - date:    Date range e.g. "Jun 2023 – Present"
 *       - type:    "work" | "volunteer" | "education" | "project"
 *       - badge:   Emoji shown on the map pin
 *       - desc:    One-line summary shown in the tooltip
 *       - details: Full description shown in the detail modal
 *       - skills:  Array of skill tags
 *       - top/left: Position on the map image (percentages)
 * ============================================================
 */

export const EXPERIENCE_DATA = {
  // ──────────────────────────────────────────────────────────
  // KANTO — Your actual experiences (all 6 roles)
  // ──────────────────────────────────────────────────────────
  kanto: {
    eraLabel: "Tazim Sheriff R",
    eraSubtitle: "AI/ML Engineer · Tech Leader · Community Builder",
    experiences: [
      {
        id: "k1",
        name: "Technical Team Member",
        org: "Ad Astra Rover Team",
        date: "Mar 2026 – Present",
        type: "work",
        badge: "⚙️",
        desc: "Full-time on-site technical team member on a rover project.",
        details:
          "Working as a full-time technical team member at Ad Astra Rover Team, contributing to rover design, development, and engineering tasks on-site.",
        skills: ["Engineering", "Teamwork", "Hardware", "Problem Solving"],
        top: "48%",
        left: "22%",
      },
      {
        id: "k2",
        name: "AI & ML Intern",
        org: "Edunet Foundation (AICTE)",
        date: "Jan 2026 – Present",
        type: "work",
        badge: "🧠",
        desc: "Remote AI & ML internship under AICTE-backed Edunet Foundation.",
        details:
          "Completing an AI & ML internship under the Edunet Foundation, supported by AICTE. Working remotely from Chennai on machine learning concepts, models, and real-world AI applications.",
        skills: ["Artificial Intelligence", "Machine Learning", "Python", "Data Science"],
        top: "38%",
        left: "48%",
      },
      {
        id: "k3",
        name: "Volunteer Organizer",
        org: "CodeSapiens – Student Community of Coders",
        date: "Dec 2025 – Present",
        type: "volunteer",
        badge: "💻",
        desc: "Organizing coding events, securing sponsors, and public speaking.",
        details:
          "Part-time volunteer at CodeSapiens. Organizing events, reaching out to sponsors for venues and goodies, event planning, and public speaking.",
        skills: ["Event Planning", "Public Speaking", "Sponsorship", "Community Building"],
        top: "68%",
        left: "48%",
      },
      {
        id: "k4",
        name: "Student Volunteer",
        org: "NSS SAIRAM",
        date: "Oct 2025 – Present",
        type: "volunteer",
        badge: "🤝",
        desc: "Full-time social service volunteer at NSS SAIRAM, Chennai.",
        details:
          "Actively serving as a full-time student volunteer with NSS SAIRAM in Chennai, contributing to national service activities, community outreach, and social welfare initiatives.",
        skills: ["Social Service", "Leadership", "Community Outreach", "Teamwork"],
        top: "48%",
        left: "42%",
      },
      {
        id: "k5",
        name: "Student Volunteer",
        org: "IEEE TEMS",
        date: "Oct 2025 – Present",
        type: "volunteer",
        badge: "⚡",
        desc: "Volunteer of IEEE Technology and Engineering Management Society.",
        details:
          "Member and student volunteer of IEEE TEMS. Engaging with the engineering management community across India, attending events, and contributing to society activities.",
        skills: ["Engineering Management", "Networking", "IEEE", "Technology"],
        top: "78%",
        left: "55%",
      },
      {
        id: "k6",
        name: "Operations Administrator",
        org: "DAKH EDU SOLUTIONS",
        date: "Nov 2025 – Mar 2026",
        type: "work",
        badge: "🏆",
        desc: "Operations Administrator — strategy, leadership & process optimization.",
        details:
          "Served as Operation Administrator at DAKH EDU SOLUTIONS. Gained expertise in operational management, process optimization, inter-departmental coordination, policy & compliance, strategic execution, leadership, analytical thinking, and continuous improvement.",
        skills: [
          "Operations Management",
          "Project Management",
          "Operational Planning",
          "Marketing",
          "Leadership",
          "Analytical Thinking",
          "Process Optimization",
        ],
        top: "48%",
        left: "55%",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // JOHTO — Placeholder (customize as needed)
  // ──────────────────────────────────────────────────────────
  johto: {
    eraLabel: "Professional Beginnings",
    eraSubtitle: "First Roles & Internships",
    experiences: [],
  },

  // ──────────────────────────────────────────────────────────
  // HOENN — Placeholder (customize as needed)
  // ──────────────────────────────────────────────────────────
  hoenn: {
    eraLabel: "Rising Trainer",
    eraSubtitle: "Current Roles & Growth",
    experiences: [],
  },

  // ──────────────────────────────────────────────────────────
  // KALOS — Placeholder (customize as needed)
  // ──────────────────────────────────────────────────────────
  kalos: {
    eraLabel: "Specialization Arc",
    eraSubtitle: "Skills & Achievements",
    experiences: [],
  },

  // ──────────────────────────────────────────────────────────
  // UNOVA — Placeholder (customize as needed)
  // ──────────────────────────────────────────────────────────
  unova: {
    eraLabel: "Future Horizons",
    eraSubtitle: "What's Next",
    experiences: [],
  },
};

// Type colors — used to render colored badges on map pins
export const TYPE_COLORS = {
  work:      { dot: "bg-poke-red",    glow: "shadow-[0_0_12px_#ff0000]", label: "text-poke-red",    tag: "bg-poke-red/20 text-poke-red" },
  volunteer: { dot: "bg-poke-yellow", glow: "shadow-[0_0_12px_#ffe500]", label: "text-poke-yellow", tag: "bg-poke-yellow/20 text-poke-yellow" },
  education: { dot: "bg-poke-blue",   glow: "shadow-[0_0_12px_#00c3ff]", label: "text-poke-blue",   tag: "bg-poke-blue/20 text-poke-blue" },
  project:   { dot: "bg-emerald-400", glow: "shadow-[0_0_12px_#34d399]", label: "text-emerald-400", tag: "bg-emerald-400/20 text-emerald-400" },
};
