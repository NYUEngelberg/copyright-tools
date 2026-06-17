import { SliderDate } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// PROVENANCE NOTE — Public Domain Slider data
// The original ALA Digital Copyright Slider loaded its date scenarios and
// clarifying notes from a `data.js` file fetched at runtime (XHR). That file was
// NOT captured in the site archive, and web.archive.org is unreachable from this
// environment. The DATES_DATA / NOTES_DATA below are therefore PENDING
// replacement with the verbatim original content. Everything else in the app is
// verbatim from the archived source.
// ─────────────────────────────────────────────────────────────────────────────

// Public-domain boundary is the current year minus the 95-year published term.
const currentYear = new Date().getFullYear();
export const publicDomainYear = currentYear - 95; // 1931 in 2026

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
