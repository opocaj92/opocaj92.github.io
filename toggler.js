const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const landing = document.getElementById('recent-container');

function showLanding() {
  tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
  panels.forEach(panel => { panel.hidden = true; });
  if (landing) landing.hidden = false;
}

function activateTab(name, updateHash = true) {
  const tab = document.querySelector(`[data-section="${name}"]`);
  const panel = document.getElementById(`${name}-container`);
  if (!tab || !panel) return;

  if (landing) landing.hidden = true;
  tabs.forEach(item => item.setAttribute('aria-selected', String(item === tab)));
  panels.forEach(item => { item.hidden = item !== panel; });
  if (updateHash) history.replaceState(null, '', `#${name}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.section));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    activateTab(tabs[next].dataset.section);
  });
});

const validSections = tabs.map(tab => tab.dataset.section);
const initial = location.hash.slice(1);
if (validSections.includes(initial)) activateTab(initial, false);
else showLanding();

window.addEventListener('hashchange', () => {
  const section = location.hash.slice(1);
  if (validSections.includes(section)) activateTab(section, false);
});

document.querySelectorAll('details.abstract').forEach(details => {
  details.addEventListener('toggle', () => {
    details.querySelector('summary').textContent = details.open ? 'Hide abstract' : 'Show abstract';
  });
});
