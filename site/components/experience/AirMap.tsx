'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs/animation';
import { createScope } from 'animejs/scope';
import { createDrawable } from 'animejs/svg';
import { AirGlyph } from '@/components/brand';
import {
  HEAL_VARIANTS,
  getHealVariant,
  type HealVariantId,
} from '@/lib/brand/air-variants';
import styles from './AirMap.module.css';

export function AirMap() {
  const [selectedId, setSelectedId] = useState<HealVariantId>('canela');
  const [announcement, setAnnouncement] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [usesStaticVersion, setUsesStaticVersion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const selected = getHealVariant(selectedId) ?? HEAL_VARIANTS[0];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const scope = createScope({
      root: stageRef,
      mediaQueries: { reduce: '(prefers-reduced-motion: reduce)' },
    });

    scope.add((self) => {
      if (self?.matches.reduce || isPaused || usesStaticVersion) return;
      const path = stageRef.current?.querySelector<SVGPathElement>('[data-air-path]');
      const counter = stageRef.current?.querySelector<SVGPathElement>('[data-air-counter]');
      const source = stageRef.current?.querySelector<SVGCircleElement>('[data-air-source]');

      if (path) {
        animate(createDrawable(path), {
          draw: ['0 0', '0 1'],
          duration: window.innerWidth < 720 ? selected.mobileCadenceMs : selected.cadenceMs,
          ease: 'inOut(3)',
        });
      }
      if (counter) {
        animate(createDrawable(counter), {
          draw: ['0 0', '0 1'],
          delay: 80,
          duration: Math.round(selected.cadenceMs * 0.72),
          ease: 'out(3)',
        });
      }
      if (source) {
        animate(source, {
          opacity: [0.35, 1],
          scale: [0.72, 1],
          duration: 240,
          ease: 'out(4)',
        });
      }
    });

    return () => scope.revert();
  }, [isPaused, selected, usesStaticVersion]);

  function selectVariant(id: HealVariantId) {
    const next = getHealVariant(id);
    if (!next) return;
    setSelectedId(id);
    setAnnouncement(`${next.name} selecionado. Rastro ${next.code} em exibição.`);
    window.dispatchEvent(new CustomEvent('heal:variant-change', { detail: { variantId: id } }));
  }

  function togglePause() {
    const paused = !isPaused;
    setIsPaused(paused);
    window.dispatchEvent(new CustomEvent('heal:motion-control', { detail: { paused } }));
  }

  function toggleStaticVersion() {
    const reduced = !usesStaticVersion;
    setUsesStaticVersion(reduced);
    if (reduced) setIsPaused(false);
    window.dispatchEvent(new CustomEvent('heal:motion-control', {
      detail: { paused: false, reduced },
    }));
  }

  return (
    <section className={styles.section} aria-labelledby="air-map-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>MAPA DO AR · COLEÇÃO DE ESTREIA</p>
        <h2 id="air-map-title">Cinco rastros. Um repertório que continua.</h2>
        <p>
          Os primeiros HEALS apresentam o sistema: cada incenso combina nome,
          código, cor e trajetória. Novos aromas podem entrar sem perder a família.
        </p>
      </div>

      <div className={styles.experience}>
        <fieldset className={styles.selector}>
          <legend>Escolha um rastro</legend>
          {HEAL_VARIANTS.map((variant) => (
            <button
              key={variant.id}
              type="button"
              aria-pressed={selectedId === variant.id}
              disabled={!isReady}
              onClick={() => selectVariant(variant.id)}
              style={{ '--variant-color': variant.color } as React.CSSProperties}
            >
              <span className={styles.code}>{variant.code}</span>
              <span>{variant.name}</span>
            </button>
          ))}
        </fieldset>

        <div
          ref={stageRef}
          className={styles.stage}
          data-variant={selected.id}
          style={{ '--variant-color': selected.color } as React.CSSProperties}
        >
          <span className={styles.stageCode}>{selected.code}</span>
          <AirGlyph
            key={selected.id}
            className={styles.glyph}
            variantId={selected.id}
            animated
            decorative
          />
          <div className={styles.reading}>
            <p>{selected.motionLabel}</p>
            <h3>{selected.name}</h3>
            <p>{selected.reading}</p>
            <p className={styles.note}>{selected.designNote}</p>
            <Link href={`/produtos/${selected.id}`}>Conhecer {selected.name} →</Link>
          </div>
        </div>
      </div>

      <p className={styles.disclosure}>
        A coreografia é uma identidade visual e cultural. Ela não simula aroma,
        ingrediente nem garante efeito físico, emocional, financeiro ou espiritual.
      </p>
      <div className={styles.motionControls} aria-label="Controles dos efeitos visuais">
        <button type="button" aria-pressed={isPaused} disabled={!isReady || usesStaticVersion} onClick={togglePause}>
          {isPaused ? 'Retomar movimento' : 'Pausar movimento'}
        </button>
        <button type="button" aria-pressed={usesStaticVersion} disabled={!isReady} onClick={toggleStaticVersion}>
          {usesStaticVersion ? 'Ativar movimento' : 'Usar versão estática'}
        </button>
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
