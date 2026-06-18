import { SliderDate } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Public Domain Slider data — VERBATIM from the original ALA Digital Copyright
// Slider `data.js` (recovered via the Wayback Machine). Note text and date
// scenarios are reproduced exactly; the only change is that archived link URLs
// (web.archive.org/web/…/<url>) have been restored to their original clean form,
// which is what the live data.js contained.
// ─────────────────────────────────────────────────────────────────────────────

// Public-domain boundary is the current year minus the 95-year published term.
const currentYear = new Date().getFullYear();
export const publicDomainYear = currentYear - 95; // 1931 in 2026

// Notes are stored as the original arrays and joined with a single space, exactly
// as the original app.js did (`fetchedData.notes[n].join(' ')`).
const NOTE_PARTS: Record<string, string[]> = {
  crHeading: ["<h4>Copyright Renewal</h4>"],
  adHeading: ["<h4>Author's Death</h4>"],

  copyrightGenie: [
    "<p>",
    "To determine the exact date a work will enter (or has entered) ",
    "the public domain, see the ",
    "<a href='https://librarycopyright.net/resources/genie/' target='_blank'>Copyright Genie</a>.",
    "</p>",
  ],

  copyrightNotice: [
    "<p>",
    "In order to receive copyright protection, works published",
    "in the U.S. prior to March 1, 1989 were required to include",
    "a copyright notice [&copy;]. On or after March 1, 1989, no",
    "copyright notice was required for a published work to receive",
    "copyright protection. Unpublished works have never needed",
    "a copyright notice to receive copyright protection.",
    "</p>",
  ],

  copyrightRenewal: [
    "<p>",
    "At some points in time, copyrights could be renewed or",
    "automatically extended. Works that were not renewed have",
    "fallen into the public domain and are not protected by",
    "copyright. To learn about the issues of automatic",
    "renewal, see",
    "<a href='https://www.copyright.gov/circs/circ15t.pdf' target='_blank'>Circular 15t</a>.",
    "To understand the process of determining whether or not",
    "something was ever renewed, see",
    "<a href='https://www.copyright.gov/circs/circ22.pdf' target='_blank'>Circular 22</a>",
    "and",
    "<a href='https://www.copyright.gov/circs/circ23.pdf' target='_blank'>Circular 23</a>.",
    "</p>",
  ],

  protected: [
    "<p>",
    "This work is protected by copyright. However, several copyright exceptions",
    "may still allow you to use the work without the author's",
    "permission. Possible exceptions include: Fair Use [See",
    "<a href='http://www.copyright.gov/fls/fl102.html' target='_blank'>Fact Sheet 102</a> or the",
    "<a href='http://librarycopyright.net/resources/fairuse/' target='_blank'>Fair Use Evaluator</a>], Educational exemptions [See",
    "the <a href='http://librarycopyright.net/resources/etool/' target='_blank'>Exceptions for Educators eTool</a>], Library or",
    "archival exceptions [See <a href='http://librarycopyright.net/resources/spinner/' target='_blank'>Section 108 Spinner</a>],",
    "among others [See <a href='http://www.copyright.gov/circs/circ21.pdf' target='_blank'>Circular 21</a>].",
    "</p>",
  ],

  permission: [
    "<p>",
    "If a copyrighted work is not covered under an exception, you should",
    "get permission to use it. For help tracking down copyright owners,",
    "see <a href='http://www.copyright.gov/circs/circ22.pdf' target='_blank'>Circular 22</a>. These and other resources",
    "can be found at the <a href='http://www.copyright.gov/' target='_blank'>U.S. Copyright Office Website</a>",
    "</p>",
  ],

  pdDate: [
    "<p>",
    "Works enter the public domain on January 1st of the year following",
    "the expiration of their copyright term.",
    "</p>",
  ],

  furtherInfo: [
    "<p>",
    "For further information also visit the Copyright Advisory Network at",
    "<a href='https://www.librarycopyright.net' target='_blank'>https://www.librarycopyright.net</a>.",
    "</p>",
  ],

  authorsDeath: [
    "<p>",
    "The term for most works in this category is life of the author",
    "(or longest living author) + 70. If the date of the author's",
    "death plus 70 years is a date before 2047, the longer term",
    "is recognized. For works of corporate authorship,",
    "anonymous works, pseudonymous works, or works for which the",
    "author's death date is unknown, the term is through 2047,",
    "unless the lesser of the date of publication +95 and the date",
    "of creation +120 is more, in which case, that number is the",
    "term.",
    "</p>",
  ],

  lateRegistration: [
    "<p>",
    "Works published without a copyright notice after 1977 and",
    "before March 1st, 1989, could be registered with the",
    "copyright office within 5 years and receive full copyright",
    "protection. Those that were not registered within 5 years",
    "of publication are in the public domain.",
    "</p>",
  ],

  unpublished: [
    "<p>",
    "Most unpublished works by individuals enter the public domain",
    "70 years after the death of the [last living] author. For",
    "anonymous works, pseudonymous works, or works for which the",
    "author's death date is uknown, the term is 120 years from",
    "the date of creation.",
    "</p>",
  ],

  corporate: [
    "<p>",
    "Unpublished works created under corporate authorship",
    "enter the public domain 120 years after their creation.",
    "</p>",
  ],

  registeredUnpublished: [
    "<p>",
    "Unpublished works that were registered with the Copyright",
    "Office [rare] have the same term as if they had been",
    "published (using the date of registration in place",
    "of the date of publication).",
    "</p>",
  ],

  sonnyBono: [
    "<p>",
    "The Sonny Bono Copyright Extension Act of 1998 added twenty",
    "years of copyright protection to protected works. This created",
    "a twenty year delay of older works entering the public domain.",
    "Since twenty years have passed since the legislation went into",
    "effect, each January 1st, another year of protected works enters",
    "the public domain, creating a \"rolling\" public domain. Subtracting",
    "96 years from the current year will be the year that more works enter",
    "the public domain.",
    "</p>",
  ],
};

export const SLIDER_NOTES: Record<string, string> = Object.fromEntries(
  Object.entries(NOTE_PARTS).map(([k, parts]) => [k, parts.join(" ")])
);

export const DATES_DATA: SliderDate[] = [
  {
    id: "pre-1923",
    date: `Before ${publicDomainYear}`,
    permission: "No",
    status: "In Public Domain",
    note: ["sonnyBono"],
  },
  {
    id: "post-1922-pre-1978-no-copyright-notice",
    date: `After ${publicDomainYear - 1} & Before 1978`,
    tagline: "If published without &copy; notice",
    permission: "No",
    status: "In Public Domain",
    note: ["copyrightNotice", "copyrightGenie"],
  },
  {
    id: "pre-1964-not-renewed",
    date: `After ${publicDomainYear - 1} & Before 1964`,
    tagline: "If published with &copy; notice, but not renewed after 28 years",
    permission: "No",
    status: "In Public Domain",
    note: ["copyrightNotice", "copyrightRenewal", "copyrightGenie"],
  },
  {
    id: "pre-1964-renewed",
    date: `After ${publicDomainYear - 1} & Before 1964`,
    tagline: "If published with &copy; notice, renewed after 28 years",
    permission: "Maybe",
    status: "Protected through 2018 or longer (95 years from the date of publication)",
    twoLines: true,
    note: [
      "protected",
      "permission",
      "crHeading",
      "copyrightNotice",
      "copyrightRenewal",
      "pdDate",
      "copyrightGenie",
      "furtherInfo",
    ],
  },
  {
    id: "post-1964-pre-1978",
    date: "After 1963 & Before 1978",
    tagline: "If published with &copy; notice",
    permission: "Maybe",
    status: "Protected through 2059 or longer (95 years from the date of publication",
    twoLines: true,
    note: [
      "protected",
      "permission",
      "crHeading",
      "copyrightNotice",
      "pdDate",
      "copyrightGenie",
      "furtherInfo",
    ],
  },
  {
    id: "pre-1978-published-pre-2003",
    date: "After 1977 & Before 2003",
    tagline: "Created (unpublished) before 1978 & first published before January 1, 2003",
    permission: "Maybe",
    status: "Protected through 2047 or longer (life of author +70)",
    twoLines: true,
    note: [
      "protected",
      "permission",
      "adHeading",
      "authorsDeath",
      "copyrightNotice",
      "pdDate",
      "copyrightGenie",
      "furtherInfo",
    ],
  },
  {
    id: "post-1977-pre-3-1989-no-reg",
    date: "After 1977 & Before March 1, 1989",
    tagline: "If published without &copy; notice &amp; without subsequent registration",
    permission: "No",
    status: "In Public Domain",
    note: ["copyrightNotice", "lateRegistration", "copyrightGenie"],
  },
  {
    id: "pre-1978-pre-3-1989-registered-or-copyrighted",
    date: "After 1977 & Before March 1, 1989",
    tagline:
      "If published without &copy; notice but registered within 5 years; or published with &copy; notice",
    permission: "Maybe",
    status: "Protected until 70 years after the death of the author",
    twoLines: true,
    note: [
      "protected",
      "permission",
      "authorsDeath",
      "copyrightNotice",
      "lateRegistration",
      "copyrightGenie",
      "furtherInfo",
    ],
  },
  {
    id: "post-3-1989-registered-or-copyrighted",
    date: "On or after March 1, 1989",
    tagline: "Published with or without &copy; notice",
    permission: "Maybe",
    status: "Protected until 70 years after the death of the author",
    twoLines: true,
    note: ["protected", "permission", "authorsDeath", "pdDate", "copyrightGenie", "furtherInfo"],
  },
  {
    id: "post-3-1989-registered-or-copyrighted",
    date: "Published after 2002",
    tagline: "Created before 1978 and author died more than 70 years ago",
    permission: "No",
    status: "In Public Domain",
  },
  {
    id: "unpublished-authors",
    date: "Created by Individual or Joint Authors",
    unpublished: true,
    permission: "Maybe",
    status: "Protected until 70 years after the death of the author",
    twoLines: true,
    note: [
      "protected",
      "permission",
      "unpublished",
      "registeredUnpublished",
      "copyrightGenie",
      "furtherInfo",
    ],
  },
  {
    id: "unpublished-corporate",
    date: "Created under Corporate Authorship",
    unpublished: true,
    permission: "Maybe",
    status: "Protected until 120 years after the date of creation",
    twoLines: true,
    note: [
      "protected",
      "permission",
      "corporate",
      "registeredUnpublished",
      "copyrightGenie",
      "furtherInfo",
    ],
  },
];
