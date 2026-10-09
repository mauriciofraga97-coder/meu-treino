const API_URL = 'https://script.google.com/macros/s/AKfycbxemngF4ASnvsbx6hDrrQKiGIzDAGg2xib7RlYeo_hu3eCi0jNceiRYmS83vuQ1H9Cb/exec';
const state = { sessions: [] };
function hydrate(data){if(!data)return;const name=data.user?.name;if(name)document.querySelector('#userName').textContent=name.split(' ')[0];state.sessions=data.sessions||[];const done=state.sessions.filter(s=>s.status==='done');document.querySelector('#monthWorkouts').textContent=done.length||18;}
async function loadState(){if(!API_URL)return;try{const token=localStorage.getItem('meu_treino_token');const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'state',token})});const j=await r.json();if(j.ok)hydrate(j.data)}catch(e){console.warn('Backend indisponível',e)}}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');loadState();
