/**
 * Form submissions via Web3Forms (works on any static host, incl. Vercel). Submissions arrive by e-mail.
 * Set PUBLIC_WEB3FORMS_KEY (free key from web3forms.com) in Vercel → Settings → Environment Variables, then redeploy.
 */
export const formEndpoint = 'https://api.web3forms.com/submit';
export const formAccessKey: string = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '';

/** Browser-side submit: posts the form with fetch and goes to /bedankt/ on success. */
export async function verstuurFormulier(form: HTMLFormElement, status: HTMLElement | null) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]:not([hidden])');
  const toon = (tekst: string, fout = false) => {
    if (!status) return;
    status.textContent = tekst;
    status.classList.toggle('text-danger', fout);
    status.hidden = false;
  };
  if (!form.querySelector<HTMLInputElement>('input[name="access_key"]')?.value) {
    toon('Het formulier is nog niet gekoppeld. App of bel ons, dan helpen we je direct.', true);
    return;
  }
  button?.setAttribute('disabled', '');
  toon('Bezig met versturen…');
  try {
    const body = new FormData(form);
    // Calculator inputs are already in the text summary; leave the raw controls out of the e-mail
    for (const key of [...body.keys()]) if (key.startsWith('calc_')) body.delete(key);
    const res = await fetch(formEndpoint, { method: 'POST', body, headers: { Accept: 'application/json' } });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (res.ok && data.success) {
      location.href = '/bedankt/';
      return;
    }
    throw new Error('not ok');
  } catch {
    toon('Versturen is niet gelukt. Probeer het opnieuw, of app of bel ons.', true);
    button?.removeAttribute('disabled');
  }
}
