export default function Profiler() {
    async function injectProfiler() {
        const response = await fetch('/api/profiler/get-script-include');
        const script = await response.text();
        const frag = window.document.createRange().createContextualFragment(script);
        window.document.body.appendChild(frag);    
    }

    injectProfiler();
    return <></>
}