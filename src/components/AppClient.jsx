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
import esUi from '../locales/es/ui.json'
import esOpenings from '../locales/es/openings.json'
import enUi from '../locales/en/ui.json'
import enOpenings from '../locales/en/openings.json'
import frUi from '../locales/fr/ui.json'
import frOpenings from '../locales/fr/openings.json'

const localeResources = {
  es: { ui: esUi, openings: esOpenings },
  en: { ui: enUi, openings: enOpenings },
  fr: { ui: frUi, openings: frOpenings },
}

const OpeningTreeDynamic = dynamic(() => import('./OpeningTree'), { ssr: false })
const MobileOpeningTreeDynamic = dynamic(() => import('./MobileOpeningTree'), { ssr: false })

export default function AppClient({ locale, pathname, initialNodeId }) {
  const [i18nReady] = useState(() => {
    initAnalytics()
    const resources = localeResources[locale] ?? localeResources.es
    return initI18nSync(locale, resources)
  })

  const config = resolveTreeConfigFromPathname(pathname)
  const state = useOpeningTreeState(config, { locale, pathname, initialNodeId })
  const isMobile = useIsMobile()

  // Fade out the server-rendered previews once React has hydrated and ReactFlow is ready
  useEffect(() => {
    const previews = document.querySelectorAll('[data-tree-preview], [data-ssg-preview]')
    if (!previews.length) return
    previews.forEach(el => {
      el.style.transition = 'opacity 0.2s'
      el.style.opacity = '0'
      setTimeout(() => el.setAttribute('hidden', ''), 200)
    })
  }, [])

  if (!i18nReady) return null

  return (
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <div className="absolute inset-0">
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
