import { SliderDate, ScholarBio, ResourceTool } from "./types";

// Dynamic calculations based on the current year 2026
const currentYear = 2026;
export const publicDomainYear = currentYear - 95; // 1931

export const DATES_DATA: SliderDate[] = [
  {
    date: `Before January 1, ${publicDomainYear}`,
    tagline: "Works published with or without copyright notice",
    permission: "No",
    status: "In Public Domain",
    noteId: "before1931"
  },
  {
    date: `Between 1923 and 1977`,
    tagline: "Published without a copyright notice",
    permission: "No",
    status: "In Public Domain",
    noteId: "published-without-notice-1923-1977"
  },
  {
    date: `Between 1923 and 1963`,
    tagline: "Published with notice, but not renewed after 28 years",
    permission: "No",
    status: "In Public Domain",
    noteId: "notice-no-renewal-1923-1963"
  },
  {
    date: `Between 1923 and 1963`,
    tagline: "Published with notice and copyright was renewed",
    permission: "Maybe",
    status: "Protected by Copyright (Term: 95 years from publication)",
    noteId: "notice-renewed-1923-1963"
  },
  {
    date: `Between 1964 and 1977`,
    tagline: "Published with copyright notice",
    permission: "Maybe",
    status: "Protected by Copyright (Term: 95 years from publication)",
    noteId: "published-notice-1964-1977"
  },
  {
    date: `Between 1978 and January 1, 2003`,
    tagline: "Created unpublished before 1978, but published before 2003",
    permission: "Maybe",
    status: "Protected by Copyright (Term: Declines on Jan 1, 2048)",
    noteId: "unpublished-created-before-1978-published-before-2003"
  },
  {
    date: `Between 1978 and March 1, 1989`,
    tagline: "Published without notice and without subsequent registration",
    permission: "No",
    status: "In Public Domain",
    noteId: "published-without-notice-1978-1989"
  },
  {
    date: `Between 1978 and March 1, 1989`,
    tagline: "Published without notice but registered, or published with notice",
    permission: "Maybe",
    status: "Protected by Copyright (Term: Life + 70 years / Corporate: 95 years)",
    noteId: "published-without-notice-cured-1978-1989"
  },
  {
    date: `After March 1, 1989`,
    tagline: "Published with or without copyright notice",
    permission: "Maybe",
    status: "Protected by Copyright (Term: Life + 70 years / Corporate: 95 years)",
    noteId: "published-after-1989"
  },
  {
    date: `Published after 2002`,
    tagline: "Created before 1978 and author died more than 70 years ago",
    permission: "No",
    status: "In Public Domain",
    noteId: "unpublished-created-before-1978-never-published"
  },
  {
    date: "Author living or died in the last 70 years",
    tagline: "Unpublished Works (Date of Creation)",
    permission: "Maybe",
    status: "Protected by Copyright (Term: Life of author + 70 years)",
    noteId: "unpublished-living-died-last-70",
    unpublished: true
  },
  {
    date: "Author died more than 70 years ago",
    tagline: "Unpublished Works (Date of Creation)",
    permission: "No",
    status: "In Public Domain (Expired)",
    noteId: "unpublished-died-more-than-70",
    unpublished: true
  }
];

export const NOTES_DATA: Record<string, { title: string; content: string; keyPoints: string[] }> = {
  before1931: {
    title: `Works Published Before January 1, ${publicDomainYear}`,
    content: `Under U.S. copyright law, all works first published in the United States prior to January 1, ${publicDomainYear} have entered the Public Domain due to the expiration of their statutory 95-year term. No permission is required to copy, distribute, remix, display publicly, or publish derivative works of these materials under domestic law. This covers books, sheet music, prints, photographs, and films that were launched during this period.`,
    keyPoints: [
      "Copyright has naturally expired for all works published prior to 1931.",
      "The material can be fully used commercialy or non-commercially without permission.",
      "Ensures absolute safety for archival reproduction and digitisation."
    ]
  },
  "published-without-notice-1923-1977": {
    title: "Between 1923 and 1977 - Published without Notice",
    content: "Under the provisions of the U.S. Copyright Act of 1909, works first published in the United States were strictly required to bear a formal copyright notice (the word 'Copyright' or '©', the year of publication, and the name of the copyright holder). If a work was published during these years without this mandatory notice, the work instantly entered the Public Domain upon publication, and the copyright was lost forever with no cure available.",
    keyPoints: [
      "Notice was a mandatory requirement for published works under the 1909 Act.",
      "Publishing without notice instantly dedicated the work to the Public Domain.",
      "Be careful to verify that earlier or foreign printings didn't have notice."
    ]
  },
  "notice-no-renewal-1923-1963": {
    title: "Between 1923 and 1963 - Published with Notice, but Not Renewed",
    content: "Works published with proper copyright notice between 1923 and 1963 enjoyed an initial statutory copyright term of 28 years. To secure protection for an additional term, the copyright owner was required to file a formal renewal application with the U.S. Copyright Office within the 28th year of the initial term. If no renewal was filed, the copyright expired at the end of the initial 28th year, placing the work in the Public Domain.",
    keyPoints: [
      "Initial copyright term lasted exactly 28 years.",
      "A formal renewal registration was required in the 28th year.",
      "Upwards of 85-90% of works from this period were never renewed and are now in the Public Domain."
    ]
  },
  "notice-renewed-1923-1963": {
    title: "Between 1923 and 1963 - Published with Notice & Renewed",
    content: "Works published with notice between 1923 and 1963 and successfully renewed in their 28th year are granted copyright protection for a total term of 95 years from the date of publication. In 2026, works published in 1931 and renewed are expiring, while works published in 1932 through 1963 and renewed remain protected by copyright.",
    keyPoints: [
      "Total term of protection is 95 years from first publication date.",
      "Applicable only if a renewal application was registered with the Copyright Office.",
      "Works published in 1931 expire on December 31, 2026; works from 1932 are protected through 2027."
    ]
  },
  "published-notice-1964-1977": {
    title: "Between 1964 and 1977 - Published with Notice",
    content: "Works first published with proper copyright notice between January 1, 1964 and December 31, 1977 are protected for a full term of 95 years. Under the 1992 Automatic Renewal Act amendment, the second term of renewal was automatically assigned by law without requiring the copyright owner to file renewal paperwork. Therefore, these works are guaranteed protection for 95 years.",
    keyPoints: [
      "Renewal registration was made automatic by federal statute in 1992.",
      "Protects works for a full, contiguous term of 95 years from publication.",
      "For example, a work published in 1964 is protected until December 31, 2059."
    ]
  },
  "unpublished-created-before-1978-published-before-2003": {
    title: "Created before 1978, but Published between 1978 and 2002",
    content: "Works that were created before 1978 and remained unpublished as of January 1, 1978, but were subsequently published between 1978 and December 31, 2002, are protected. To encourage the historical preservation and publication of archival manuscripts, congress guaranteed that the term of copyright for these titles would not expire before December 31, 2047.",
    keyPoints: [
      "Applies to legacy works first published in the 1978-2002 window.",
      "Copyright term is federally guaranteed to last until at least December 31, 2047.",
      "Designed specifically to reward libraries, archives, and publishers for printing unpublished history."
    ]
  },
  "published-without-notice-1978-1989": {
    title: "Between 1978 and March 1, 1989 - Published without Notice & No Cure",
    content: "Works published between January 1, 1978 and March 1, 1989 without a copyright notice entered the Public Domain unless the omission was cured. Under the 1976 Copyright Act, curing required registering the work with the Copyright Office within five years of the publication without notice and making a reasonable effort to add notice to all copies distributed in the United States after the omission was discovered.",
    keyPoints: [
      "Notice was still required under the original 1976 Act, but omission was curable.",
      "Cure required registration within 5 years and subsequent addition of notice.",
      "If curative steps were not completed, the work fell into the Public Domain."
    ]
  },
  "published-without-notice-cured-1978-1989": {
    title: "Between 1978 and March 1, 1989 - Curated or Published with Notice",
    content: "Works published with formal notice inside this date range, or published without notice but registering cured within five years, are protected by copyright. The statutory term is generally the life of the author plus 70 years, or 95 years from publication / 120 years from creation for anonymous, pseudonymous, or work-for-hire creations.",
    keyPoints: [
      "Adheres to standard modern terms from the 1976 Act.",
      "Term is measured by the natural life of the creator plus 70 years.",
      "Works for hire are protected for 95 years from publication."
    ]
  },
  "published-after-1989": {
    title: "After March 1, 1989 - Published with or without Notice",
    content: "On March 1, 1989, the United States officially joined the Berne Convention, an international copyright treaty. As a result, copyright notice became completely voluntary and optional for all works published on or after that date. The omission of a copyright notice has absolutely no impact on the copyright status of works published after March 1, 1989, which are automatically protected.",
    keyPoints: [
      "Berne Convention Implementation Act of 1988 abolished mandatory notice.",
      "Works are fully protected automatically from the moment of creation and fixation.",
      "Term of protection is the life of the author plus 70 years, or 95/120 years for works for hire."
    ]
  },
  "unpublished-created-before-1978-never-published": {
    title: "Created before 1978, Unpublished but in Public Domain",
    content: "Works created before 1978 that have never been published are protected until 70 years after the death of the author. In 2026, works by creators who died more than 70 years ago (on or before December 31, 1955) have fully entered the Public Domain.",
    keyPoints: [
      "Term is the life of the author plus 70 years.",
      "If the author's death date is not known, protection is 120 years from creation.",
      "In 2026, any unpublished work by a creator who died before 1956 is in the Public Domain."
    ]
  },
  "unpublished-living-died-last-70": {
    title: "Unpublished - Creator Living or Passed within Last 70 Years",
    content: "Unpublished works by authors who are currently living, or who passed away less than 70 years ago (after December 31, 1955), are fully protected by copyright. A license or explicit permission from the creator's estate is necessary to copy, transmit, distribute, or display these materials publicly.",
    keyPoints: [
      "Extends automatic federal copyright to unpublished materials.",
      "Term is measured by the life of the author plus 70 years to protect estates.",
      "Permission is strictly required from heirs or the copyright holder."
    ]
  },
  "unpublished-died-more-than-70": {
    title: "Unpublished - Creator Passed more than 70 Years Ago",
    content: "Unpublished works where the creator has been deceased for more than 70 years (on or before December 31, 1955) have entered the Public Domain. The concept of life plus 70 years applies equally to unpublished works, meaning legacy manuscripts from deceased historic figures are unlocked for public educational use.",
    keyPoints: [
      "Unpublished items fully expire exactly 70 years after the creator's death year.",
      "In 2026, any unpublished work of an author who died in 1955 or earlier is Public Domain.",
      "Allows scholars to freely publish ancient diaries, letters, and ledger books."
    ]
  }
};

export const SCHOLARS_DATA: ScholarBio[] = [
  {
    name: "Sara R. Benson, LLM, JD",
    title: "Assistant Professor & Copyright Librarian",
    institution: "University of Illinois Library",
    description: "Sara Benson is an Assistant Professor and the Copyright Librarian at the University of Illinois Library. She holds a JD, a Masters of Law (LLM), and an MLIS. She specializes in scholarly communications, copyright compliance, and academic open access, and hosts the highly popular podcast 'Copyright Chat' which breaks down legal developments for education.",
    podcastUrl: "http://library.illinois.edu/scp"
  },
  {
    name: "Martin Brennan",
    title: "Copyright & Licensing Librarian",
    institution: "University of California, Los Angeles (UCLA)",
    description: "Martin Brennan has served as the Copyright and Licensing Librarian at UCLA since 2009. In this role, Marty consults directly with university faculty about copyright clearance, course reserve digitization, and fair use guidelines. He is heavily involved in scholarly communications and open access initiatives across the UC system. He holds an MLS from Illinois and a Certificate in Copyright Management.",
    publications: ["U.S. Copyright Management and Academic Instruction Guides"]
  },
  {
    name: "Dr. Qi Chen",
    title: "Library Director",
    institution: "Calumet College of St Joseph",
    description: "Dr. Chen holds an MLIS, an Ed.M in Curriculum and Instruction, and an Ed.D in Educational Leadership. As Library Director, she leads copyright instruction, licensing assessments, and curriculum integrations, specializing in evaluating the educational use of textbooks and digital media."
  },
  {
    name: "Sandra Aya Enimil",
    title: "Program Director of Copyright Resource Center",
    institution: "Ohio State University Libraries",
    description: "Sandra is a licensed attorney and the Program Director of the Copyright Resource Center at Ohio State. She assists creators in protecting their copyright and educates the campus on fair use. Sandra previously served as the Archives and Copyright Manager for the historic Chicago Defender Newspaper. She holds a Law degree and an MLIS from Illinois.",
    publications: ["Copyright Considerations for Providing 3D Printing Services in the Library"]
  },
  {
    name: "Marcia Keyser",
    title: "Online Graduate Support and Instruction Librarian",
    institution: "Drake University Cowles Library",
    description: "Marcia Keyser was placed in charge of Cowles Library's electronic course reserves in 2003, prompting a lifelong dedication to researching and teaching library copyright. She has created undergraduate courses at Drake University entitled 'Copyright Issues in the U.S.' and speaks extensively on the fair use of journal texts."
  },
  {
    name: "Cindy Kristof",
    title: "Associate Professor & Head of Document Services",
    institution: "Kent State University Libraries",
    description: "Cindy Kristof manages Kent State's interlibrary loan (ILL), course reserves, and institutional repository systems. She regularly advises the university on licensing clearance and presents copyright sessions. She has served as the Kent State Faculty Senate representative.",
    publications: ["U.S. Copyright and Interlibrary Loan Practice (ALA Handbook, 3rd Ed.)"]
  },
  {
    name: "Chris LeBeau",
    title: "Assistant Teaching Professor & liaison Librarian",
    institution: "University of Missouri & UMKC",
    description: "Chris LeBeau holds a joint appointment teaching copyright law in the graduate library science program at the University of Missouri, and serving on the Copyright Support Team at UMKC. She specializes in guidelines for commercial publications and business libraries."
  },
  {
    name: "Dr. Tomas A. Lipinski",
    title: "Dean and Professor",
    institution: "University of Wisconsin-Milwaukee i-School",
    description: "Dr. Lipinski holds a J.D. from Marquette, an LL.M from John Marshall, and a Ph.D. from Illinois. He is a world-renowned legal and library scholar, writing seminal monographs on library copyright liabilities and licensing. He represents international library interests as a delegate to the World Intellectual Property Organization (WIPO) in Geneva.",
    publications: ["The Library's Legal Answer Book", "The Complete Copyright Liability Handbook for Librarians"]
  },
  {
    name: "Carla Myers",
    title: "Coordinator of Scholarly Communications",
    institution: "Miami University Libraries",
    description: "Carla Myers guides librarians and college instructors on copyright compliance, open licensing, and author rights. Her research centers on fair use pathways, copyright issues in virtual instruction, and institutional open repositories."
  },
  {
    name: "Laura Quilter",
    title: "Copyright & Information Policy Librarian",
    institution: "University of Massachusetts Amherst",
    description: "Laura Quilter is a copyright attorney and librarian who teaches copyright and computer law at UMass Amherst. She has represented library and consumer advocacy causes in federal policy and advises campus staff on fair use evaluation, author agreements, and digital streaming rights.",
    publications: ["Intellectual Freedom & Library Law Guides"]
  },
  {
    name: "Carrie Russell",
    title: "Director, Program on Public Access to Information",
    institution: "ALA Washington Office",
    description: "Carrie Russell is a legendary advocate for library interests in federal copyright policymaking. For over 25 years, she represented the American Library Association in Washington, educating librarians, advocating on Capitol Hill, and writing award-winning books. Her publications are considered the golden standard of library copyright education.",
    publications: ["Complete Copyright: An Everyday Guide for Librarians (ABC-CLIO Award winner)", "Complete Copyright for K-12 Educators"]
  },
  {
    name: "Peggy Tahir",
    title: "Education & Copyright Librarian",
    institution: "University of California, San Francisco (UCSF)",
    description: "Peggy Tahir advises UCSF's researchers and medical staff on licensing, fair use, and author rights. She specializes in guiding institutional designers on copyright clearances for massive open online courses (MOOCs) in healthcare topics."
  },
  {
    name: "Lori Williamson",
    title: "Head of Reference and Access Services",
    institution: "Victoria College / University of Houston-Victoria",
    description: "Lori Williamson has acted as the official Copyright Officer representing both UHV and Victoria College for upwards of 15 years. An active member of the OITP Copyright Education Subcommittee, she specializes in managing compliance for joint-use academic libraries."
  }
];

export const CAN_RESOURCES_DATA: ResourceTool[] = [
  {
    title: "The Copyright Compiler",
    imgUrl: "genie.jpg",
    description: "Helps you find out if a work is covered by U.S. copyright, calculates its terms of protection, and generates a printable summary report of your results to show your copyright officer.",
    url: "https://librarycopyright.net/resources/genie/",
    embedCode: `<iframe src='http://librarycopyright.net/resources/genie/' height='680' width='100%'><p>Your browser does not support iframes.</p></iframe>`
  },
  {
    title: "Fair Use Evaluator",
    imgUrl: "fairuseevaluator.jpg",
    description: "Helps you gather and evaluate facts regarding the four fair use factors. Generates a formal mathematical and narrative report that you can preserve as a record of your due diligence.",
    url: "https://librarycopyright.net/resources/fairuse/",
    embedCode: `<iframe src='http://librarycopyright.net/resources/fairuse/' height='880' width='100%'><p>Your browser does not support iframes.</p></iframe>`
  },
  {
    title: "Public Domain Slider",
    imgUrl: "slider.jpg",
    description: "This active tool! An interactive timeline sliding interface to help librarians calculate the copyright protection duration and public domain transition dates based on first publication scenarios.",
    url: "https://librarycopyright.net/resources/digitalslider/",
    embedCode: `<iframe src='http://librarycopyright.net/resources/digitalslider/' height='680' width='100%'><p>Your browser does not support iframes.</p></iframe>`
  },
  {
    title: "Section 108 Spinner",
    imgUrl: "spinner.jpg",
    description: "Guides librarians through section 108 exception pathways to determine if photocopying or scanning a copyrighted item for course reserve, preservation, or ILL is permitted under the law.",
    url: "https://librarycopyright.net/resources/spinner/",
    embedCode: `<iframe src='http://librarycopyright.net/resources/spinner/' height='660' width='100%'><p>Your browser does not support iframes.</p></iframe>`
  },
  {
    title: "Exceptions for Instructors eTool",
    imgUrl: "instructors.jpg",
    description: "A friendly online guide that checks if showing or sharing films, audio streams, or interactive materials in the physical or online classroom aligns with legal educational exemptions.",
    url: "https://librarycopyright.net/resources/exemptions/",
    embedCode: `<iframe src='http://librarycopyright.net/resources/exemptions/' height='680' width='100%'><p>Your browser does not support iframes.</p></iframe>`
  }
];
