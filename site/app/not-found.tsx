import Link from 'next/link';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';

export default function NotFound() {
  return <CommercePageShell><section style={{ maxWidth: '46rem', paddingBlock: '4rem' }}><p>[404]</p><h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 1 }}>Este caminho não foi encontrado.</h1><p>O endereço pode ter mudado. Você pode voltar ao início ou abrir a coleção demonstrativa.</p><p><Link href="/">Voltar ao início</Link> · <Link href="/colecoes">Ver coleções</Link> · <Link href="/busca">Buscar na HEAL</Link></p></section></CommercePageShell>;
}

