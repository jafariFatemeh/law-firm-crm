const spacy = require('spacy');
const { summarize } = require('gensim');

exports.analyzeText = async (text) => {
  const nlp = spacy.load('en_core_web_sm');
  const doc = nlp(text);

  const analysis = {
    summary: '',
    entities: [],
    precedents: [],
  };

  // Extract entities
  doc.ents.forEach(ent => {
    analysis.entities.push({ text: ent.text, label: ent.label_ });
  });

  // Summarize text
  analysis.summary = summarize(text);

  // Mock function to fetch precedents (should be replaced with actual logic)
  const fetchPrecedents = (entity) => {
    return [`Relevant precedent for ${entity}`];
  };

  analysis.precedents = analysis.entities.flatMap(ent => fetchPrecedents(ent.text));

  return analysis;
};
