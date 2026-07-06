export type Lang = 'es' | 'en';

export const languages: Record<Lang, string> = { es: 'ES', en: 'EN' };

export const ui: Record<Lang, Record<string, string>> = {
  es: {
    // Nav
    'nav.features': 'Funciones',
    'nav.how': 'Cómo funciona',
    'nav.faq': 'FAQ',
    'nav.cta': 'Únete',

    // Hero
    'hero.badge': 'Fuerza + Nutrición · Una sola app',
    'hero.title.1': 'Sin atajos.',
    'hero.title.2': 'Solo reps.',
    'hero.subtitle': 'Entrena fuerza y controla tus macros en el mismo sitio. La IA cuenta tus calorías, tu programa calcula tus series y tú solo te ocupas de aparecer. Cero planillas. Cero excusas.',
    'hero.cta': 'Entra a la lista',
    'hero.cta2': 'Ver cómo funciona',
    'hero.trust.1': '2 apps en 1',
    'hero.trust.2': 'Calorías con IA en segundos',
    'hero.trust.3': 'Programa de fuerza por RM',
    'hero.trust.4': 'Coach IA 24/7',

    // Manifesto
    'manifesto.eyebrow': 'El problema',
    'manifesto.title': 'Dejar de',
    'manifesto.titleAccent': 'adivinar',
    'manifesto.body': 'Una app para pesar comida. Otra para el gym. Una libreta para los PR. Un chat con tu coach que nunca contesta a tiempo. Al final abandonas — no por falta de ganas, sino por fricción.',
    'manifesto.body2': 'TRAKI junta todo lo que necesitas para progresar en fuerza y composición corporal en una sola pantalla negra, rápida y sin ruido. Registras en segundos y vuelves a lo que importa: la próxima serie.',

    // How it works
    'how.eyebrow': 'Cómo funciona',
    'how.title': 'Tres pasos.',
    'how.titleAccent': 'Cero fricción.',
    'how.1.n': '01',
    'how.1.title': 'Fotografía tu comida',
    'how.1.body': 'Una foto del plato, un código de barras o el buscador. La IA identifica el alimento y estima porción en el acto.',
    'how.2.n': '02',
    'how.2.title': 'La IA calcula los macros',
    'how.2.body': 'Calorías, proteína, carbos y grasas al instante. Se suman a tus metas diarias y ves lo que te queda del día.',
    'how.3.n': '03',
    'how.3.title': 'Entrena y registra el PR',
    'how.3.body': 'Tu programa de fuerza calcula las series por tu RM. Marcas cada serie, guardas el récord y avanzas de semana.',

    // Features (detailed)
    'feat.eyebrow': 'Las funciones',
    'feat.section.title': 'Todo lo que necesitas.',
    'feat.section.titleAccent': 'Nada que no.',

    'feat.analyze.eyebrow': 'Nutrición con IA',
    'feat.analyze.title': 'Escanea tu',
    'feat.analyze.titleAccent': 'comida',
    'feat.analyze.body': 'Deja de pesar cada gramo. Sube una foto y la IA te devuelve calorías y macros en segundos, con historial de todo lo que comes.',
    'feat.analyze.b1': 'Foto, código de barras o búsqueda por nombre',
    'feat.analyze.b2': 'Estimación de porción y macros con IA',
    'feat.analyze.b3': 'Historial completo con calorías por comida',

    'feat.goals.eyebrow': 'Metas diarias',
    'feat.goals.title': 'Controla tus',
    'feat.goals.titleAccent': 'macros',
    'feat.goals.body': 'Fija tu objetivo de calorías y reparte proteína, carbos y grasa. TRAKI te muestra lo que llevas y lo que te falta, cada día.',
    'feat.goals.b1': 'Meta de kcal y macros personalizable',
    'feat.goals.b2': 'Anillos de progreso en tiempo real',
    'feat.goals.b3': 'Gráfico de los últimos 7 días',

    'feat.strength.eyebrow': 'Programa de fuerza',
    'feat.strength.title': 'Entrena',
    'feat.strength.titleAccent': 'fuerza',
    'feat.strength.body': 'Dominadas, press banca y más. El programa calcula tus series descendentes según tu repetición máxima y sigue cada PR que rompes.',
    'feat.strength.b1': 'Series calculadas por tu RM',
    'feat.strength.b2': 'Registro serie a serie con check',
    'feat.strength.b3': 'Progreso por semana y día',

    'feat.coach.eyebrow': 'Coach IA',
    'feat.coach.title': 'Tu',
    'feat.coach.titleAccent': 'coach IA',
    'feat.coach.body': 'Un entrenador nutricional que sí responde. Genera planes semanales, calcula tu TDEE, sugiere intercambios y arma tu lista de compra.',
    'feat.coach.b1': 'Planes semanales personalizados',
    'feat.coach.b2': 'Cálculo de TDEE y objetivos',
    'feat.coach.b3': 'Intercambios y listas de compra',

    // Bento capabilities
    'bento.eyebrow': 'Y además',
    'bento.title': 'Detalles que',
    'bento.titleAccent': 'suman',
    'bento.1.title': 'Modo oscuro real',
    'bento.1.body': 'Negro puro, pensado para el gym a las 6 AM. Sin brillos que molesten entre series.',
    'bento.2.title': 'Rápido de verdad',
    'bento.2.body': 'Registrar una comida o una serie toma segundos. La app no se interpone entre tú y el entreno.',
    'bento.3.title': 'Bilingüe',
    'bento.3.body': 'Español e inglés, cambia cuando quieras. Toda la app se adapta al instante.',
    'bento.4.title': 'Tus datos, tuyos',
    'bento.4.body': 'Tu historial de comidas y PR se queda contigo. Sin ruido, sin publicidad invasiva.',
    'bento.5.title': 'Android + iOS',
    'bento.5.body': 'Misma experiencia en los dos. Diseñada mobile-first para entrenar donde sea.',
    'bento.6.title': 'Sin planillas',
    'bento.6.body': 'Olvídate de hojas de cálculo y libretas. Todo vive en una pantalla, siempre contigo.',

    // Counters
    'counters.workouts': 'Reps registradas',
    'counters.macros': 'Comidas analizadas',
    'counters.prs': 'PR conseguidos',
    'counters.rating': 'Valoración media',

    // Testimonials
    'test.eyebrow': 'Quién entrena con TRAKI',
    'test.title': 'Atletas que',
    'test.titleAccent': 'no negocian',
    'test.1.quote': 'Por fin dejé de saltar entre tres apps. Foto, macros y series en el mismo sitio. Bajé 4 kilos sin dejar de subir en press banca.',
    'test.1.name': 'Marcos R.',
    'test.1.role': 'Powerlifting · 3 años',
    'test.2.quote': 'Lo de estimar calorías con una foto me parecía marketing. Lo uso a diario y me ahorra pesar todo. Rápido y sin dramas.',
    'test.2.name': 'Lucía G.',
    'test.2.role': 'Calistenia · amateur',
    'test.3.quote': 'El programa de fuerza por RM es justo lo que necesitaba. Marco la serie, guardo el PR y la semana siguiente ya sé qué toca.',
    'test.3.name': 'Diego T.',
    'test.3.role': 'Dominadas · nivel intermedio',

    // FAQ
    'faq.eyebrow': 'Dudas',
    'faq.title': 'Antes de',
    'faq.titleAccent': 'entrar',
    'faq.1.q': '¿La app ya está disponible?',
    'faq.1.a': 'Estamos en fase final antes del lanzamiento. Únete a la lista y serás de los primeros en recibir el acceso, sin coste por reservar tu sitio.',
    'faq.2.q': '¿Qué tan precisa es la estimación de calorías con IA?',
    'faq.2.a': 'La IA identifica el alimento y estima la porción a partir de la foto. Es una estimación rápida, no una báscula de laboratorio: perfecta para el día a día, y siempre puedes ajustar el valor a mano.',
    'faq.3.q': '¿Sirve para powerlifting y calistenia?',
    'faq.3.a': 'Sí. El módulo de fuerza trabaja con dominadas, press banca y ejercicios por repetición máxima, con series descendentes. Está pensado para atletas de fuerza y calistenia serios.',
    'faq.4.q': '¿Necesito internet para usarla?',
    'faq.4.a': 'El análisis con IA y el coach necesitan conexión. El registro de series y el seguimiento diario están pensados para ser rápidos incluso con señal pobre en el gimnasio.',
    'faq.5.q': '¿En qué plataformas estará?',
    'faq.5.a': 'Android e iOS, con la misma experiencia en ambas. Diseño mobile-first, modo oscuro y disponible en español e inglés.',

    // Waitlist
    'waitlist.eyebrow': 'Reserva tu sitio',
    'waitlist.title': 'Entra a la lista',
    'waitlist.body': 'Sé de los primeros en usar TRAKI. Te avisamos el día del lanzamiento — sin spam, sin compromiso.',
    'waitlist.placeholder': 'tu@email.com',
    'waitlist.cta': 'Únete',
    'waitlist.note': 'Cero spam. Solo el aviso de lanzamiento y nada más.',
    'waitlist.success': 'Estás dentro. Te avisamos.',
    'waitlist.error': 'Algo falló. Inténtalo de nuevo.',

    // Footer
    'footer.tagline': 'Sin atajos. Solo reps. La app de fuerza y nutrición para atletas que van en serio.',
    'footer.col.product': 'Producto',
    'footer.col.company': 'Info',
    'footer.link.features': 'Funciones',
    'footer.link.how': 'Cómo funciona',
    'footer.link.faq': 'FAQ',
    'footer.link.waitlist': 'Lista de espera',
    'footer.privacy': 'Privacidad',
    'footer.rights': 'Todos los derechos reservados.',
  },
  en: {
    // Nav
    'nav.features': 'Features',
    'nav.how': 'How it works',
    'nav.faq': 'FAQ',
    'nav.cta': 'Join',

    // Hero
    'hero.badge': 'Strength + Nutrition · One app',
    'hero.title.1': 'No shortcuts.',
    'hero.title.2': 'Just reps.',
    'hero.subtitle': 'Train strength and track your macros in the same place. AI counts your calories, your program calculates your sets, and all you do is show up. No spreadsheets. No excuses.',
    'hero.cta': 'Join the list',
    'hero.cta2': 'See how it works',
    'hero.trust.1': '2 apps in 1',
    'hero.trust.2': 'AI calories in seconds',
    'hero.trust.3': 'Strength program by 1RM',
    'hero.trust.4': 'AI coach 24/7',

    // Manifesto
    'manifesto.eyebrow': 'The problem',
    'manifesto.title': 'Stop',
    'manifesto.titleAccent': 'guessing',
    'manifesto.body': 'One app to weigh food. Another for the gym. A notebook for your PRs. A chat with a coach who never replies in time. Eventually you quit — not from lack of will, but from friction.',
    'manifesto.body2': 'TRAKI puts everything you need to progress in strength and body composition on a single black screen — fast and noise-free. You log in seconds and get back to what matters: the next set.',

    // How it works
    'how.eyebrow': 'How it works',
    'how.title': 'Three steps.',
    'how.titleAccent': 'Zero friction.',
    'how.1.n': '01',
    'how.1.title': 'Photograph your food',
    'how.1.body': 'A photo of your plate, a barcode, or the search bar. The AI identifies the food and estimates the portion on the spot.',
    'how.2.n': '02',
    'how.2.title': 'The AI computes macros',
    'how.2.body': 'Calories, protein, carbs and fat instantly. They add to your daily goals and you see what you have left for the day.',
    'how.3.n': '03',
    'how.3.title': 'Train and log the PR',
    'how.3.body': 'Your strength program calculates sets from your 1RM. You check off each set, save the record and move to the next week.',

    // Features (detailed)
    'feat.eyebrow': 'The features',
    'feat.section.title': 'Everything you need.',
    'feat.section.titleAccent': 'Nothing you don’t.',

    'feat.analyze.eyebrow': 'AI nutrition',
    'feat.analyze.title': 'Scan your',
    'feat.analyze.titleAccent': 'food',
    'feat.analyze.body': 'Stop weighing every gram. Snap a photo and the AI returns calories and macros in seconds, with a full history of everything you eat.',
    'feat.analyze.b1': 'Photo, barcode or search by name',
    'feat.analyze.b2': 'AI portion and macro estimation',
    'feat.analyze.b3': 'Full history with calories per meal',

    'feat.goals.eyebrow': 'Daily goals',
    'feat.goals.title': 'Own your',
    'feat.goals.titleAccent': 'macros',
    'feat.goals.body': 'Set your calorie target and split protein, carbs and fat. TRAKI shows what you’ve hit and what’s left, every single day.',
    'feat.goals.b1': 'Custom kcal and macro targets',
    'feat.goals.b2': 'Real-time progress rings',
    'feat.goals.b3': 'Last 7 days chart',

    'feat.strength.eyebrow': 'Strength program',
    'feat.strength.title': 'Train',
    'feat.strength.titleAccent': 'strength',
    'feat.strength.body': 'Pull-ups, bench press and more. The program calculates your descending sets from your one-rep max and tracks every PR you break.',
    'feat.strength.b1': 'Sets calculated from your 1RM',
    'feat.strength.b2': 'Set-by-set logging with checks',
    'feat.strength.b3': 'Progress by week and day',

    'feat.coach.eyebrow': 'AI coach',
    'feat.coach.title': 'Your',
    'feat.coach.titleAccent': 'AI coach',
    'feat.coach.body': 'A nutrition coach that actually answers. It builds weekly plans, calculates your TDEE, suggests swaps and puts together your shopping list.',
    'feat.coach.b1': 'Personalized weekly plans',
    'feat.coach.b2': 'TDEE and goal calculation',
    'feat.coach.b3': 'Food swaps and shopping lists',

    // Bento capabilities
    'bento.eyebrow': 'And more',
    'bento.title': 'Details that',
    'bento.titleAccent': 'add up',
    'bento.1.title': 'True dark mode',
    'bento.1.body': 'Pure black, built for the gym at 6 AM. No glare to bother you between sets.',
    'bento.2.title': 'Genuinely fast',
    'bento.2.body': 'Logging a meal or a set takes seconds. The app never gets between you and the workout.',
    'bento.3.title': 'Bilingual',
    'bento.3.body': 'Spanish and English, switch anytime. The whole app adapts instantly.',
    'bento.4.title': 'Your data, yours',
    'bento.4.body': 'Your meal and PR history stays with you. No noise, no invasive ads.',
    'bento.5.title': 'Android + iOS',
    'bento.5.body': 'Same experience on both. Mobile-first, designed to train anywhere.',
    'bento.6.title': 'No spreadsheets',
    'bento.6.body': 'Forget spreadsheets and notebooks. It all lives on one screen, always with you.',

    // Counters
    'counters.workouts': 'Reps logged',
    'counters.macros': 'Meals analyzed',
    'counters.prs': 'PRs hit',
    'counters.rating': 'Average rating',

    // Testimonials
    'test.eyebrow': 'Who trains with TRAKI',
    'test.title': 'Athletes who',
    'test.titleAccent': 'don’t negotiate',
    'test.1.quote': 'I finally stopped jumping between three apps. Photo, macros and sets in one place. Dropped 4 kilos while still adding to my bench.',
    'test.1.name': 'Marcos R.',
    'test.1.role': 'Powerlifting · 3 years',
    'test.2.quote': 'Estimating calories from a photo sounded like marketing. I use it daily and it saves me weighing everything. Fast, no drama.',
    'test.2.name': 'Lucía G.',
    'test.2.role': 'Calisthenics · amateur',
    'test.3.quote': 'The 1RM-based strength program is exactly what I needed. Check the set, save the PR, and next week I already know what’s up.',
    'test.3.name': 'Diego T.',
    'test.3.role': 'Pull-ups · intermediate',

    // FAQ
    'faq.eyebrow': 'Questions',
    'faq.title': 'Before you',
    'faq.titleAccent': 'join',
    'faq.1.q': 'Is the app available yet?',
    'faq.1.a': 'We’re in the final stretch before launch. Join the list and you’ll be among the first to get access — reserving your spot is free.',
    'faq.2.q': 'How accurate is the AI calorie estimate?',
    'faq.2.a': 'The AI identifies the food and estimates the portion from the photo. It’s a fast estimate, not a lab scale: perfect for everyday use, and you can always adjust the value by hand.',
    'faq.3.q': 'Does it work for powerlifting and calisthenics?',
    'faq.3.a': 'Yes. The strength module handles pull-ups, bench press and one-rep-max exercises with descending sets. It’s built for serious strength and calisthenics athletes.',
    'faq.4.q': 'Do I need internet to use it?',
    'faq.4.a': 'AI analysis and the coach need a connection. Set logging and daily tracking are built to stay fast even with poor signal at the gym.',
    'faq.5.q': 'Which platforms will it be on?',
    'faq.5.a': 'Android and iOS, with the same experience on both. Mobile-first design, dark mode, and available in Spanish and English.',

    // Waitlist
    'waitlist.eyebrow': 'Reserve your spot',
    'waitlist.title': 'Get on the list',
    'waitlist.body': 'Be among the first to use TRAKI. We’ll ping you on launch day — no spam, no commitment.',
    'waitlist.placeholder': 'you@email.com',
    'waitlist.cta': 'Join',
    'waitlist.note': 'Zero spam. Just the launch heads-up, nothing else.',
    'waitlist.success': 'You’re in. We’ll reach out.',
    'waitlist.error': 'Something failed. Try again.',

    // Footer
    'footer.tagline': 'No shortcuts. Just reps. The strength and nutrition app for athletes who mean it.',
    'footer.col.product': 'Product',
    'footer.col.company': 'Info',
    'footer.link.features': 'Features',
    'footer.link.how': 'How it works',
    'footer.link.faq': 'FAQ',
    'footer.link.waitlist': 'Waitlist',
    'footer.privacy': 'Privacy',
    'footer.rights': 'All rights reserved.',
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
