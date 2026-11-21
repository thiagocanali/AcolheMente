// Only referenced by the development preview branches in main.ts.
// Never render the original loader error, module path or URL.
export function showPreviewStatus(failed = false) {
  const root = document.getElementById('app')
  if (!root) return

  const main = document.createElement('main')
  main.className = 'section-wrap'
  const heading = document.createElement('h1')
  heading.textContent = failed ? 'Não foi possível abrir a prévia' : 'Prévia local'
  const message = document.createElement('p')
  message.setAttribute('role', failed ? 'alert' : 'status')
  message.textContent = failed
    ? 'O carregamento foi interrompido. Você pode tentar novamente ou voltar ao site institucional.'
    : 'Carregando prévia local…'
  main.append(heading, message)

  if (failed) {
    const retry = document.createElement('button')
    retry.type = 'button'
    retry.textContent = 'Tentar novamente'
    retry.addEventListener('click', () => window.location.reload())
    const back = document.createElement('a')
    back.href = '/'
    back.textContent = 'Voltar ao site institucional'
    const actions = document.createElement('p')
    actions.append(retry, document.createTextNode(' · '), back)
    main.append(actions)
  }

  root.replaceChildren(main)
  if (failed) {
    heading.tabIndex = -1
    heading.focus()
  }
}
