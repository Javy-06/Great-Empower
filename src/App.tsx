import { useEffect, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'
import { DirectionSection } from '@/showcase/sections/DirectionSection'
import { ColorSection } from '@/showcase/sections/ColorSection'
import { TypographySection } from '@/showcase/sections/TypographySection'
import { SpacingSection } from '@/showcase/sections/SpacingSection'
import { ButtonsSection } from '@/showcase/sections/ButtonsSection'
import { CardsSection } from '@/showcase/sections/CardsSection'
import { FormsSection } from '@/showcase/sections/FormsSection'
import { NavigationSection } from '@/showcase/sections/NavigationSection'
import { IconsSection } from '@/showcase/sections/IconsSection'
import { StatusSection } from '@/showcase/sections/StatusSection'
import { LayoutsSection } from '@/showcase/sections/LayoutsSection'
import { ModulesSection } from '@/showcase/sections/ModulesSection'

const toc = [
  { id: 'direction', label: 'Visual direction', group: 'Brand' },
  { id: 'color', label: 'Colour', group: 'Foundations' },
  { id: 'typography', label: 'Typography', group: 'Foundations' },
  { id: 'spacing', label: 'Spacing & layout', group: 'Foundations' },
  { id: 'icons', label: 'Iconography', group: 'Foundations' },
  { id: 'buttons', label: 'Buttons', group: 'Components' },
  { id: 'cards', label: 'Cards', group: 'Components' },
  { id: 'forms', label: 'Forms & inputs', group: 'Components' },
  { id: 'navigation', label: 'Navigation', group: 'Components' },
  { id: 'status', label: 'Status & progress', group: 'Components' },
  { id: 'layouts', label: 'Layouts', group: 'Patterns' },
  { id: 'modules', label: 'Module identity', group: 'Patterns' },
]

const ids = toc.map((t) => t.id)
const groups = [...new Set(toc.map((t) => t.group))]

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [sectionIds])
  return active
}

export default function App() {
  const active = useActiveSection(ids)

  useEffect(() => {
    // Keep the active chip visible in the mobile section bar.
    const chip = document.getElementById(`chip-${active}`)
    const bar = chip?.parentElement
    if (chip && bar && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' })
    }
  }, [active])

  return (
    <div className="min-h-screen bg-canvas">
      {/* Mobile / tablet header */}
      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Logo size="sm" />
          <Badge tone="teal">System v3.0</Badge>
        </div>
        <nav aria-label="Sections" className="scrollbar-none relative flex gap-1.5 overflow-x-auto px-4 pb-3">
          {toc.map((t) => (
            <a
              key={t.id}
              id={`chip-${t.id}`}
              href={`#${t.id}`}
              aria-current={active === t.id ? 'true' : undefined}
              className={cn(
                'inline-flex h-9 shrink-0 items-center rounded-full px-3.5 text-body-sm font-medium transition-colors',
                active === t.id ? 'bg-navy-900 text-white' : 'bg-sunken text-ink-secondary hover:text-ink',
              )}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        {/* Desktop index */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex">
          <div className="px-6 pb-4 pt-6">
            <Logo size="sm" />
            <p className="mt-4 text-body-sm font-semibold text-ink">Design Foundation</p>
            <p className="text-caption text-ink-muted">Version 3.0 · Draft for review</p>
          </div>
          <nav aria-label="Sections" className="flex-1 overflow-y-auto px-3 pb-6">
            {groups.map((g) => (
              <div key={g} className="mt-4">
                <p className="px-3 pb-1.5 text-overline uppercase text-ink-muted">{g}</p>
                <ul>
                  {toc
                    .filter((t) => t.group === g)
                    .map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          aria-current={active === t.id ? 'true' : undefined}
                          className={cn(
                            'relative flex h-10 items-center gap-2.5 rounded-lg px-3 text-body-sm transition-colors',
                            active === t.id ? 'bg-navy-50 font-semibold text-navy-900' : 'text-ink-secondary hover:bg-sunken hover:text-ink',
                          )}
                        >
                          <span className={cn('font-mono text-[11px] tabular-nums', active === t.id ? 'text-crimson-600' : 'text-ink-disabled')}>{String(ids.indexOf(t.id) + 1).padStart(2, '0')}</span>
                          {t.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="border-t border-line p-4">
            <p className="text-caption text-ink-muted">Independent concept. Not an official Great Eastern product.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 md:px-8 xl:px-12">
          <div className="mx-auto max-w-[1200px]">
            <DirectionSection />
            <ColorSection />
            <TypographySection />
            <SpacingSection />
            <IconsSection />
            <ButtonsSection />
            <CardsSection />
            <FormsSection />
            <NavigationSection />
            <StatusSection />
            <LayoutsSection />
            <ModulesSection />

            <footer className="mb-10 mt-4 rounded-3xl border border-line bg-surface p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <Logo size="sm" />
                  <p className="mt-4 text-body-sm text-ink-secondary">
                    GREAT EMPOWER is an independent, proposed digital product concept created for potential future collaboration. It is not an existing Great Eastern product, and nothing here implies partnership, authorisation or endorsement by Great Eastern.
                  </p>
                  <p className="mt-2 text-body-sm text-ink-secondary">All figures, scores, points, rewards and partners shown are illustrative placeholders. Content is educational and not financial advice.</p>
                </div>
                <div className="text-body-sm">
                  <p className="font-semibold text-ink">Design Foundation v3.0</p>
                  <p className="text-ink-muted">Inter · Tailwind CSS v4 tokens · React + TypeScript</p>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
