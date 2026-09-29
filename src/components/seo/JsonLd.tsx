/**
 * Small server component for JSON-LD. Keeping the serialization in one place prevents pages
 * from drifting into different script attributes or accidentally emitting an object directly.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
