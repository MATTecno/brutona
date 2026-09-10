declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

let pending: Promise<boolean> | undefined;

export function loadInstagram(): Promise<boolean> {
  if (window.instgrm?.Embeds) return Promise.resolve(true);
  if (pending) return pending;
  pending = new Promise(resolve => {
    const existing = document.getElementById("instagram-embed-script") as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");
    const finish = (success: boolean) => {
      clearTimeout(timeout);
      script.removeEventListener("load", loaded);
      script.removeEventListener("error", failed);
      resolve(success);
    };
    const loaded = () => finish(Boolean(window.instgrm?.Embeds));
    const failed = () => finish(false);
    const timeout = window.setTimeout(failed, 10000);
    script.addEventListener("load", loaded, { once: true });
    script.addEventListener("error", failed, { once: true });
    if (!existing) {
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  });
  return pending;
}
