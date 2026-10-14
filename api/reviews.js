// Live Google reviews for the landing page. Needs two Vercel environment variables:
//   GOOGLE_PLACES_API_KEY  (Google Cloud, Places API (New) enabled)
//   GOOGLE_PLACE_ID        (optional, defaults to V-Tech's place id)
// Google returns at most 5 reviews per call, so this adds the newest ones on top of the saved reviews.
module.exports = async (req, res) => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID || 'ChIJh57rFncWrjsREhpuUlEFK_k';
  if (!key) { res.status(503).json({ error: 'GOOGLE_PLACES_API_KEY is not set' }); return; }
  try {
    const r = await fetch('https://places.googleapis.com/v1/places/' + id + '?languageCode=en', {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'reviews,rating,userRatingCount' },
    });
    if (!r.ok) { res.status(502).json({ error: 'Google Places returned ' + r.status }); return; }
    const j = await r.json();
    const reviews = (j.reviews || []).map((x) => ({
      name: (x.authorAttribution && x.authorAttribution.displayName) || 'Google user',
      ts: x.publishTime ? Math.floor(new Date(x.publishTime).getTime() / 1000) : 0,
      stars: x.rating,
      text: (x.text && x.text.text) || (x.originalText && x.originalText.text) || '',
    })).filter((x) => x.text);
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ total: j.userRatingCount, rating: j.rating, reviews });
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
};
