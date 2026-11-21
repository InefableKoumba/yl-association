import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/lib/utils'

export function RichText({
  data,
  className,
  size = 'lg',
}: {
  data?: SerializedEditorState | null
  className?: string
  size?: 'base' | 'lg'
}) {
  if (!data || !data.root) return null
  return (
    <div className={cn('prose prose-yl max-w-none', size === 'lg' && 'prose-lg', className)}>
      <LexicalRichText data={data} />
    </div>
  )
}

/** Extracts plain text from a Lexical document (for excerpts and reading time). */
export function lexicalToText(data?: SerializedEditorState | null): string {
  if (!data?.root) return ''
  const out: string[] = []
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') out.push(n.text)
    n.children?.forEach(walk)
  }
  walk(data.root)
  return out.join(' ').replace(/\s+/g, ' ').trim()
}
