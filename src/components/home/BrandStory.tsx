import { brand, type BrandStoryData } from "@/data/brand";
import { EditorialPhoto } from "./EditorialPhoto";
import { BrandFilms } from "./BrandFilms";

export function BrandStory({ story = brand.story }: { story?: BrandStoryData }) {
  const paragraphs = story.paragraphs.filter(text => text.trim());
  if (!story.approved || !paragraphs.length) return null;
  return <section className="brand-story section-space" id="historia"><div className="shell story-grid"><div><p className="eyebrow">{story.eyebrow}</p><h2>{story.title}</h2>{paragraphs.map((text, i) => <p className="story-paragraph" key={i}>{text}</p>)}{story.photo && <EditorialPhoto photo={story.photo} />}</div>{story.showFilms && <BrandFilms />}</div></section>;
}
