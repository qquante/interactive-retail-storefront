'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('HEAL route error', error); }, [error]);
  return <main style={{ maxWidth: '52rem', marginInline: 'auto', padding: 'clamp(2rem, 8vw, 7rem) 1rem' }}><p>HEAL</p><h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 1 }}>Não foi possível carregar esta parte.</h1><p>Tente novamente. Se havia itens na sacola, o estado local disponível foi preservado.</p><p><button type="button" onClick={reset}>Tentar novamente</button> · <Link href="/">Voltar ao início</Link></p>{error.digest ? <p>Referência do erro: {error.digest}</p> : null}</main>;
}
