"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { brandFilms, type BrandFilm } from "@/data/official";

function FilmPlayer({ film }: { film: BrandFilm }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  return <div className="film-player">
    {started && !failed ? <video ref={ref} controls autoPlay playsInline preload="none" poster={film.poster} aria-label={film.title} onError={() => setFailed(true)}>
      <source src={film.src} type="video/mp4" />
    </video> : <><Image src={film.poster} alt={film.title} fill sizes="(max-width: 639px) 100vw, 380px" style={{ objectFit: "contain" }} />
      {!failed && <button className="film-play" onClick={() => setStarted(true)} aria-label={`Reproduzir: ${film.title}`} title={`Reproduzir: ${film.title}`}><Play size={28} fill="currentColor" /></button>}
    </>}
    {failed && <p role="status" className="film-error">Não foi possível carregar o vídeo.</p>}
  </div>;
}

export function BrandFilms({ films = brandFilms }: { films?: BrandFilm[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const film = films[selected];
  if (!film) return null;
  return <div className="brand-films">
    <div className="film-tabs" role="tablist" aria-label="Vídeos da Brutona">{films.map((item, index) => <button key={item.id} ref={element => { tabs.current[index] = element; }} role="tab" id={`${id}-tab-${index}`} aria-selected={index === selected} aria-controls={`${id}-panel`} tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
      const next = event.key === "ArrowRight" ? (selected + 1) % films.length : event.key === "ArrowLeft" ? (selected - 1 + films.length) % films.length : event.key === "Home" ? 0 : event.key === "End" ? films.length - 1 : null;
      if (next !== null) { event.preventDefault(); setSelected(next); tabs.current[next]?.focus(); }
    }}>{item.title}</button>)}</div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}>
      <FilmPlayer film={film} key={film.id} />
      <p className="film-description">{film.description}</p>
      <a className="text-link" href={film.src} target="_blank" rel="noopener noreferrer">Abrir vídeo<ExternalLink size={16} /></a>
    </div>
  </div>;
}
