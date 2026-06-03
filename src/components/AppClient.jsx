'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { I18nextProvider } from 'react-i18next'
import i18n, { initI18nSync } from '../i18n'
import { TooltipProvider } from './ui/Tooltip'
import { resolveTreeConfigFromPathname } from '../data/treeConfigs'
import { useOpeningTreeState } from '../hooks/useOpeningTreeState'
import { useIsMobile } from '../hooks/useIsMobile'
import { initAnalytics } from '../lib/analytics'
import { TopBar } from './TopBar'

const OpeningTreeDynamic = dynamic(() => import('./OpeningTree'), { ssr: false })
const MobileOpeningTreeDynamic = dynamic(() => import('./MobileOpeningTree'), { ssr: false })

export default function AppClient({ locale, pathname, initialNodeId }) {
  // Fast path: if i18n is already initialized with this locale (subsequent navigations
  // within the same language), skip the async chunk load entirely.
  const [i18nReady, setI18nReady] = useState(() => {
    initAnalytics()
    return i18n.isInitialized && i18n.language === locale
  })

  useEffect(() => {
    if (i18nReady) return
    Promise.all([
      import(`../locales/${locale}/ui.json`),
      import(`../locales/${locale}/openings.json`),
    ]).then(([{ default: ui }, { default: openings }]) => {
      initI18nSync(locale, { ui, openings })
      setI18nReady(true)
    })
  }, [locale, i18nReady])

  const config = resolveTreeConfigFromPathname(pathname)
  const state = useOpeningTreeState(config, { locale, pathname, initialNodeId })
  const isMobile = useIsMobile()

  // Fade out the server-rendered previews once i18n is ready and ReactFlow is about to render.
  // Depends on i18nReady so the fade waits for the async locale chunk on cold loads —
  // otherwise the static shell disappears before the client tree is visible.
  useEffect(() => {
    if (!i18nReady) return
    const previews = document.querySelectorAll('[data-tree-preview], [data-ssg-preview]')
    if (!previews.length) return
    previews.forEach(el => {
      el.style.transition = 'opacity 0.2s'
      el.style.opacity = '0'
      setTimeout(() => el.setAttribute('hidden', ''), 200)
    })
  }, [i18nReady])

  if (!i18nReady) return null

  return (
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <div className="absolute inset-0">
          {!isMobile && (
            <TopBar
              locale={locale}
              selectedNodeId={state.selectedNodeId}
              tree={state.tree}
              subtitle={state.subtitle}
            />
          )}
          {isMobile ? (
            <MobileOpeningTreeDynamic state={state} />
          ) : (
            <OpeningTreeDynamic state={state} />
          )}
        </div>
      </TooltipProvider>
    </I18nextProvider>
  )
}
