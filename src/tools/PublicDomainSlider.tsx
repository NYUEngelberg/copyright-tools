import { useState } from "react";
import { DATES_DATA, NOTES_DATA, publicDomainYear } from "../data";
import { Card, SectionHeader, Label, Badge, Button, Choice, Modal, ResultBanner } from "../components/ui";
import { Info, ScrollText } from "lucide-react";

/**
 * Public Domain Slider — "Is it Protected by Copyright?"
 * On-page chrome (title, framing, directions, disclaimer) is verbatim from the
 * original ALA Digital Copyright Slider. The date scenarios + clarifying notes
 * live in ../data (see note in that file regarding provenance).
 */
export default function PublicDomainSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const activeDate = DATES_DATA[selectedIndex];
  const activeNote = activeDate.noteId ? NOTES_DATA[activeDate.noteId] : null;

  const permissionTone =
    activeDate.permission === "No" ? "positive" : activeDate.permission === "Yes" ? "negative" : "caution";
  const permissionLabel =
    activeDate.permission === "No"
      ? "No — in the public domain"
      : activeDate.permission === "Yes"
      ? "Yes — protected by copyright"
      : "Maybe — further investigation needed";

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
                <ResultBanner tone={permissionTone} title={permissionLabel} />
              </div>
            </div>

            <div>
              <Label>Copyright Status / Term</Label>
              <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="font-semibold leading-snug text-zinc-900">{activeDate.status}</p>
                {activeDate.tagline && (
                  <p className="mt-1.5 text-sm text-zinc-500">{activeDate.tagline}</p>
                )}
              </div>
            </div>

            {activeNote && (
              <Button variant="secondary" icon={Info} className="w-full" onClick={() => setModalOpen(true)}>
                Show clarifying information
              </Button>
            )}

            <p className="rounded-xl bg-zinc-50 p-4 text-center text-sm leading-relaxed text-zinc-600">
              U.S. copyright protection lasts <strong>95 years</strong> for published works. In 2026,
              works first published before <strong>January 1, {publicDomainYear}</strong> are in the
              public domain.
            </p>
          </Card>
        </div>

        {/* RIGHT: scenario selector */}
        <div className="space-y-4 lg:col-span-7">
          <SectionHeader>Date of First Publication</SectionHeader>
          <div className="space-y-3">
            {DATES_DATA.map((item, idx) => (
              <Choice
                key={idx}
                selected={selectedIndex === idx}
                onClick={() => setSelectedIndex(idx)}
              >
                <span className="flex flex-1 items-center justify-between gap-3">
                  <span>
                    {item.unpublished && (
                      <span className="mr-2 rounded bg-[#9a1866] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Unpublished
                      </span>
                    )}
                    <span className="font-display text-sm font-extrabold text-zinc-900">
                      {item.date}
                    </span>
                    {item.tagline && (
                      <span className="mt-0.5 block text-xs font-normal text-zinc-500">
                        {item.tagline}
                      </span>
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

      {/* Notes modal */}
      <Modal
        open={modalOpen && !!activeNote}
        onClose={() => setModalOpen(false)}
        title={activeNote?.title ?? ""}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        {activeNote && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                Permission Needed: {activeDate.permission}
              </span>
              <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                {activeDate.status}
              </span>
            </div>
            <p className="leading-relaxed text-zinc-700">{activeNote.content}</p>
            {activeNote.keyPoints.length > 0 && (
              <ul className="space-y-2">
                {activeNote.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#9a1866]" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
