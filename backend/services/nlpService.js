const spacy = require('spacy');

exports.analyzeText = async (text) => {
  const nlp = spacy.load('en_core_web_sm');
  const doc = nlp(text);

  const analysis = {
    entities: [],
    risks: [],
  };

  // Extract entities
  doc.ents.forEach(ent => {
    analysis.entities.push({ text: ent.text, label: ent.label_ });
  });

  // Custom risk detection logic
  const riskTerms = ['liability', 'penalty', 'breach', 'termination'];
  riskTerms.forEach(term => {
    if (text.includes(term)) {
      analysis.risks.push(term);
    }
  });

  return analysis;
};
