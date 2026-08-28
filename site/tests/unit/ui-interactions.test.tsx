// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { Accordion, Dialog, Drawer, Tabs, Toast, ToastRegion } from '../../components/ui';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

afterEach(cleanup);

function DialogHarness({ drawer = false }: { drawer?: boolean }) {
  const [open, setOpen] = useState(false);
  const Overlay = drawer ? Drawer : Dialog;
  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Abrir {drawer ? 'drawer' : 'dialog'}
      </button>
      <Overlay
        description="Conteúdo demonstrativo."
        onOpenChange={setOpen}
        open={open}
        title={drawer ? 'Sacola' : 'Confirmação'}
      >
        <button type="button">Ação interna</button>
      </Overlay>
    </>
  );
}

describe('overlays acessíveis', () => {
  it.each([
    ['dialog', false, 'Confirmação'],
    ['drawer', true, 'Sacola'],
  ] as const)('abre e fecha %s com retorno de foco', async (_name, drawer, title) => {
    const user = userEvent.setup();
    render(<DialogHarness drawer={drawer} />);
    const trigger = screen.getByRole('button', { name: `Abrir ${drawer ? 'drawer' : 'dialog'}` });

    await user.click(trigger);
    const overlay = screen.getByRole('dialog', { name: title });
    expect(overlay).toHaveAttribute('open');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus());

    await user.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(overlay).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();
  });
});

describe('accordion e tabs', () => {
  it('usa disclosure nativo sem esconder o conteúdo da árvore', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Segurança">Use em ambiente ventilado.</Accordion>);
    const summary = screen.getByText('Segurança');
    const details = summary.closest('details');
    expect(details).not.toHaveAttribute('open');
    await user.click(summary);
    expect(details).toHaveAttribute('open');
    expect(screen.getByText('Use em ambiente ventilado.')).toBeInTheDocument();
  });

  it('move seleção e foco com setas, ignorando tab desabilitada', async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        aria-label="Detalhes do produto"
        items={[
          { id: 'materia', label: 'Matéria', panel: 'Madeiras.' },
          { id: 'indisponivel', label: 'Indisponível', panel: 'Sem dado.', disabled: true },
          { id: 'ritual', label: 'Ritual', panel: 'Acenda o intervalo.' },
        ]}
      />,
    );
    const first = screen.getByRole('tab', { name: 'Matéria' });
    first.focus();
    await user.keyboard('{ArrowRight}');
    const ritual = screen.getByRole('tab', { name: 'Ritual' });
    expect(ritual).toHaveFocus();
    expect(ritual).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Ritual' })).toHaveTextContent('Acenda o intervalo.');
  });
});

describe('toast', () => {
  it('anuncia sem temporizador e respeita dispensa explícita', async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = useState(true);
      return (
        <ToastRegion>
          <Toast onDismiss={() => setOpen(false)} open={open} title="Sacola atualizada" tone="success">
            Quantidade alterada.
          </Toast>
        </ToastRegion>
      );
    }

    render(<Harness />);
    expect(screen.getByRole('status')).toHaveTextContent('Quantidade alterada.');
    await user.click(screen.getByRole('button', { name: 'Fechar notificação' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
