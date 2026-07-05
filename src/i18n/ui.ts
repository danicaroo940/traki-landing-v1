export type Lang = 'es' | 'en';

export const languages: Record<Lang, string> = { es: 'ES', en: 'EN' };

export const ui: Record<Lang, Record<string, string>> = {
  es: {
    'nav.cta': 'Únete',
    'hero.title.1': 'Sin atajos.',
    'hero.title.2': 'Solo reps.',
    'hero.subtitle': 'Entrena fuerza y controla tus macros. Una app, cero excusas.',
    'hero.cta': 'Únete a la lista',
    'feat.analyze.eyebrow': 'Nutrición con IA',
    'feat.analyze.title': 'Escanea tu',
    'feat.analyze.titleAccent': 'comida',
    'feat.analyze.body': 'Calorías y macros con IA en segundos. Una foto y listo.',
    'feat.goals.eyebrow': 'Metas diarias',
    'feat.goals.title': 'Controla tus',
    'feat.goals.titleAccent': 'macros',
    'feat.goals.body': 'Objetivos diarios y progreso real. Proteína, carbos y grasas de un vistazo.',
    'feat.strength.eyebrow': 'Programa de fuerza',
    'feat.strength.title': 'Entrena',
    'feat.strength.titleAccent': 'fuerza',
    'feat.strength.body': 'Dominadas, press banca y tus PR. Series descendentes por RM.',
    'feat.coach.eyebrow': 'Coach IA',
    'feat.coach.title': 'Tu',
    'feat.coach.titleAccent': 'coach IA',
    'feat.coach.body': 'Planes y consejos personalizados. Cálculo de TDEE y listas de compra.',
    'counters.workouts': 'Reps registradas',
    'counters.macros': 'Comidas analizadas',
    'counters.prs': 'PR conseguidos',
    'waitlist.title': 'Entra a la lista',
    'waitlist.body': 'Sé de los primeros en usar TRAKI. Sin spam.',
    'waitlist.placeholder': 'tu@email.com',
    'waitlist.cta': 'Únete',
    'waitlist.success': 'Estás dentro. Te avisamos.',
    'waitlist.error': 'Algo falló. Inténtalo de nuevo.',
    'footer.tagline': 'Sin atajos. Solo reps.',
    'footer.privacy': 'Privacidad',
  },
  en: {
    'nav.cta': 'Join',
    'hero.title.1': 'No shortcuts.',
    'hero.title.2': 'Just reps.',
    'hero.subtitle': 'Train strength and track your macros. One app, zero excuses.',
    'hero.cta': 'Join the list',
    'feat.analyze.eyebrow': 'AI nutrition',
    'feat.analyze.title': 'Scan your',
    'feat.analyze.titleAccent': 'food',
    'feat.analyze.body': 'Calories and macros with AI in seconds. One photo, done.',
    'feat.goals.eyebrow': 'Daily goals',
    'feat.goals.title': 'Own your',
    'feat.goals.titleAccent': 'macros',
    'feat.goals.body': 'Daily targets and real progress. Protein, carbs and fat at a glance.',
    'feat.strength.eyebrow': 'Strength program',
    'feat.strength.title': 'Train',
    'feat.strength.titleAccent': 'strength',
    'feat.strength.body': 'Pull-ups, bench press and your PRs. Descending sets by 1RM.',
    'feat.coach.eyebrow': 'AI coach',
    'feat.coach.title': 'Your',
    'feat.coach.titleAccent': 'AI coach',
    'feat.coach.body': 'Personalized plans and tips. TDEE calculation and shopping lists.',
    'counters.workouts': 'Reps logged',
    'counters.macros': 'Meals analyzed',
    'counters.prs': 'PRs hit',
    'waitlist.title': 'Get on the list',
    'waitlist.body': 'Be among the first to use TRAKI. No spam.',
    'waitlist.placeholder': 'you@email.com',
    'waitlist.cta': 'Join',
    'waitlist.success': "You're in. We'll reach out.",
    'waitlist.error': 'Something failed. Try again.',
    'footer.tagline': 'No shortcuts. Just reps.',
    'footer.privacy': 'Privacy',
  },
};

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang][key] ?? key;
  };
}

export function oppositeLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
