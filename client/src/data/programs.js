/**
 * Public program catalogue.
 * Do not add revenue-share, partner commercials, or internal agreements here.
 */

export const PROGRAM_AUDIENCES = [
  {
    id: 'schools',
    label: 'Schools',
    kicker: 'Grade 3–12',
    summary:
      'Hands-on Robotics and STEM for school students — weekends, after school, and campus workshops.',
    programs: [
      {
        id: 'weekend-robotics',
        code: 'PRG_01',
        category: 'Schools',
        name: 'Weekend Robotics + Activity Program',
        duration: 'Per term',
        format: 'Sat + Sun · Morning & afternoon batches',
        fee: 'Priced per term',
        interest: 'School Program',
      },
      {
        id: 'after-school',
        code: 'PRG_02',
        category: 'Schools',
        name: 'Weekday After-School Program',
        duration: 'Per term',
        format: 'Mon–Thu · 4:30–7:30 PM',
        fee: 'Priced per term',
        interest: 'School Program',
      },
      {
        id: 'school-workshops',
        code: 'PRG_03',
        category: 'Schools',
        name: 'School Robotics Workshops',
        duration: '1–5 days',
        format: 'On-campus events · Grade 5–12',
        fee: '₹800–₹1,500 per student',
        interest: 'School Program',
      },
    ],
  },
  {
    id: 'college',
    label: 'College',
    kicker: 'College students',
    summary:
      'Skill Builder programs that bridge campus learning and industry-ready practice.',
    programs: [
      {
        id: 'college-skill-builder',
        code: 'PRG_04',
        category: 'College',
        name: 'College Skill Builder',
        duration: '3–4 months',
        format: 'Weekend + Hybrid',
        fee: '₹12,000–₹22,000 per student',
        interest: 'College Skill Builder',
      },
    ],
  },
  {
    id: 'professionals',
    label: 'Professionals',
    kicker: 'Job-seeking professionals',
    summary:
      'Intensive certifications for career transition and job-ready specialisation.',
    programs: [
      {
        id: 'vlsi',
        code: 'PRG_05',
        category: 'Professionals',
        name: 'VLSI Design & Verification',
        duration: '6 months',
        format: 'Intensive',
        fee: '₹65,000',
        interest: 'Job Certification',
      },
      {
        id: 'embedded-iot',
        code: 'PRG_06',
        category: 'Professionals',
        name: 'Embedded Systems & IoT',
        duration: '4–6 months',
        format: 'Certification',
        fee: '₹45,000',
        interest: 'Job Certification',
      },
      {
        id: 'robotics-automation',
        code: 'PRG_07',
        category: 'Professionals',
        name: 'Robotics & Automation Certification',
        duration: '4 months',
        format: 'Certification',
        fee: '₹42,000',
        interest: 'Job Certification',
      },
      {
        id: 'ai-ml',
        code: 'PRG_08',
        category: 'Professionals',
        name: 'AI / Machine Learning Certification',
        duration: '4 months',
        format: 'Certification',
        fee: '₹48,000',
        interest: 'Job Certification',
      },
      {
        id: 'embedded-ai',
        code: 'PRG_09',
        category: 'Professionals',
        name: 'Full-Stack Embedded AI',
        duration: '6 months',
        format: 'Premium · max 10 students',
        fee: '₹85,000',
        featured: true,
        interest: 'Job Certification',
      },
    ],
  },
  {
    id: 'institutions',
    label: 'Institutions',
    kicker: 'Schools & colleges',
    summary:
      'Turnkey lab infrastructure for Robotics, AI and Embedded Systems — with ongoing AMC.',
    programs: [
      {
        id: 'lab-setup',
        code: 'PRG_10',
        category: 'Institutions',
        name: 'Lab Setup',
        duration: 'Turnkey + AMC',
        format: 'Robotics / AI / Embedded',
        fee: '₹8 L–₹40 L per lab',
        interest: 'Lab Setup',
      },
    ],
  },
]
