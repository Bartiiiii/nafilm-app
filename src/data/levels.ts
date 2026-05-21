import type { Level } from "@/types";

export const levels: Level[] = [
  {
    id: "purkino",
    order: 1,
    title: "Train Your Eye",
    room: "Purkino — The Laboratory of Moving Images",
    description:
      "Enter the laboratory of Czech scientist Jan Evangelista Purkyne, who played a vital role on the way to moving pictures. His research on persistence of vision proved that the eye — and the mind — hold onto images longer than reality lasts.",
    points: 100,
    badgeId: "eye-of-cinema",
    recommendationSignals: ["visual-illusion", "experimental", "classic-cinema"],
    game: {
      type: "sequence",
      items: [
        { id: "a", label: "Fix your gaze on the dot — don't blink", emoji: "👁️" },
        { id: "b", label: "Blink your eyes several times quickly", emoji: "✨" },
        { id: "c", label: "Look at a plain wall in front of you", emoji: "🧱" },
        { id: "d", label: "Watch the afterimage appear — then fade", emoji: "🌈" },
      ],
      correctOrder: ["a", "b", "c", "d"],
    },
    curioFacts: [
      "Purkyne began his research on human vision in 1818 — nearly 70 years before the invention of cinema.",
      "His stroboscopic effect (fast flickering light that separates images) became the fundamental principle behind all motion pictures.",
      "Purkyne's 'inner vision' theory was radical: he believed every image we see leaves a subconscious memory trace — which is exactly what makes film possible.",
    ],
  },
  {
    id: "zoetrope",
    order: 2,
    title: "Bring Motion to Life",
    room: "Zoetrope Room",
    description:
      "In 1867, optical discs were replaced by the zoetrope — a spinning cylinder with slits and a strip of pictures inside. The flickering slits create a stroboscopic effect that fools the eye into seeing movement where there is only stillness.",
    points: 110,
    badgeId: "motion-maker",
    recommendationSignals: ["animation", "stop-motion", "playful"],
    game: {
      type: "quiz",
      questions: [
        {
          text: "How does the zoetrope create the illusion of movement?",
          options: [
            "By spinning the pictures very fast with a motor",
            "By flickering slits that create a stroboscopic effect",
            "By painting the images with special luminescent paint",
            "By using curved mirrors to blend images together",
          ],
          correct: 1,
        },
        {
          text: "What happens when you switch from constant light to strobe light on the zoetrope?",
          options: [
            "The puppets stop completely and look frozen",
            "The rotation hides in darkness — making the puppets appear to move",
            "The cylinder spins faster and the images blur",
            "The colours in the pictures change",
          ],
          correct: 1,
        },
        {
          text: "What did Purkyne prove about the stroboscopic effect?",
          options: [
            "It only works with very fast motors",
            "You need physical slits to create it",
            "It can also be achieved with a blinking light alone — no slits needed",
            "It requires at least 100 images per second",
          ],
          correct: 2,
        },
      ],
      passMark: 2,
    },
    curioFacts: [
      "The zoetrope was invented in 1867, replacing earlier optical discs with a spinning cylinder of puppets.",
      "Our museum's zoetrope works both with slits and with strobe light — proving the illusion comes from the rhythm of darkness between images.",
      "Without the flickering effect, the eye would see only a blurred smear of colour — not movement.",
    ],
  },
  {
    id: "magic-lantern",
    order: 3,
    title: "Become the Grand Projectionist",
    room: "Laterna Magika",
    description:
      "Long before cinema, images were projected by magic lanterns. From Jesuit classrooms to ghost-filled phantasmagorias, the magic lantern was the first public image projection technology — and its principle persists in every projector today.",
    points: 115,
    badgeId: "lanternist",
    recommendationSignals: ["classic-cinema", "film-history", "craft"],
    game: {
      type: "match",
      pairs: [
        {
          left: "Magic lantern (17th century)",
          right: "Jesuit teachers projected stories onto glass in lessons",
        },
        {
          left: "Phantasmagoria",
          right: "Audiences surrounded by terrifying supernatural creatures",
        },
        {
          left: "Praxinoscope + magic lantern",
          right: "First animated projections — 10 years before cinema!",
        },
      ],
    },
    curioFacts: [
      "Magic lanterns were first used by Jesuit teachers in the 17th century as classroom teaching tools — centuries before cinema.",
      "Phantasmagorias were elaborate horror shows using multiple lanterns, projecting ghosts and demons onto smoke and hanging sheets to terrify audiences.",
      "By combining a magic lantern with a praxinoscope in the 1880s, inventors projected animations a full decade before the Lumière Brothers' Cinematograph.",
    ],
  },
  {
    id: "world-cinematograph",
    order: 4,
    title: "Travel the World in Minutes",
    room: "Around the World with a Cinematograph",
    description:
      "The first cinema audiences were not sitting in quiet theatres — they were at fairs and carnivals, watching exotic images of faraway places. Early film gave ordinary people the power to travel the entire globe without leaving their seat.",
    points: 120,
    badgeId: "world-traveller",
    recommendationSignals: ["film-history", "classic-cinema"],
    game: {
      type: "quiz",
      questions: [
        {
          text: "Where were the first films most often shown to the general public?",
          options: [
            "In luxury opera houses",
            "At fairs and carnivals as cheap attractions",
            "In university lecture halls",
            "In private palace screening rooms",
          ],
          correct: 1,
        },
        {
          text: "What was watching early cinema often compared to?",
          options: [
            "Attending a theatre play",
            "Reading an illustrated novel",
            "Riding a train for the first time",
            "Visiting a museum",
          ],
          correct: 2,
        },
        {
          text: "What was 'Hale's Tour', which premiered at the 1904 St. Louis World Fair?",
          options: [
            "A circus act featuring trained animals",
            "A film about exotic animals around the world",
            "A railway carriage simulator with films projected through the windows",
            "A hot-air balloon ride over world cities",
          ],
          correct: 2,
        },
      ],
      passMark: 2,
    },
    curioFacts: [
      "A single cinema programme in the early 1900s could take viewers from Egypt to Japan to the American West — all within 20 minutes.",
      "'Hale's Tour' (1904) was essentially the world's first virtual reality experience: audiences sat in a railway carriage while films of exotic landscapes played through the windows.",
      "At the time, even a train ride was a novelty for most people — which is why trains became the most filmed subject in the entire history of early cinema.",
    ],
  },
  {
    id: "foley-room",
    order: 5,
    title: "Design the Sound",
    room: "Film Has Never Been Silent",
    description:
      "Early film screenings were accompanied by pianists, orchestras, and — most intriguingly — Foley artists hiding behind the screen. Cinema has never truly been silent. You can become a Foley artist too.",
    points: 125,
    badgeId: "foley-artist",
    recommendationSignals: ["sound-design", "thriller", "atmosphere"],
    game: {
      type: "match",
      pairs: [
        {
          left: "The sound of galloping horse hooves",
          right: "Coconut shells clapped together",
        },
        {
          left: "Footsteps crunching through deep snow",
          right: "Squeezing a bag of potato starch",
        },
        {
          left: "A slow, creaking wooden door",
          right: "A leather shoe sole bending back and forth",
        },
      ],
    },
    curioFacts: [
      "Foley artists were already hiding behind cinema screens in the silent film era, providing live sound effects during every screening.",
      "The coconut shell trick for horse hooves is so effective that it is still used in film productions today — and Foley artists guard their techniques as trade secrets.",
      "The art of Foley relies on imagination and surprise: the most convincing sounds are almost never made by the objects they represent.",
    ],
  },
  {
    id: "cinema-attractions",
    order: 6,
    title: "Hold the Crowd",
    room: "Cinema of Attractions",
    description:
      "Early cinema halls were loud, busy, and chaotic. Films couldn't tell long stories yet, so film lecturers narrated the images live to keep the audience excited. Then filmmakers discovered that camera and editing could do the lecturer's job — and more.",
    points: 130,
    badgeId: "lecturer",
    recommendationSignals: ["storytelling", "classic-cinema", "film-history"],
    game: {
      type: "sequence",
      items: [
        { id: "a", label: "Short moving images with no story — just spectacle", emoji: "🎪" },
        { id: "b", label: "Film lecturers narrate and explain each scene live", emoji: "🎙️" },
        { id: "c", label: "Intertitles replace spoken narration in text on screen", emoji: "📝" },
        { id: "d", label: "Camera angles and editing tell stories on their own", emoji: "🎥" },
      ],
      correctOrder: ["a", "b", "c", "d"],
    },
    curioFacts: [
      "Early cinema audiences talked, reacted loudly, and shouted — nothing like the silent cinema-going experience we know today.",
      "Film lecturers had enormous power: a badly narrated film could be transformed from a drama into a comedy, ruining the producer's intentions entirely.",
      "Three landmark films shown in this room — 'Berlin: Symphony of a Great City', 'Man with a Movie Camera', and 'The Wheel' — show the moment editing replaced the lecturer.",
    ],
  },
  {
    id: "sound-in-film",
    order: 7,
    title: "Imprint the Sound",
    room: "Sound in Film",
    description:
      "Film history is usually divided into silent and sound eras — but this is one of cinema's great myths. Film always had sound. The real revolution was recording it permanently onto the film reel itself, so every screening would sound the same.",
    points: 135,
    badgeId: "sound-pioneer",
    recommendationSignals: ["sound-design", "film-history"],
    game: {
      type: "sequence",
      items: [
        { id: "a", label: "Foley artists and musicians perform live in cinema halls", emoji: "🎹" },
        { id: "b", label: "Inventors seek a way to record sound permanently onto film", emoji: "🔬" },
        { id: "c", label: "Optical sound track imprinted directly onto the film reel", emoji: "📽️" },
        { id: "d", label: "Sound films transform the entire industry — and silence is lost", emoji: "🎤" },
      ],
      correctOrder: ["a", "b", "c", "d"],
    },
    curioFacts: [
      "For decades, the myth persisted that 'The Jazz Singer' (1927) was the first sound film. In reality, cinema had relied on live sound from its very first day.",
      "Optical sound recording involves imprinting the audio signal as a visible waveform directly onto the edge of the film strip — right next to the picture frames.",
      "When synchronized sound arrived, many directors became obsessed with dialogue and forgot the visual storytelling language they had spent 30 years developing.",
    ],
  },
  {
    id: "imaginary-cinema",
    order: 8,
    title: "Project Inside Your Mind",
    room: "Imaginary Cinema",
    description:
      "Enter a cinema where the films play inside your head. The Czech avant-garde movement Devetsil believed imagination was the basis of all creation — so they wrote their films as visual poems on paper, letting the reader's mind do all the directing.",
    points: 140,
    badgeId: "dreamer",
    recommendationSignals: ["experimental", "visual-storytelling"],
    game: {
      type: "quiz",
      questions: [
        {
          text: "What made the Devetsil movement's 'imaginary cinema' unique?",
          options: [
            "They used the most advanced camera technology available",
            "Their films existed only on paper as visual poems — projected inside the reader's mind",
            "They built their own underground cinema halls in Prague",
            "They filmed in extremely slow motion",
          ],
          correct: 1,
        },
        {
          text: "Why couldn't Devetsil poets film their visions?",
          options: [
            "Film equipment was too expensive for them",
            "Camera technology of the time couldn't capture the full scope of their imagination",
            "Film was politically banned in Czechoslovakia",
            "They philosophically preferred painting over cinema",
          ],
          correct: 1,
        },
        {
          text: "When reading a Devetsil visual poem, the reader was acting as...",
          options: [
            "A passive spectator watching a screen",
            "A musician interpreting a score",
            "A film editor, assembling meaning from fragments",
            "A theatre director staging a performance",
          ],
          correct: 2,
        },
      ],
      passMark: 2,
    },
    curioFacts: [
      "Devetsil poets like Jiří Voskovec and Jaroslav Seifert wrote entire 'films' as sequences of short visual images on the printed page — no camera required.",
      "For Devetsil, imagination was both the basis of art and the basis of life — their imaginary cinema was the most democratic art form: anyone could project it.",
      "The reader of a Devetsil visual poem was simultaneously the cinematographer, the editor, and the audience — all at once.",
    ],
  },
  {
    id: "express-train",
    order: 9,
    title: "Ride the Avant-Garde Express",
    room: "The Express Train to the Human Soul",
    description:
      "Board the avant-garde express — a journey through the imagery, energy, and optimism of the Czech avant-garde. Inspired by poems, collages, and film librettos, this room celebrates the enchantment with technology, travel, circus, and the beauty hidden in everyday modern life.",
    points: 140,
    badgeId: "avant-garde",
    recommendationSignals: ["experimental", "film-history"],
    game: {
      type: "match",
      pairs: [
        {
          left: "The locomotive",
          right: "Symbol of the modern era — beauty found in technology",
        },
        {
          left: "Exotic faraway travels",
          right: "Czech avant-garde's romantic fascination with the wider world",
        },
        {
          left: "Circus acrobats at fairs",
          right: "Part of a new, optimistic sensory-rich way of living",
        },
      ],
    },
    curioFacts: [
      "Czech avant-garde poets were fascinated by locomotives, factories, circuses, and foreign cities — symbols of a new, optimistic modern era.",
      "The avant-garde 'express train' wasn't just about transport — it was a metaphor for the speed, energy, and possibility of modern life.",
      "Devetsil's collages combined images of trains, acrobats, skyscrapers, and exotic places as a visual manifesto of the 20th century's sensory explosion.",
    ],
  },
  {
    id: "cinema-insight",
    order: 10,
    title: "See the Invisible",
    room: "The Cinema of Insight",
    description:
      "The camera reveals what the naked eye cannot see. Through time-lapse photography, scientific filmmakers of the 1920s and 1930s showed audiences that even a plant growing or a hand working on a Tuesday could become a breathtaking aesthetic experience.",
    points: 145,
    badgeId: "observer",
    recommendationSignals: ["visual-storytelling", "experimental"],
    game: {
      type: "sequence",
      items: [
        { id: "a", label: "Seed rests beneath the soil in darkness", emoji: "🌱" },
        { id: "b", label: "First shoot pushes up through the earth", emoji: "🌿" },
        { id: "c", label: "Stem rises, leaves unfurl toward the light", emoji: "🍃" },
        { id: "d", label: "Full bloom — the flower opens completely", emoji: "🌸" },
      ],
      correctOrder: ["a", "b", "c", "d"],
    },
    curioFacts: [
      "Vladimír Úlehla's 1928 film 'Motions of Plants' used time-lapse photography to reveal the hidden dance of plants — a scientific film with the impact of poetry.",
      "Jiří Lehovec's 1939 'The Thaumaturgic Eye' followed a single ordinary day so closely that even the annoyance of a morning alarm became a fascinating aesthetic experience.",
      "The Cinema of Insight movement believed the camera's 'unfamiliar eye' could make ordinary people see their own world as if for the very first time.",
    ],
  },
  {
    id: "animated-film",
    order: 11,
    title: "Master the 12 Principles",
    room: "Animated Film",
    description:
      "Animation creates the illusion of movement — but making it believable requires discipline. Walt Disney's studio codified 12 principles of animation that govern how characters must move, react, and feel in order to seem truly alive on screen.",
    points: 150,
    badgeId: "animator",
    recommendationSignals: ["animation", "stop-motion", "visual-storytelling"],
    game: {
      type: "match",
      pairs: [
        {
          left: "Squash and Stretch",
          right: "Change shape during motion while preserving volume",
        },
        {
          left: "Anticipation",
          right: "Foreshadow action with a visible contra-movement",
        },
        {
          left: "Timing",
          right: "Animation speed controls how believable a character feels",
        },
        {
          left: "Exaggeration",
          right: "Show reality in a more extreme and emphasised form",
        },
      ],
    },
    curioFacts: [
      "The first animated film was created in 1888 by Émile Reynaud — a full seven years before the Lumière Brothers invented the Cinematograph.",
      "Disney's 12 principles, developed in the 1930s, are still taught in every animation school worldwide and apply equally to modern computer animation.",
      "Without exaggeration, animated characters look too stiff and mechanical to feel alive — even Disney recognised that 'realistic' animation was boring animation.",
    ],
  },
  {
    id: "bratri-v-triku",
    order: 12,
    title: "Czech Animation's Soul",
    room: "Bratři v Triku: Czech Animation Studio",
    description:
      "At the 1946 Cannes Film Festival, a young Czech animator named Jiří Trnka shocked the world by beating Disney. The Czech studio Bratři v Triku (Brothers in Trick) built each film around a single artist's personal vision — creating works unlike anything the world had seen.",
    points: 160,
    badgeId: "czech-animation",
    recommendationSignals: ["animation", "stop-motion", "experimental"],
    game: {
      type: "quiz",
      questions: [
        {
          text: "What surprised the Cannes Film Festival jury in 1946?",
          options: [
            "Disney won again with a record-breaking film",
            "A young Czech animator named Jiří Trnka beat Disney",
            "No animated films were accepted to the festival",
            "An Italian neorealist film won every prize",
          ],
          correct: 1,
        },
        {
          text: "What made the Czech studio Bratři v Triku fundamentally different from Disney?",
          options: [
            "They used more animators and larger budgets",
            "They specialised only in children's fairy tales",
            "Each film was built around one individual artist's personal vision",
            "They precisely copied and improved on Disney's 12 principles",
          ],
          correct: 2,
        },
        {
          text: "What is rotoscoping?",
          options: [
            "Drawing animated characters frame-by-frame over live actor footage",
            "A technique for spinning a camera in an arc during filming",
            "Projecting multiple images simultaneously using mirrors",
            "A type of strobe lighting used on animation sets",
          ],
          correct: 0,
        },
      ],
      passMark: 2,
    },
    curioFacts: [
      "Jiří Trnka's Cannes win in 1946 proved to the world that animation didn't need to follow Disney's rules — it could be art in its own right.",
      "Bratři v Triku put a single artist's soul at the core of each film, which meant every movie looked radically different from the last.",
      "Rotoscoping — tracing over live actor footage frame by frame — was patented in 1917. Disney used it but deliberately avoided making animations too lifelike, fearing they'd look mechanical.",
    ],
  },
];
