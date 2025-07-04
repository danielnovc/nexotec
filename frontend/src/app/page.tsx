"use client"

import StreamLineLanding from "./pages/landing"
import StructuredData from "@/components/structured-data"

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData
        lang="en-US"
        title="Nexogen AI - AI Transcription Service"
        description="Professional audio transcription with speaker diarization and secure note-taking for professionals"
        url="https://nexogen.app"
        region="US"
      />
      <StreamLineLanding />
    </>
  )
}