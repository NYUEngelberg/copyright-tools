import { useState } from "react";
import { DATES_DATA, SLIDER_NOTES, publicDomainYear } from "../data";
import type { SliderDate } from "../types";
import { Card, SectionHeader, Label, Badge, Button, Choice, Modal, ResultBanner } from "../components/ui";
import { Info, ScrollText } from "lucide-react";

/**
 * Public Domain Slider — "Is it Protected by Copyright?"
 * On-page chrome and the date scenarios + clarifying notes are verbatim from the
 * original ALA Digital Copyright Slider (notes joined exactly as the original
 * app.js did, with the Permission / Copyright Status header prepended).
 */

/** Build the note HTML for a date, mirroring the original app.js exactly. */
function buildNoteHtml(d: SliderDate): string {
  let html =
    "<p><strong>Permission Needed: </strong>" +
    d.permission +
    "<br /><strong>Copyright Status/Term: </strong>" +
    d.status +
    "</p>";
  (d.note ?? []).forEach((id) => {
    html += SLIDER_NOTES[id] ?? "";
  });
  return html;
}

/** Modal title = date + " - " + tagline, decoding the two entities app.js handled. */
function modalTitle(d: SliderDate): string {
  let title = d.date;
  if (d.tagline) {
    const tagline = d.tagline.replace("&copy;", "©").replace("&amp;", "&");
    title += " - " + tagline;
  }
  return title;
}

export default function PublicDomainSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const activeDate = DATES_DATA[selectedIndex];
  const hasNote = !!activeDate.note && activeDate.note.length > 0;

  const permissionTone =
    activeDate.permission === "No" ? "positive" : activeDate.permission === "Yes" ? "negative" : "caution";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Badge>Public Domain Slider</Badge>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Is it Protected by Copyright?
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          For works published in the U.S.A. Set the scenario that matches your work&rsquo;s first
          publication to see whether permission is needed and the copyright status or term.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* LEFT: directions + readouts */}
        <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-24">
          <Card className="p-6">
            <Label>Directions</Label>
            <ul className="mt-3 space-y-2.5 text-sm text-zinc-600">
              {[
                "Select the date scenario that matches your work.",
                "Read the information in the window.",
                "Click for clarifying information where available.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fdf2f8] text-xs font-bold text-[#9a1866]">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-5 p-6">
            <div>
              <Label>Permission Needed?</Label>
              <div className="mt-2">
                <ResultBanner
                  tone={permissionTone}
                  title={hasNote ? `${activeDate.permission} *` : activeDate.permission}
                />
              </div>
            </div>

            <div>
              <Label>Copyright Status / Term</Label>
              <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="font-semibold leading-snug text-zinc-900">{activeDate.status}</p>
                {activeDate.tagline && (
                  <p
                    className="mt-1.5 text-sm text-zinc-500"
                    dangerouslySetInnerHTML={{ __html: activeDate.tagline }}
                  />
                )}
              </div>
            </div>

            {hasNote && (
              <Button variant="secondary" icon={Info} className="w-full" onClick={() => setModalOpen(true)}>
                Show clarifying information
              </Button>
            )}

            <p className="rounded-xl bg-zinc-50 p-4 text-center text-sm leading-relaxed text-zinc-600">
              U.S. copyright protection lasts <strong>95 years</strong> for published works. In{" "}
              {new Date().getFullYear()}, works first published before{" "}
              <strong>January 1, {publicDomainYear}</strong> are in the public domain.
            </p>
          </Card>
        </div>

        {/* RIGHT: scenario selector */}
        <div className="space-y-4 lg:col-span-7">
          <SectionHeader>Date of First Publication</SectionHeader>
          <div className="space-y-3">
            {DATES_DATA.map((item, idx) => (
              <Choice key={idx} selected={selectedIndex === idx} onClick={() => setSelectedIndex(idx)}>
                <span className="flex flex-1 items-center justify-between gap-3">
                  <span>
                    {item.unpublished && (
                      <span className="mr-2 rounded bg-[#9a1866] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Unpublished
                      </span>
                    )}
                    <span
                      className="font-display text-sm font-extrabold text-zinc-900"
                      dangerouslySetInnerHTML={{ __html: item.date }}
                    />
                    {item.tagline && (
                      <span
                        className="mt-0.5 block text-xs font-normal text-zinc-500"
                        dangerouslySetInnerHTML={{ __html: item.tagline }}
                      />
                    )}
                  </span>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      item.permission === "No"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.permission === "Yes"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {item.permission === "No" ? "Public domain" : item.permission === "Yes" ? "Protected" : "Check"}
                  </span>
                </span>
              </Choice>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer — verbatim */}
      <Card className="flex items-start gap-3 bg-zinc-50 p-5">
        <ScrollText className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-400" />
        <p className="text-sm leading-relaxed text-zinc-600">
          The information on this site applies to use within the U.S. for works as outlined in
          Section 104 of the U.S. Copyright Act (see 17 U.S.C. &sect; 104). Copyright terms and use of
          copyrighted works in another nation are governed by that nation&rsquo;s laws. Works prepared
          by an officer or employee of the United States Government as part of that person&rsquo;s
          official duties receive no copyright protection in the U.S. This tool provides educational
          information, not legal advice &mdash; consult your organization&rsquo;s copyright specialist
          or legal advisor regarding copyright questions.
        </p>
      </Card>

      {/* Notes modal — verbatim note HTML */}
      <Modal
        open={modalOpen && hasNote}
        onClose={() => setModalOpen(false)}
        title={modalTitle(activeDate)}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        <div
          className="leading-relaxed text-zinc-700 [&_a]:font-semibold [&_a]:text-[#9a1866] [&_a]:underline [&_a]:underline-offset-2 [&_h4]:mt-4 [&_h4]:font-display [&_h4]:font-bold [&_h4]:text-zinc-900 [&_p]:mb-3"
          dangerouslySetInnerHTML={{ __html: buildNoteHtml(activeDate) }}
        />
      </Modal>
    </div>
  );
}
