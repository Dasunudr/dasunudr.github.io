export const portfolioData = {
  profile: {
    name: "Dasun Udara",
    username: "dasunudr",
    title: "Cybersecurity Analyst & Penetration Tester",
    shortBio: "B.Sc. Cybersecurity Student | Specializing in Network Security, Threat Analysis, and Pentesting. Building secure scripts and hunting threats in local and cloud environments.",
    email: "dasun.udara.sec@gmail.com", // Mock contact email
    github: "https://github.com/dasunudr",
    linkedin: "https://linkedin.com/in/dasunudr", // Mock profile
    twitter: "https://twitter.com/dasunudr", // Mock profile
    tryhackme: "https://tryhackme.com/p/dasunudr", // Mock THM
    hackthebox: "https://hackthebox.com/u/dasunudr", // Mock HTB
    featuredCertification: {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      dateEarned: "October 2025",
      id: "SEC-938502-DU",
      image: "/images/security_plus.png",
      description: "Demonstrates core knowledge of network security, threat management, identity management, cryptography, and operational compliance. Globally recognized as the baseline standard for cybersecurity professionals."
    }
  },
  certifications: [
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      dateEarned: "Oct 2025",
      id: "SEC-938502-DU",
      image: "/images/security_plus.png",
      description: "Core cybersecurity skills covering threat detection, risk management, secure system architecture, and incident response."
    },
    {
      title: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      dateEarned: "Jan 2026",
      id: "CEH-827402-DU",
      image: "/images/ceh_badge.png",
      description: "Advanced methodology for footprinting, network scanning, system hacking, malware analysis, social engineering, and evasion tactics."
    },
    {
      title: "TryHackMe Red Team Pathway",
      issuer: "TryHackMe",
      dateEarned: "Dec 2025",
      id: "THM-RED-8930",
      image: "/images/thm_badge.png",
      description: "Completed comprehensive training on Active Directory exploitation, initial access vectors, post-exploitation, and stealth evasion."
    },
    {
      title: "Hack The Box Pro Hacker",
      issuer: "Hack The Box",
      dateEarned: "Feb 2026",
      id: "HTB-PRO-58291",
      image: "/images/htb_badge.png",
      description: "Demonstrated intermediate-to-advanced penetration testing skills by successfully pwning active Linux, Windows, and Active Directory environments."
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      dateEarned: "Jul 2025",
      id: "AWS-CLF-39201",
      image: "/images/aws_badge.png",
      description: "Validates overall understanding of AWS Cloud platform, focusing on IAM, VPC security groups, AWS KMS encryption, and basic compliance structures."
    }
  ],
  timeline: [
    {
      year: "2023 - 2024",
      title: "Call Agent",
      category: "Rupeestar loan company - India",
      description: "Managed customer communication, handled customer services, and managed client relations in a professional call operations ecosystem.",
      skills: ["Client Relations", "Call Operations", "Active Listening", "Communication Skills"],
      milestone: "beginner"
    },
    {
      year: "Dec 2024 - Apr 2025",
      title: "Digital Content Creator",
      category: "A&A Vilas - Colombo",
      description: "Created and produced visual content, captured key moments, and crafted topic-focused reels to enhance brand storytelling and audience engagement.",
      skills: ["Video Production", "Brand Storytelling", "Audience Engagement", "Content Strategy"],
      milestone: "intermediate"
    },
    {
      year: "Jan 2025",
      title: "CCNA Training Program",
      category: "University of Moratuwa - Sri Lanka",
      description: "Completed comprehensive Cisco Certified Network Associate training, acquiring foundation expertise in routing protocols, subnets, switches, and network security policies.",
      skills: ["IP Routing", "Subnetting", "Switching Security", "VLAN Configuration"],
      milestone: "intermediate"
    },
    {
      year: "Academic",
      title: "BSc Hons in Computer Networks & Cybersecurity",
      category: "KIU University",
      description: "Pursuing academic degree specializing in defensive computing, penetration testing methodologies, cryptography foundations, and enterprise network design.",
      skills: ["Network Security", "Cryptography", "Enterprise Architectures", "Vulnerability Auditing"],
      milestone: "advanced-intermediate"
    },
    {
      year: "Nov 2025 - Present",
      title: "Junior SOC Analyst",
      category: "Cryptogen",
      description: "Perform 24/7 security monitoring, threat triage, and log correlation using FortiSIEM, Google Chronicle, and LogRhythm SIEM. Conduct threat hunting by analyzing endpoint and network logs, map actions to MITRE ATT&CK tactics, utilize EDR/XDR tools, and compile Cyber Threat Intelligence (CTI) reports.",
      skills: ["FortiSIEM", "Google Chronicle", "LogRhythm", "EDR/XDR Solutions", "MITRE ATT&CK", "Threat Hunting", "CTI Reporting"],
      milestone: "current"
    }
  ],
  projects: [
    {
      id: "sentinel-ids",
      name: "SentinelIDS",
      shortDesc: "A lightweight, Scapy-powered Network Intrusion Detection System detecting anomalies and brute-force patterns.",
      fullDesc: "SentinelIDS is an open-source, custom Network Intrusion Detection System (NIDS) designed for home labs and small-scale subnets. It captures packets directly from the interface card to flag patterns matching port scans, anomalous ICMP triggers, or SSH authentication floods.",
      problem: "Commercial IDS systems (like Snort or Suricata) require heavy resource overhead and extensive configuration, which is suboptimal for basic home labs or Raspberry Pi network nodes.",
      techStack: ["Python", "Scapy Engine", "Syslog Integration", "React.js Dash", "Discord Hooks"],
      features: [
        "Real-time packet capture, decoding, and evaluation against signature files.",
        "JSON-based customizable signature definition schema.",
        "Detection rules for TCP SYN/FIN scans, ICMP flooding, and SSH brute-forcing.",
        "Real-time alerts directed to system logs and a Discord Webhook API channel."
      ],
      outcome: "Deployed on a local Raspberry Pi Gateway. Successfully identified 100% of testing Nmap scans and Hydra dictionary attacks with negligible CPU footprint (under 3% average).",
      screenshot: "/images/sentinel_ids.png"
    },
    {
      id: "vortex-scanner",
      name: "VortexScanner",
      shortDesc: "Automated black-box vulnerability scanner targeting SQLi, XSS, and broken HTTP headers.",
      fullDesc: "VortexScanner is an automated vulnerability scanner that acts as an initial security assessment tool. It crawls a target web application, maps its endpoints, and runs parameterized payloads to test validation filters for common vulnerabilities.",
      problem: "Securing modern web apps requires tedious manual audits. Automating initial payload delivery for cross-site scripting and database injection saves hours of diagnostic time.",
      techStack: ["Python", "Go Engine", "Docker Containers", "React UI Dashboard", "OWASP APIs"],
      features: [
        "Recursive link crawling and parameter parsing.",
        "Heuristic payloads detecting Reflected, Stored, and DOM-based Cross-Site Scripting (XSS).",
        "Blind, Time-based, and Error-based SQL Injection validation.",
        "Beautiful PDF vulnerability diagnostic reports referencing CVE tags."
      ],
      outcome: "Designed and implemented. Discovered several input sanitization bugs on mock target containers. Built a React frontend showing vulnerability severity rings.",
      screenshot: "/images/vortex_scanner.png"
    },
    {
      id: "vault-crypt",
      name: "VaultCrypt",
      shortDesc: "A secure, local CLI password manager utilizing AES-256-GCM and Argon2id key derivation.",
      fullDesc: "VaultCrypt is a secure offline credentials vault built to operate in terminal shells. It enforces military-grade local encryption, ensuring passwords remain secure even if host directories are compromised offline.",
      problem: "Cloud-hosted password stores expose corporate and personal passwords to supply-chain compromises. An offline, open-source local vault gives absolute storage sovereignty.",
      techStack: ["Python", "Cryptography Library", "Argon2id KDF", "AES-256-GCM", "SQLite"],
      features: [
        "Master passphrase verification backed by memory-hard Argon2id key derivation.",
        "Authenticated encryption (AES-GCM) protecting the credentials database.",
        "Automatic clipboard clearing within 15 seconds to prevent data leakage.",
        "Database integrity checks through HMAC validation."
      ],
      outcome: "Passed security audits showing zero plain-text passwords in runtime process memory. Currently used daily for personal credential vault management.",
      screenshot: "/images/vault_crypt.png"
    },
    {
      id: "aegis-soc",
      name: "AegisSOC Dashboard",
      shortDesc: "A security operations dashboard visualizing server authentication logs and firewall activities.",
      fullDesc: "AegisSOC compiles system logs from multiple Linux hosts, parsing authentication success/failure states and visualizes the geographic origins of attacks via GeoIP integrations.",
      problem: "System logs `/var/log/auth.log` are massive, dense, and difficult to comprehend dynamically, delaying responses to coordinated botnet authentication scans.",
      techStack: ["React.js", "ChartJS", "FastAPI Parser", "Linux Syslog", "GeoIP API"],
      features: [
        "Real-time background parsing of syslog / auth.log outputs.",
        "Geographic mapping displaying threat origins based on public GeoIP databases.",
        "Failed attempt alerting thresholds with visual notifications.",
        "Charts showing attack volumes segmented by target username, protocol, and source IP."
      ],
      outcome: "Reduced log-to-visual response time from hours to instantaneous, quickly flagging dynamic botnet IPs scanning SSH ports.",
      screenshot: "/images/aegis_soc.png"
    }
  ],
  skills: [
    {
      category: "Networking & Infrastructure",
      items: [
        { name: "TCP/IP Protocols", level: 90 },
        { name: "DNS & DNSSEC", level: 85 },
        { name: "Firewalls & Rule Writing", level: 80 },
        { name: "VPN Configurations", level: 80 },
        { name: "Wireshark Packet Analysis", level: 85 }
      ]
    },
    {
      category: "Cybersecurity Tools",
      items: [
        { name: "Nmap Network Scanning", level: 95 },
        { name: "Burp Suite Web Proxy", level: 80 },
        { name: "Metasploit Framework", level: 85 },
        { name: "Splunk SIEM (Alert Triage)", level: 75 },
        { name: "John the Ripper / Hashcat", level: 80 }
      ]
    },
    {
      category: "Programming & Cryptography",
      items: [
        { name: "Python (Scapy, Requests)", level: 90 },
        { name: "Bash Shell Scripting", level: 85 },
        { name: "JavaScript / Node.js", level: 80 },
        { name: "AES & RSA Cryptography", level: 75 }
      ]
    },
    {
      category: "DevOps & Cloud Security",
      items: [
        { name: "Docker Containerization", level: 80 },
        { name: "Linux Admin (RedHat, Debian)", level: 85 },
        { name: "AWS Security (IAM, VPC, KMS)", level: 70 },
        { name: "Git & GitHub Actions (CI-CD)", level: 75 }
      ]
    }
  ]
};
