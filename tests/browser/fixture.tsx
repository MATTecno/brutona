import { createRoot } from "react-dom/client";
import { InstagramFeed } from "../../src/components/home/InstagramFeed";
import { assets } from "../../src/data/assets";

const scenario = new URLSearchParams(location.search).get("scenario");
const posts = scenario === "empty" ? [] : Array.from({ length: 6 }, (_, i) => ({ id: `fixture-${i}`, url: `https://www.instagram.com/p/FIXTURE_${i}/`, fallbackPhoto: assets.board }));
createRoot(document.getElementById("root")!).render(<main><div style={{ height: "1500px" }} aria-hidden="true" /><InstagramFeed posts={posts} /></main>);
