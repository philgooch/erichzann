// --- ACT 3 SCENES DATA ---
// THE MUSIC OF THE VOID
// Five scenes building to the final confrontation, three routing scenes,
// and five endings determined by accumulated state variables.
// Skill tests: Perception (3.1), Luck (3.2), Sanity (3.3, 3.4)
// Ending C override: if sanity <= 10 && dread >= 5, any Scene 3.5 choice
// routes to ending_void regardless of player action.
const ACT3_SCENES = {

// ============ ACT 3 TITLE ============
'a3_title': {
  type: 'act_title',
  actNum: 'Act Three',
  actName: 'The Music of the Void',
  ambience: 'storm',
  next: 's3_1'
},


// ========================================================================
// SCENE 3.1 — THE LAST EVENING
// Something is wrong tonight. The air itself has changed. The silence
// between Zann's notes has a different texture — expectant, taut,
// as if the world is holding its breath.
// PERCEPTION TEST (deferred): sensing what has changed.
// ========================================================================
's3_1': {
  paragraph: 200,
  title: 'The Last Evening',
  ambience: 'night',
  audio: [
    { src: 'Bleakwater_Docks-dark_tone_loop.ogg', volume: 0.1, loop: false },
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.2, loop: true },
  ],
  text: `<p>You know before you open your eyes. Before your feet touch the cold floorboards, before the last light of the afternoon reaches the window that looks onto nothing. Something has changed.</p>
<p>The air in your room is wrong. Too still, too heavy, carrying a pressure that sits behind the eyes like the onset of a fever. The gaslight flickers without a draught. The walls of the boarding house groan softly, the way old timber groans before a storm, except the sky outside is clear. Colourless, but clear.</p>
<p>You stand at the window. The brick wall opposite offers nothing. Below, the Rue d\u2019Auseil is empty. The cobblestones gleam with a faint moisture that has no source. The gas lamps are already lit, their greenish-yellow glow pooling in the gutters like something spilled.</p>
<p>The music has not yet started. Zann usually begins around eleven, but it is barely seven and the silence from the garret above is absolute. You have grown accustomed to the smaller sounds of the old man's evening routine: the scrape of the chair, the creak of the floorboards as he crosses to the window, the dry snap of the viol case opening. Tonight there is nothing. The garret is silent in the way that sealed rooms are silent.</p>`,
  conditionals: [
    {
      check: 'committed_to_stay >= 1',
      text: `<p>You promised to stay. To fight alongside him when the time came. The promise feels heavier tonight, less abstract. The time, you suspect, has come.</p>`
    },
    {
      check: 'knowledge >= 4',
      text: `<p>You recognise what the silence means. The manuscript described it: the thinning of the barrier, the window between worlds losing its resistance, the void pressing closer. Zann called it <em>le silence avant</em>. The silence before.</p>`
    }
  ],
  closingText: `<p>The evening stretches ahead of you. The silence from the garret deepens. And somewhere, above the rooftops and the city wall, at the edge of everything, something waits with a patience that has nothing to do with time.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Go to Zann now. Warn him that something feels different tonight.',
      paragraph: 201,
      effects: { zann_trust: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1, dread: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception — Success!</strong> As you climb the stairs you notice details that confirm your instinct: the temperature drops with each floor, measurably, as if heat itself is being drained upward. The wood of the banister is damp with condensation. And from behind Zann's door, you hear a sound that is not silence but its opposite — a frequency so low it exists only as a vibration in your teeth and your fingertips. The void is closer tonight than it has ever been.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception — Failed.</strong> You sense that something is wrong but cannot identify what. The stairs are dark, the house is quiet, and whatever signal you are trying to read remains just beyond your comprehension.</div>`
      },
      outcome: `<p>You take the stairs two at a time. The boarding house is quiet around you. No sound from the clerk's room. No light beneath any door. The other tenants have withdrawn into their separate silences, each one sealed away behind wood and plaster, pretending the night is ordinary.</p>
<p>Zann's door is closed. You knock. The sound is very small in the stairwell.</p>
<p>A long pause. Then footsteps, slow and deliberate. The door opens a crack. Zann's face appears in the gap: grey, drawn, the enormous spectacles reflecting the thin candlelight from within. He looks at you for a moment. Then he opens the door wider and steps aside.</p>
<p>The garret is cold. Colder than the stairwell, colder than your room, cold in a way that has nothing to do with the season. The viol lies on the table, not in its case. The bow beside it. The manuscript pages are spread in a wide arc across the floor, weighted down with stones and candlesticks, arranged in some pattern you cannot immediately read.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann's Note</div><div class="dialog-text">You feel it too. Good. I was afraid I was the only one. It is coming. Tonight, I think. Perhaps tomorrow. But soon.</div></div>
<p class="thought">He knows. He has been preparing all day while I sat in my room feeling the wrongness and doing nothing. The pages on the floor are a diagram, I realise. A map of frequencies. A battle plan.</p>`,
      next: 's3_2'
    },
    {
      label: 'B',
      text: 'Review your manuscript notes. If something is coming, you need to be prepared.',
      paragraph: 202,
      condition: 'has_manuscript >= 1',
      effects: { knowledge: 1 },
      outcome: `<p>You take out the copied pages and spread them on your desk. The notation swims before your eyes in the thin gaslight, but you have studied it enough now to read the essential shapes. The frequencies. The intervals. The mathematical relationships that Zann mapped over thirty years of nightly confrontation.</p>
<p>One passage catches your attention. You have read it before, but tonight the words carry a different weight:</p>
<p><em>The barrier is not constant. It thins and thickens with cycles I cannot predict. On the nights of greatest thinning, the music must be perfect. A single wrong frequency, a single missed interval, and the window opens. Not the glass. The other window. The one between here and the place that is not a place.</em></p>
<p>You fold the pages and put them in your coat pocket. Whatever happens tonight, you will carry the knowledge with you.</p>
<p class="thought">The barrier is thinning. I can feel it in the air, in the silence, in the cold that seeps down through the ceiling from the garret above. Zann's words on paper are the closest thing I have to a weapon. I hope they are enough.</p>`,
      next: 's3_2'
    },
    {
      label: 'C',
      text: 'Watch from your window. Try to understand what has changed.',
      paragraph: 203,
      effects: { dread: 1 },
      outcome: `<p>You pull the chair to the window and sit. The brick wall opposite is three feet away, filling the frame entirely, its surface dark with decades of soot and rain. There is nothing to see. There has never been anything to see from this window.</p>
<p>But tonight the wall looks different. The mortar between the bricks appears to pulse faintly, expanding and contracting with a rhythm you can almost count. You press your hand to the glass. The cold bites your palm. Through the contact, you feel a vibration: deep, regular, immense, like the heartbeat of something buried beneath the foundations of the city.</p>
<p>You pull your hand away. The vibration lingers in your fingers.</p>
<p>Below, the Rue d\u2019Auseil remains empty. The gas lamps flicker in unison, dimming and brightening together, breathing. The cobblestones gleam. And at the far end of the street, where the road curves upward toward the ancient city wall, you see something that makes you grip the windowsill. The wall is closer. Not by much. A few feet, perhaps. But you have walked this street every day for weeks, and you know its dimensions the way you know the dimensions of your own body, and the wall is closer.</p>
<p>The street is contracting.</p>
<p class="thought">The street itself is changing. Closing in, tightening, like a fist around something it does not want to release. Whatever is coming tonight, the Rue d\u2019Auseil knows it too.</p>`,
      next: 's3_2'
    }
  ]
},


// ========================================================================
// SCENE 3.2 — THE STORM
// An unnatural wind. The building shudders. The gas lamps go out.
// LUCK TEST (immediate): navigating the chaos.
// ========================================================================
's3_2': {
  paragraph: 204,
  title: 'The Storm',
  ambience: 'storm',
  text: `<p>It begins at nine o'clock. Not with thunder, not with rain, but with a sound like the sky splitting along an invisible seam.</p>
<p>The wind comes from everywhere at once. It does not blow from a direction. It radiates, the way heat radiates from a furnace, expanding outward from a point you cannot locate. The boarding house lurches. The walls flex. Plaster dust sifts down from the ceiling and the gaslight dies with a sharp hiss, plunging your room into darkness.</p>
<p>In the darkness, you hear the house. It speaks with a voice of timber and stone: creaking, groaning, the joints between its bones shifting under a pressure they were never built to bear. Somewhere below, glass shatters. A door slams, then slams again, then slams a third time with a finality that sounds like a bone breaking.</p>
<p>Through your window, the brick wall opposite has vanished into blackness. The gas lamps in the street are dead. The only light comes from above: a thin, sourceless luminance that filters down through the ceiling from the garret, cold and blue-white, the colour of starlight in a sky with no stars.</p>`,
  conditionals: [
    {
      check: 'knowledge >= 3',
      text: `<p>You recognise the light. The manuscript described it: the luminance of the threshold, the cold radiance that bleeds through when the barrier between worlds grows thin enough to transmit photons that do not belong to this spectrum. It is beautiful. It is the most terrifying thing you have ever seen.</p>`
    }
  ],
  closingText: `<p>The house shudders again. From above, faintly, you hear the first notes of the viol. Zann has begun to play.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Go to Zann immediately. He needs you.',
      audio: [
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.1, loop: true },
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.2, loop: true },
        { src: 'Film_Noir-sting_orchestral.ogg', volume: 0.1, loop: false },
        { src: '02_Pärt_Fratres_Violin.mp3', volume: 0.4, loop: true },
      ],
      paragraph: 205,
      effects: { dread: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { zann_trust: 1 },
        failPenalty: { sanity: -2 },
        successText: `<div class="skill-result success"><strong>Test Your Luck — Success!</strong> You navigate the dark stairwell by instinct and memory. A section of banister gives way as you pass, crashing into the void below, but your hand finds the wall and holds. You reach the garret landing without injury.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck — Failed.</strong> The stairs betray you. A step collapses under your weight and you fall, cracking your shin against the broken timber. The pain is sharp and immediate. You haul yourself up and continue, limping, your trouser leg wet with blood. But the fall has shaken something loose inside you. The darkness in the stairwell felt alive, and for a moment you felt it looking back. <em>Sanity reduced by 2.</em></div>`
      },
      outcome: `<p>You open your door into the corridor. The darkness is absolute, thick, pressing against your face like cloth. You put your hand to the wall and move by touch, counting doors, counting steps, finding the staircase by memory.</p>
<p>The stairs vibrate under your feet. Each step transmits the house's distress upward through your bones. Above, the blue-white light grows stronger. The viol's voice rises with it, frantic, the notes tumbling over each other in a cascade of sound that is half music, half mathematics.</p>
<p>You reach the fifth floor. The sixth floor landing. The garret door stands before you, outlined in cold light.</p>`,
      next: 's3_3'
    },
    {
      label: 'B',
      text: 'Check on the other tenants first. They may need help.',
      audio: [
        { src: '02_Pärt_Fratres_Violin.mp3', volume: 0.4, loop: true },
      ],
      paragraph: 206,
      effects: { knowledge: 1 },
      outcome: `<p>You move through the dark corridor, knocking on doors. The clerk's room is empty. The door swings open at your touch, revealing a stripped bed and an open wardrobe. He is gone. The room smells of ink and of departure.</p>
<p>The woman on the second floor does not answer. Her door is locked. You press your ear to the wood and hear nothing. Not silence: nothing. The absence of sound so complete it is like pressing your ear to a wall of cotton.</p>
<p>On the ground floor, the concierge's door is ajar. The room beyond is dark. You push the door open and the thin light from the street catches the high-backed chair, empty, the shawl draped over one arm. On the table beside it, a candle has burned to a puddle of wax. The photograph on the wall, the one of the Rue d\u2019Auseil as it once was, has been removed. Only the nail remains, and a rectangle of slightly lighter wallpaper.</p>
<p>The house is empty. Everyone has gone. You are alone with Zann.</p>
<p>You climb the stairs in the dark, and the viol's music draws you upward like a thread being wound onto a spool.</p>
<p class="thought">They knew. All of them. They knew this night was coming, and they left without warning me. Or perhaps this is the warning: the empty rooms, the abandoned chairs, the silence where lives used to be. Perhaps this is the only warning the Rue d\u2019Auseil knows how to give.</p>`,
      next: 's3_3'
    },
    {
      label: 'C',
      text: 'Try to leave. Get out of the building, out of the street.',
      audio: [
        { src: 'Bleakwater_Docks-dock_creaks_loop.ogg', volume: 0.4, loop: true },
      ],
      paragraph: 207,
      effects: { dread: 1 },
      outcome: `<p>You grab your coat and make for the stairs. Down, not up. Away from the blue light, away from the music, toward the front door and the street and whatever remains of the ordinary world.</p>
<p>The front door is open. The wind meets you on the threshold with a force that drives you back a step. You grip the doorframe and lean into it.</p>
<p>The Rue d\u2019Auseil stretches before you, dark and empty. The gas lamps are dead. The buildings lean inward from both sides, their upper storeys almost touching, forming a tunnel of black stone that curves upward toward the city wall. The cobblestones are slick with moisture that does not feel like water.</p>
<p>You take three steps. Four. Five.</p>
<p>On the sixth step, the street moves. The cobblestones shift beneath your feet, tilting, and the gradient that was merely steep becomes impossible. You are climbing a wall. The buildings on either side tilt with you, maintaining their orientation relative to the street rather than to gravity, and you realise with a cold clarity that the street is no longer part of your world. It has always been something else, something wearing the shape of a street, and now it has stopped pretending.</p>
<p>You retreat. The boarding house takes you back. The door closes behind you with a sound like a swallowed word.</p>
<p>The only way is up.</p>
<p class="thought">There is no leaving. The street will not release me. The only path open is the one I most want to avoid: up the stairs, into the light, toward the music and the old man and whatever waits beyond the window.</p>`,
      next: 's3_3'
    }
  ]
},


// ========================================================================
// SCENE 3.3 — THE GARRET DOOR
// You stand before Zann's door. The music from within is unlike
// anything you have heard before — desperate, searching, breaking
// at the edges.
// SANITY TEST (immediate): entering the garret during the crisis.
// ========================================================================
's3_3': {
  paragraph: 208,
  title: 'The Garret Door',
  ambience: 'garret',
  audio: [
    { src: '07_Pärt_Fratres_String_Quartet.mp3', volume: 0.4, loop: true },
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.4, loop: true },
    { src: '02_Pärt_Fratres_Violin.mp3', volume: 0.4, loop: true },
    { src: '09_Pärt_Fratres_Cello.mp3', volume: 0.4, loop: true },
    { src: 'Film_Noir-sting_orchestral.ogg', volume: 0.1, loop: true },
  ],
  text: `<p>The garret door pulses with light. Cold, blue-white, leaking through the cracks in the frame and the gap beneath the threshold. The light moves. It brightens and dims with the rhythm of the music, breathing in time with the viol, and each pulse carries with it a pressure that you feel not in your ears but in the hollow spaces of your chest.</p>
<p>The music. You have heard Zann play a hundred times. You have heard the gentle passages and the frantic ones, the lullabies and the battle hymns, the frequencies that hold back the dark and the harmonics that speak to something beyond the reach of sound. You have never heard him play like this.</p>
<p>The viol is screaming. There is no other word. The notes pour from behind the door in a torrent of sound that is beyond performance, beyond technique, beyond anything a human being should be able to demand of wood and gut and horsehair. Each phrase climbs higher than the last, reaching for a frequency that exists at the very edge of the instrument's range, and each phrase falls back, and each time it falls a little shorter than before.</p>
<p>Zann is losing.</p>`,
  conditionals: [
    {
      check: 'played_viol >= 1',
      text: `<p>Your hands ache. The strings left their marks on your fingers days ago, and the scars have not faded. They pulse now in sympathy with the viol's voice, responding to frequencies your conscious mind cannot identify but your body remembers.</p>`
    }
  ],
  closingText: `<p>The door stands before you. Behind it, an old man is fighting for the world with a wooden instrument and thirty years of exhausted courage. The light pulses. The music screams. The house trembles around you like a living thing in pain.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Open the door. Enter the garret.',
      paragraph: 209,
      effects: { dread: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        successBonus: { zann_trust: 1 },
        failPenalty: { sanity: -3 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity — Success!</strong> You open the door and the void's attention falls on you like a searchlight. Your mind bends under the weight of it. But it holds. You are frightened beyond any measure of fear, but you are present, you are yourself, and you step into the garret with your eyes open.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity — Failed.</strong> The door opens and the world fractures. For a terrible moment you see the garret from two perspectives at once: from the doorway, and from somewhere above, looking down through a medium that is not air. Your sense of self wavers. The boundaries between you and the room, between inside and outside, dissolve into a grey uncertainty that tastes of iron and smells of nothing. <em>Sanity reduced by 3.</em></div>`
      },
      outcome: `<p>You push the door open.</p>
<p>The garret is transformed. The cold light fills every corner, casting shadows that move against the source, reaching toward you rather than away. The candles have been extinguished; their wax has melted and reformed into shapes that should not occur naturally: spirals, branching fractals, forms that echo the patterns in Zann's manuscript notation.</p>
<p>Zann sits in his chair at the centre of the room. His back is to the window. His eyes are closed. His face is a mask of concentration so intense it has moved beyond expression into a kind of blankness. His hands move on the viol with mechanical precision, each stroke exact, each note placed with the desperate accuracy of a man defusing an explosive device.</p>
<p>The window. The curtain has been torn away. The glass is intact but it is no longer transparent. It is a rectangle of darkness that is deeper than darkness, a black so complete it seems to pull light into itself. And in that blackness, something moves. You cannot see it. You can feel it. A pressure, an attention, a vast awareness pressing against the glass from the other side.</p>
<p>Zann opens his eyes. He sees you. For one beat of the music, his expression changes. Relief. Terror. Gratitude. Then the mask returns, and he plays on.</p>`,
      next: 's3_4'
    },
    {
      label: 'B',
      text: 'Listen from the landing. Try to understand the music before entering.',
      paragraph: 210,
      effects: { knowledge: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity — Success!</strong> You listen, and for the first time you hear the structure beneath the frenzy. The music is not random. It is a conversation. Zann plays a phrase, and from beyond the door something answers: not with sound but with pressure, with silence, with the spaces between the notes. He is not performing. He is negotiating.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity — Failed.</strong> You listen, but the music overwhelms your ability to parse it. It is noise, terror, chaos. You cannot find the pattern. Whatever Zann is doing in there, its logic escapes you entirely.</div>`
      },
      outcome: `<p>You press your back against the wall beside the door and listen. The landing trembles. The light from beneath the door washes over your shoes in waves.</p>
<p>The music pours through the wood like water through cloth. Up close, the individual notes resolve from the wall of sound. You can hear the viol's four strings, each carrying a separate voice, each voice pursuing its own line through the composition. Zann is playing four melodies simultaneously, braided together into a single fabric of sound that is both beautiful and structurally impossible.</p>
<p>You listen for five minutes. Ten. The music does not repeat. It evolves, phrase by phrase, responding to pressures you can feel but not hear. Zann is improvising with the precision of a mathematician, each note calculated, each interval chosen for its effect on something you cannot see.</p>
<p>Then the music stutters. A note goes flat. Another cracks. Zann is tiring.</p>
<p>You have heard enough. You push the door open and step inside.</p>
<p>The garret is full of cold light. Zann sits before the window, which has become a rectangle of absolute darkness. He sees you enter. His expression does not change. His hands do not falter. But something in his posture shifts, the fractional unbending of a man who has been carrying a weight alone and now, perhaps, does not have to.</p>`,
      next: 's3_4'
    },
    {
      label: 'C',
      text: 'Search the house for anything that might help.',
      paragraph: 211,
      effects: { dread: 1 },
      outcome: `<p>You turn from the door and descend. The house is empty; you confirmed this already, or you discover it now. But empty rooms sometimes contain what their occupants left behind, and desperate situations call for desperate searches.</p>
<p>The clerk's room yields nothing useful. The concierge's room is bare. But in the corridor of the fourth floor, between two apartments, you find a cupboard you have never noticed before. The door is swollen with damp and requires force to open.</p>
<p>Inside: candles, matches, a coil of rope, and, wedged behind a shelf, a wooden crucifix so old the figure has worn smooth. You take everything. The crucifix is warm to the touch, which should not be possible in a house this cold. You put it in your pocket and feel its warmth against your thigh, a small ember of something human in a building that is rapidly becoming less so.</p>
<p>You climb the stairs. There is nowhere else to go. The music from the garret has changed: higher, more desperate, the phrases shortening as Zann's endurance fails. You open the door.</p>
<p>The garret is bathed in cold light. The window is a rectangle of living darkness. Zann plays, and the darkness presses in, and the light pulses, and the world holds its breath.</p>`,
      next: 's3_4'
    }
  ]
},


// ========================================================================
// SCENE 3.4 — THE WINDOW OPENS
// The glass shatters. The barrier fails. The void is here.
// SANITY TEST (immediate): highest stakes — confronting the void directly.
// ========================================================================
's3_4': {
  paragraph: 212,
  title: 'The Window Opens',
  ambience: 'void',
  text: `<p>It happens between one note and the next.</p>
<p>Zann reaches for a high harmonic, the frequency that has held the barrier in place for thirty years. His bow arm stretches. His fingers find the position on the neck of the viol. The note begins to form.</p>
<p>And his hand slips.</p>
<p>It is a small thing. A tremor in the wrist, a fraction of a second where the bow pressure wavers. The note that emerges is almost correct. Almost is not enough.</p>
<p>The window explodes inward. Not the glass; the glass remains, cracking but intact. What explodes is the darkness behind it. The void pours through the frame like water through a breached dam, filling the upper half of the garret with a blackness so profound it has weight and texture and temperature. The cold hits you like a fist. Your breath crystallises in your lungs. The candle wax on the floor cracks audibly, contracting.</p>
<p>Through the ruined window, you see what lies beyond.</p>
<p>There is no city. No rooftops, no sky, no stars. There is no space in which such things could exist. What you see is an absence so complete it defies the word: an emptiness that is not empty but full, saturated with a presence that your mind cannot process. Colours that do not exist slide across its surface. Geometries that cannot be constructed fold and unfold in dimensions your eyes were never designed to perceive.</p>
<p>And it sees you. The void is aware. It has always been aware. It turns its attention toward the broken window with the slow, inevitable focus of a tide, and you feel its regard settle on your skin like frost.</p>`,
  conditionals: [
    {
      check: 'knows_void >= 1',
      text: `<p>You have seen this before. Through the window, in the controlled conditions of Zann's performance, you glimpsed what lies beyond. But that was a keyhole view. This is the door thrown wide. The scale of it buckles something inside your chest. Knowing what the void looked like did not prepare you for knowing what it <em>is</em>.</p>`
    }
  ],
  closingText: `<p>Zann plays. The viol's voice is the only sound in the garret that belongs to your world. Everything else, the wind, the cold, the sub-audible pressure of the void's attention, comes from somewhere else entirely. He plays with his eyes shut and his teeth clenched and his whole body bent into the instrument, and the music is a wall, and the wall is cracking.</p>
<p>You must act. Now. Before the wall falls entirely.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Stand with Zann. Hold your ground and lend him your strength.',
      paragraph: 213,
      effects: { dread: 2 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -5, dread: 1 },
        successBonus: { zann_trust: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity — Success!</strong> The void's attention falls on you fully. You feel it examining you: probing, measuring, tasting the edges of your consciousness. Your mind holds. The terror is absolute, but your sense of self remains intact. You are here. You are human. You will not break.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity — Failed.</strong> The void enters you. For one terrible instant your perspective inverts: you see the garret from the outside, a tiny box of light in an infinite darkness, and the two figures within it are specks, motes, bacteria on a slide. You feel your significance dissolve. Your name, your history, your identity — all of it revealed as fiction, a story a pattern of neurons tells itself to avoid confronting the truth of its own irrelevance. <em>Sanity reduced by 5.</em></div>`
      },
      outcome: `<p>You step forward. The cold deepens with each step. By the time you reach Zann's side the air is glacial, each breath a knife in your chest. You put your hand on his shoulder and feel him flinch, then steady.</p>
<p>The viol screams. Zann plays with everything he has left, and you stand beside him, and your presence is a small, human, insufficient, necessary thing. Not enough to close the window. Enough, perhaps, to keep the player playing.</p>
<p>The void presses. The music pushes back. And between them, in the narrow space where two forces meet, the garret shudders and holds.</p>`,
      next: 's3_5'
    },
    {
      label: 'B',
      text: 'Go to the window. Try to close it, force it shut.',
      paragraph: 214,
      effects: { dread: 2, window_sealed: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -5, dread: 1 },
        successBonus: { knows_void: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity — Success!</strong> You approach the window and look directly into the void. Your mind bends but does not break. You see it clearly: the emptiness, the presence, the impossible geometries folding through dimensions your language has no words for. You understand it. You cannot explain it. But you understand.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity — Failed.</strong> You approach the window and the void reaches for you. The cold wraps around your hands, your wrists, your arms. For a moment you cannot tell where your body ends and the darkness begins. Your vision fills with colours that have no names and shapes that have no edges, and when you pull back the world has lost some of its solidity, as if reality itself has become slightly translucent. <em>Sanity reduced by 5.</em></div>`
      },
      outcome: `<p>You cross the garret in four steps. The void fills the window frame, pressing inward, and the cold radiating from it strips the feeling from your hands before you reach the sill. You grip the frame anyway. The wood is coated in frost so thick it crunches under your fingers.</p>
<p>You push. The window resists. The void resists. It is like pushing against a river: the force is constant, immense, patient. Your arms tremble. Your feet slide on the frozen floorboards.</p>
<p>Behind you, Zann plays. The music wraps around your effort like a second pair of hands, reinforcing, supporting. The viol finds a frequency that resonates with the wood of the window frame, and for a moment the frame vibrates in sympathy, and the window moves. An inch. Two.</p>
<p>Then the void pushes back, and the window stops, and you are locked in a stalemate between a human body and an infinite darkness.</p>`,
      next: 's3_5'
    },
    {
      label: 'C',
      text: 'Look into the void. Try to understand what you are facing.',
      paragraph: 215,
      effects: { knowledge: 2, knows_void: 1, dread: 2 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -5, dread: 2 },
        successBonus: { perception: 1, knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity — Success!</strong> You look into the void and the void looks back and your mind holds and you <em>see</em>. What you see changes everything. The void is not empty. It is not hostile. It is a medium, a space between spaces, and the things that move through it are not predators but currents: forces as natural and as indifferent as gravity, as wind, as the slow drift of continents. The horror is not in what the void contains. The horror is in its scale.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity — Failed.</strong> You look into the void and the void pours into you. Your mind opens like a flower in a hurricane: every petal torn away, every layer of protection stripped, until only the bare stem remains, shaking in the wind. You see too much, understand too much, and the understanding is a weight your consciousness was never built to carry. <em>Sanity reduced by 5.</em></div>`
      },
      outcome: `<p>You stand before the window and you look.</p>
<p>The void fills your vision. It is everything. It is everywhere. It extends in directions that have nothing to do with up or down or sideways, directions your body has no sense for but your mind, pushed beyond its limits, begins to perceive.</p>
<p>You see movement. Vast, slow, purposeless movement: currents in the dark, rivers of something that is neither matter nor energy but a third thing, a substance with no analogue in the physics you learned in lecture halls that seem, from this vantage, impossibly distant and impossibly small.</p>
<p>The void sees you seeing it. The attention intensifies. You feel yourself being read, catalogued, filed. The void is curious. It did not expect a second pair of eyes.</p>
<p>You step back. You are breathing hard. Your hands are shaking. But your mind is intact, and in it, alongside the fear, there is something new. A geometry. A map. The barest outline of a structure that underlies the void's apparent chaos. The music, you realise, is not arbitrary. Zann's notation is a translation of this geometry into sound. The viol speaks the void's language, and what it says is: <em>stay back. This door is closed.</em></p>`,
      next: 's3_5'
    }
  ]
},


// ========================================================================
// SCENE 3.5 — THE MUSIC BREAKS
// Zann's strength fails. The viol's voice cracks. The barrier is
// falling. You must choose how to face the end.
// This is the final branching point. Each choice leads to a routing
// scene that evaluates state variables and directs to an ending.
// ENDING C OVERRIDE: If sanity <= 10 and dread >= 5, any path
// routes to ending_void regardless of choice.
// ========================================================================
's3_5': {
  paragraph: 216,
  title: 'The Music Breaks',
  ambience: 'void',
  audio: null,
  text: `<p>Zann stops playing.</p>
<p>It is not a dramatic cessation. There is no final chord, no climactic crash. The viol simply falls silent, the way a voice falls silent when the speaker has said everything there is to say. The bow slides off the strings with a thin, dry whisper. Zann's arms drop to his sides. His chin rests on his chest.</p>
<p>For one heartbeat, the garret is silent. True silence: no music, no wind, no void-hum, nothing. The world pauses between breaths.</p>
<p>Then the void moves.</p>
<p>It pours through the window like smoke, like water, like the darkness at the bottom of the ocean rising to claim the surface. The cold intensifies beyond cold into a sensation that has no name, a burning absence of heat that strips the air of moisture and the room of light and your lungs of the capacity to draw breath.</p>
<p>Zann does not move. His eyes are open, staring at the far wall, at nothing. The viol rests across his knees, its neck in his left hand, the bow in his right. His fingers are still positioned on the strings. He looks like a man who has been playing for thirty years and has, at last, reached the end of the score.</p>`,
  conditionals: [
    {
      check: 'has_manuscript >= 1',
      text: `<p>The manuscript pages on the floor stir in the void-wind. The notation ripples, the ink catching the cold light, and for a moment the diagrams seem to move: the frequencies shifting, the intervals recalculating, alive in a way that paper and ink should not be.</p>`
    },
    {
      check: 'played_viol >= 1',
      text: `<p>The second viol is where Zann left it, propped against the wardrobe. Its strings gleam in the void-light. Your fingers throb. Your hands remember the positions, the pressure, the angle of the bow. The instrument calls to you in a language below language, a muscle-memory argument that bypasses thought entirely.</p>`
    },
    {
      check: 'window_sealed >= 1',
      text: `<p>The inscriptions Zann carved into the window frame glow faintly. The symbols pulse with a rhythm that matches nothing in the room. They are holding, barely, a thin line of resistance against the darkness pouring through the glass. The seal is not broken. It is bending.</p>`
    }
  ],
  closingText: `<p>The darkness advances. You have seconds.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Take up the viol. If Zann cannot play, you must.',
      audio: [
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.4, loop: true },
        { src: '02_Pärt_Fratres_Violin.mp3', volume: 0.4, loop: true },
      ],
      paragraph: 217,
      condition: 'played_viol >= 1',
      effects: { dread: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: false,
        failPenalty: { sanity: -2 },
        successBonus: { played_viol: 1, knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception — Success!</strong> You take up the second viol and your hands find the strings and the first note rings out clear and true. The frequency is correct. The void hesitates. For the first time tonight, the darkness pauses.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception — Failed.</strong> You take up the viol but the first note is wrong. Flat, wavering, a frequency that does not speak the void's language but merely shouts into it. The darkness does not pause. It accelerates. <em>Sanity reduced by 2.</em></div>`
      },
      outcome: `<p>You cross the room in two strides. The second viol is in your hands before the thought completes itself, and the bow is on the strings, and you are playing.</p>
<p>The sound you make is rough. You are not Zann. You have not spent thirty years learning the frequencies that hold back the dark. But you have played this instrument before. Your hands remember what your mind cannot articulate. The notes come: imperfect, urgent, human.</p>
<p>Zann stirs. His eyes focus. He sees you playing and something moves across his face: surprise, recognition, a flicker of something that might be hope if hope were not too large a word for this moment. His hands tighten on his own viol. The bow rises.</p>`,
      next: 's3_5a_route'
    },
    {
      label: 'B',
      text: 'Go to the window. Hold it shut with your hands, your body, everything you have.',
      paragraph: 218,
      effects: { dread: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        failPenalty: { sanity: -3 },
        successBonus: { window_sealed: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Luck — Success!</strong> Your hands find the window frame and the wood responds to your touch. The inscriptions Zann carved into the frame flare bright, recognising a human presence, a living anchor. The window resists the void. It holds.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck — Failed.</strong> The window frame is coated in frost so thick your fingers cannot find purchase. You grip and slip, grip and slip. The void presses harder. The cold burns your palms. The frame cracks under the pressure and a shard of wood drives into your hand. <em>Sanity reduced by 3.</em></div>`
      },
      outcome: `<p>You throw yourself at the window. Your hands hit the frame and the cold bites through your skin to the bone. You brace your feet on the floor and push with everything you have. Arms, shoulders, back, the full desperate weight of a body that knows it is the only thing between the world and what wants to enter it.</p>
<p>The void pushes back. It is like leaning into a glacier: the force is slow, immense, and utterly without urgency. It has all the time that exists. You have only the strength left in your arms and the fear in your heart and the stubborn, animal refusal to let go.</p>
<p>Behind you, Zann watches. His hands move on the viol. A note, thin and reedy. Another. He is trying to play. He is trying to help you from across the room, lending what remains of his music to your physical effort.</p>`,
      next: 's3_5b_route'
    },
    {
      label: 'C',
      text: 'Grab the manuscript pages and run. Preserve the knowledge, even if you cannot save the man.',
      paragraph: 219,
      effects: { has_manuscript: 1 },
      outcome: `<p>You do not think. Your body decides before your mind can object. You drop to your knees and gather the manuscript pages from the floor, scooping them into your arms, crumpling thirty years of notation and theory and desperate accumulated wisdom into a bundle pressed against your chest.</p>
<p>Zann watches you. His expression does not change. He does not reach for you, does not write a note, does not attempt to stop you. He understands. He has always understood that this was one of the possible outcomes: the student who runs, the knowledge that escapes, the player who remains behind.</p>
<p>He lifts the bow. He places it on the strings. And as you turn for the door, he begins to play one last time. The music that follows you down the stairs is the most beautiful thing you have ever heard. It is a farewell. It is a gift. It is the last sound Erich Zann will ever make, and he makes it for you.</p>`,
      next: 's3_5c_route'
    }
  ]
},


// ========================================================================
// ROUTING SCENE 3.5A — VIOL PATH
// The player chose to take up the viol. Routes based on state.
// Ending C override checked first.
// ========================================================================
's3_5a_route': {
  paragraph: 220,
  title: 'The Music of the Void',
  ambience: 'void',
  audio: [
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.4, loop: true },
        { src: '02_Pärt_Fratres_Violin.mp3', volume: 0.4, loop: true },
        { src: '07_Pärt_Fratres_String_Quartet.mp3', volume: 0.4, loop: true },
        { src: '09_Pärt_Fratres_Cello.mp3', volume: 0.4, loop: true },
      ],
  text: `<p>The two viols speak together. Zann's voice, thin and fading, carries the melody. Yours, rough and urgent, holds the bass line. The music that results is imperfect. It is also, somehow, more than either instrument could produce alone.</p>
<p>The void pauses. The darkness at the window holds its position, neither advancing nor retreating, held in place by a wall of sound that is fragile and human and, for this one moment, sufficient.</p>
<p>The music builds. Zann's eyes are closed. His face is peaceful for the first time since you have known him. His hands move on the strings with the certainty of a man who has nothing left to lose and everything left to give.</p>
<p>You play. You play with everything you are and everything you have learned in this house on this street in this city that exists at the edge of everything. The viol sings beneath your hands. The void listens.</p>
<p>And then Zann plays a phrase you have never heard before. Three notes, ascending, each one higher than the instrument should be able to produce. The final note hangs in the air like a struck bell, resonating, expanding, filling the garret with a vibration that is not sound but something older and deeper and more fundamental.</p>`,
  conditionals: [
    {
      check: 'knowledge >= 5',
      text: `<p>You recognise the phrase. It is in the manuscript, on the last page, written in a hand that trembles with age and revelation. Zann called it <em>la note finale</em>. The closing frequency. The sound that does not hold the door shut but asks it, gently and with great respect, to close itself.</p>`
    }
  ],
  conditionalNext: [
    { check: 'sanity <= 10 && dread >= 5', next: 'ending_void' },
    { check: 'knowledge >= 5 && perception >= 9 && played_viol >= 1 && sanity >= 14 && knows_void >= 1', next: 'ending_transcendence' },
    { check: 'played_viol >= 2 && zann_trust >= 3 && knowledge >= 3 && sanity >= 12', next: 'ending_new_player' }
  ],
  next: 'ending_canonical'
},


// ========================================================================
// ROUTING SCENE 3.5B — WINDOW PATH
// The player chose to hold the window. Routes based on state.
// Ending C override checked first.
// ========================================================================
's3_5b_route': {
  paragraph: 222,
  title: 'The Window',
  ambience: 'void',
  text: `<p>You hold the window. Your arms burn. Your fingers are numb. The frost on the frame has fused with your skin, and you can no longer tell where the wood ends and your hands begin. The cold has passed through pain into a white blankness that is almost comfortable.</p>
<p>Behind you, Zann plays. The music is thin now, reedy, the voice of an instrument pushed beyond its limits by a man pushed beyond his. Each note costs him something. You can hear it: the incremental diminishment, the slow subtraction of a life measured in frequencies and intervals.</p>
<p>The void pushes. You push back. The window frame groans. The inscriptions carved into the wood pulse with their own light, responding to your grip, to the warmth of your hands, to the simple fact of a living body pressed against the boundary between one world and the absence of all worlds.</p>
<p>Zann plays a descending phrase. Three notes, each lower than the last. The final note resonates through the frame and into your bones, and you feel the window shift. The movement is neither opening nor closing; it is something else entirely. A transformation.</p>`,
  conditionals: [
    {
      check: 'has_manuscript >= 1',
      text: `<p>The manuscript pages in your pocket press against your chest. The knowledge they contain is not abstract to you now. You can feel it working: the frequencies, the intervals, the mathematical relationships between sound and structure. The window is a function. The music is its variable. And you, your body, your grip on the frame, are the constant that holds the equation in balance.</p>`
    }
  ],
  conditionalNext: [
    { check: 'sanity <= 10 && dread >= 5', next: 'ending_void' },
    { check: 'knowledge >= 4 && has_manuscript >= 1 && window_sealed >= 1', next: 'ending_sealed' }
  ],
  next: 'ending_canonical'
},


// ========================================================================
// ROUTING SCENE 3.5C — FLEE PATH
// The player chose to grab the manuscript and run.
// Even here, Ending C override is checked.
// ========================================================================
's3_5c_route': {
  paragraph: 224,
  title: 'The Stairs',
  ambience: 'storm',
  text: `<p>You run. The manuscript pages crumple against your chest as you take the stairs two at a time, three at a time, descending through a house that is shaking itself apart. Plaster falls in sheets. The walls crack. A door on the fourth floor flies open as you pass and you glimpse, for one frozen instant, a room that is no longer a room but a cavity in the body of the building, its walls dissolving into the same darkness that pours through Zann's window.</p>
<p>The music follows you. Zann's viol, five storeys above, playing with a clarity and a beauty that transcend the circumstances of its production. He is dying. You know this with a certainty that requires no evidence. He is dying and he is playing and the music is a corridor of sound down which you flee, protected by its walls, guided by its direction, carried by its terrible, generous, exhaustible grace.</p>
<p>You reach the ground floor. The front door stands open. Beyond it, the Rue d\u2019Auseil stretches downhill into the dark. The cobblestones gleam. The gas lamps are dead. The buildings lean inward from both sides, their silhouettes black against a sky that contains no stars.</p>`,
  conditionalNext: [
    { check: 'sanity <= 10 && dread >= 5', next: 'ending_void' }
  ],
  next: 'ending_canonical'
},


// ========================================================================
// ENDING A — THE PAGES ON THE WIND (Canonical)
// Default ending. Faithful to Lovecraft's original story.
// Zann dies. The player flees. The manuscript is lost.
// The Rue d\u2019Auseil vanishes forever.
// ========================================================================
'ending_canonical': {
  type: 'game_ending',
  paragraph: 250,
  title: 'The Pages on the Wind',
  endingTitle: 'The Pages on the Wind',
  endingSubtitle: 'There are things in this world that cannot be mapped, streets that exist only when they choose to, and music that was never meant for human ears.',
  ambience: 'rue_vanishing',
  text: `<p>You run.</p>
<p>The Rue d\u2019Auseil unspools beneath your feet, its cobblestones slick and treacherous, its gradient steepening with every stride. You clutch the manuscript pages to your chest and run. Behind you, the music continues, thinner now, more distant, the voice of a single viol played by a dead man's hands.</p>
<p>The wind takes the first page at the corner. It tears itself from your grip with a violence that has nothing to do with aerodynamics and everything to do with the street's refusal to let its secrets leave. You grab for it and miss. The page spirals upward into the dark, the notation visible for one instant, a constellation of ink and mathematics, and then it is gone.</p>
<p>You run faster. The wind takes another page. And another. The knowledge peels away from you in sheets, each page a year of Zann's life, a fragment of the barrier's architecture, a sentence in the conversation between a man and the void. They scatter behind you like leaves from a dying tree.</p>
<p>By the time you reach the bottom of the street your arms are empty. Every page is gone. The wind has taken everything.</p>
<p>You stumble into a square you do not recognise. The buildings here are ordinary. The street lamps burn with steady yellow light. A cat watches you from a windowsill with the patient disinterest of an animal that has never heard music that was not meant for its ears.</p>
<p>You turn back. The Rue d\u2019Auseil should be behind you, climbing upward between its leaning buildings toward the ancient city wall. You can see the wall from here, dark against the lighter dark of the sky.</p>
<p>There is no street. The wall rises directly from the pavement, unbroken, continuous. No gap, no opening, no narrow passage between ancient stones. The Rue d\u2019Auseil is gone. It has closed behind you like a wound healing, like a mouth that has said what it needed to say and has no further use for speech.</p>
<p>You stand in the square for a long time. The cat yawns and stretches and jumps down from the windowsill and disappears into an alley. The city goes on around you, indifferent, ordinary, sane.</p>
<p>In the years that follow, you search. You walk every street in the old quarter, follow every slope, examine every wall. You consult maps and city records and the memories of people who have lived in the neighbourhood for decades. No one has heard of the Rue d\u2019Auseil. No map records it. No directory lists it. It does not exist. It has never existed.</p>
<p>But on certain nights, when the wind comes from a direction the compass does not recognise, you hear it. Faint, impossibly distant, carried on frequencies that the laws of physics say should not survive the journey: the music of a viol, played by no one, for no one, holding closed a window that opens onto everything.</p>
<p class="thought">I lost the pages. I lost the street. I lost the old man who played for the world without the world's knowledge or gratitude. All I kept was the memory of the music. It is enough. It is too much. It is all I will ever have, and it will haunt me until I die, and perhaps beyond, in whatever silence waits on the other side of the last note.</p>`
},


// ========================================================================
// ENDING B — THE NEW PLAYER
// The player takes Zann's place as guardian.
// Requires: played_viol >= 2, zann_trust >= 3, knowledge >= 3, sanity >= 12
// Zann dies. The player becomes the new barrier.
// ========================================================================
'ending_new_player': {
  type: 'game_ending',
  paragraph: 252,
  title: 'The New Player',
  endingTitle: 'The New Player',
  endingSubtitle: 'You understand now. There has always been a player in this room, and there always will be.',
  ambience: 'garret_music',
  text: `<p>Zann dies between the third bar and the fourth.</p>
<p>You do not see it happen. You hear it: a note that begins with the viol's voice and ends with the voice of the wood alone, the string vibrating without a hand to guide it, sustaining itself for one impossible moment before the silence takes it.</p>
<p>The bow drops from his hand. The viol tilts in his lap. His head falls forward, chin to chest, the thick spectacles sliding down his nose. He looks, in that moment, like a man who has fallen asleep at his work. Which, in a sense, is exactly what he has done. Thirty years of work, and the sleep that follows is the deepest kind.</p>
<p>The void surges.</p>
<p>You play.</p>
<p>You do not think about it. Your hands are already on the strings, your bow already moving, and the music that pours from the second viol is not your music and not Zann's music but something between the two. Something new. A voice that has Zann's knowledge and your strength, his precision and your urgency, his thirty years and your desperate, terrified, unbroken will.</p>
<p>The void hesitates. It has heard this music before: these frequencies, these intervals, this mathematical architecture of sound that speaks its language and says, with absolute clarity, <em>no further.</em> But the voice is different. Younger. Rougher. Less certain but more alive.</p>
<p>The darkness recedes. Inch by inch, note by note, the void withdraws through the window. The cold lessens. The garret brightens. The candle wax on the floor begins, very slowly, to melt.</p>
<p>You play until dawn. You do not stop. You cannot stop. The music is the barrier and the barrier is the music and if the music stops the window opens and if the window opens everything ends. Zann knew this. He knew it for thirty years and he played every night and he never stopped and now the knowledge is yours and the viol is yours and the garret is yours and the window is yours and the void is yours.</p>
<p>The sun rises. You feel its light through the window, warm and yellow and belonging entirely to your world. The void retreats before it, not defeated but patient, withdrawing to the distance from which it watches and waits and remembers.</p>
<p>You lower the bow. Your arms ache with a pain that goes deeper than muscle. Your fingers are bleeding where the strings have cut through the calluses. You are shaking. You are weeping.</p>
<p>Zann sits in his chair, still and peaceful. You close his eyes. You fold his hands over the old viol, the one he played for thirty years, and you set the bow across his knees. He looks like a musician resting between movements. You do not move him. You will not move him. He has earned his place in this chair, in this room, at this window.</p>
<p>You sit in the other chair. The second viol rests against your leg. Through the window, the city wakes: ordinary, unknowing, safe for one more day.</p>
<p>Tonight you will play again. And tomorrow night. And the night after that. You understand now what Zann understood, what cost him his voice and his health and his connection to the world of living men. The music never stops. The player changes, but the music never stops. There has always been someone in this garret, playing into the dark, and there always will be.</p>
<p class="thought">I am the new player. I will sit in this chair and I will play this viol and I will hold this window shut against the void for as long as my hands hold out and my mind holds together and my heart continues to beat. This is my life now. This is my purpose. I did not choose it. It chose me, or I was chosen, or the choosing was done so long ago that the distinction between volunteer and conscript has ceased to mean anything. I play. The void listens. The world sleeps. And in the morning the sun rises, and the music rests, and I wait for the evening and the fear and the first note of the night.</p>`
},


// ========================================================================
// ENDING C — THE VOID ENTERS
// The music stops. Nothing holds back the void. The street is consumed.
// Triggered by: sanity <= 10 && dread >= 5 (overrides any Scene 3.5 choice)
// Zann dies. The Rue d\u2019Auseil ceases to exist.
// ========================================================================
'ending_void': {
  type: 'game_ending',
  paragraph: 254,
  title: 'The Void Enters',
  endingTitle: 'The Void Enters',
  endingSubtitle: 'The street did not disappear from memory. It disappeared from the world.',
  ambience: 'void',
  text: `<p>The music stops. This time, it does not restart.</p>
<p>Zann's hands fall from the viol. The instrument slides from his lap and strikes the floor with a sound like a broken promise. The bow rolls under the chair. The strings vibrate once, a fading chord that contains within it every note Zann ever played, and then they are still.</p>
<p>The silence lasts one second. In that second you hear everything: your own breathing, the creak of the floorboards, the tick of frost forming on the window glass, the beat of your heart, the last echo of the last note of the last music that will ever be played in this room.</p>
<p>Then the void enters.</p>
<p>It does not pour. It does not flow. It <em>replaces</em>. The far wall of the garret is there, and then it is not there. The space it occupied is not empty. It is absent. The wall, the plaster, the timber, the nails, the decades of accumulated dust and candlesmoke: all of it simply stops being, replaced by a darkness that is not the absence of light but the absence of the possibility of light.</p>
<p>Zann vanishes. One moment he is in his chair, an old man in a cold room, and the next the chair is gone and the man is gone and the space they occupied is part of the void, has always been part of the void, will always be part of the void. There is no body. There is no death. There is only a subtraction so complete it erases not just the present but the past: Erich Zann was never here, was never anywhere, never played a note, never held a window shut against the dark.</p>
<p>You run.</p>
<p>The stairs dissolve beneath your feet. You take them three at a time, four at a time, and behind you each step vanishes as your weight leaves it. The bannister goes. The walls go. The doors go. The house is being unmade from the top down, storey by storey, room by room, a building turned back into the idea of a building and then the idea consumed along with everything else.</p>
<p>You reach the street. The Rue d\u2019Auseil is dissolving. The cobblestones vanish in a wave that moves downhill from the city wall, each stone winking out of existence with a faint click, like a key turning in a lock. The buildings on either side fold inward, their facades crumbling into the dark, their foundations dissolving, their centuries of history erased in seconds.</p>
<p>You run downhill. The dissolution follows. You can hear it behind you: a sound like paper tearing, like ice cracking, like the fabric of the world being pulled apart along a seam you never knew existed. You run and the street vanishes behind you and the gas lamps go out one by one and the darkness advances with the patience of something that has been waiting for this moment since before your species learned to speak.</p>
<p>You reach the bottom of the street. You throw yourself forward. Your feet hit ordinary cobblestones. Ordinary lamplight falls on your shoulders. An ordinary cat on an ordinary windowsill watches you collapse in an ordinary square in an ordinary city on an ordinary night.</p>
<p>Behind you, where the Rue d\u2019Auseil stood for centuries, there is nothing. A blank wall. Unbroken stone. The city has healed over the wound, closed the gap, sealed the absence with masonry and mortar and the collective agreement of a thousand years of civic records that this place never existed.</p>
<p>The street did not fade. It did not vanish. It was consumed. Every brick, every stone, every atom. Every memory. Every note. Everything Zann fought for, everything he played for, everything he died to protect. The void took it all, and the world closed over the loss like water closing over a stone, and by morning there will be nothing left to prove that any of it was real.</p>
<p class="thought">I survived. I should not have survived. The void was thorough, methodical, absolute. It took everything: the street, the house, the man, the music. It should have taken me. But it let me go. I do not know why. Perhaps I was too small to notice. Perhaps I was already outside the boundary when the dissolution reached me. Or perhaps the void, in its vast indifference, simply did not care enough to chase a single fleeing body down a hill. I survived, and the knowledge of what I survived will eat me alive, slowly, from the inside out, for the rest of my life.</p>`
},


// ========================================================================
// ENDING D — THE SEALED WINDOW
// The player helps Zann seal the window permanently.
// Requires: knowledge >= 4, has_manuscript >= 1, window_sealed >= 1
// Only ending where Zann survives.
// ========================================================================
'ending_sealed': {
  type: 'game_ending',
  paragraph: 256,
  title: 'The Sealed Window',
  endingTitle: 'The Sealed Window',
  endingSubtitle: 'Some doors, once closed, stay closed. The question is what you do with the key.',
  ambience: 'night',
  text: `<p>The window changes under your hands.</p>
<p>You feel it happen. The inscriptions in the frame, the ones Zann carved over thirty years of nightly confrontation, respond to your grip. They warm. They pulse. They connect, one to the next, forming a circuit that runs through the wood and through your palms and through the music Zann is playing behind you, a single continuous loop of frequency and structure and intention.</p>
<p>The manuscript pages in your pocket grow warm against your chest. The knowledge they contain is no longer abstract. It flows through you like current through a wire: the frequencies, the intervals, the mathematical architecture of the barrier that Zann built note by note, night by night, for three decades. You understand it now. You understand it the way your hands understand the shape of a tool they have used a thousand times, without thought, without effort, without doubt.</p>
<p>You speak the sealing frequency. You do not know how you know it. The manuscript described it, Zann's notation mapped it, but the knowledge that rises to your lips is older than paper and ink. It comes from the contact between your hands and the wood, from the circuit that runs through the inscriptions and the music and the void itself. Three syllables. Not a word in any language you know. A vibration shaped by the human throat and directed at the junction between two worlds.</p>
<p>The window responds.</p>
<p>The glass, cracked and straining, begins to heal. The fractures close. The darkness on the other side thickens, solidifies, becomes opaque. The void's attention, vast and patient, meets resistance it has never encountered before: not a wall of sound, temporary and exhaustible, but a seal, permanent and self-sustaining, powered by the convergence of music and mathematics and the stubborn, improbable courage of two men in a cold room at the top of the world.</p>
<p>The window closes.</p>
<p>Not the glass. The glass was never the barrier. What closes is the opening itself: the thin place, the junction, the wound in the world's surface through which the void has been pressing for centuries. It closes the way a door closes, with a click, with a finality, with the unmistakable sound of something finished.</p>
<p>The cold recedes. The light returns. The candles on the floor flare to life, their flames steady and yellow and belonging entirely to this world. The garret is a garret again: small, shabby, cold in the ordinary way that garrets are cold, smelling of rosin and candlewax and the sweat of an old man who has been fighting for his life.</p>
<p>Zann lowers the bow. His hands are shaking. His face is grey. But he is alive. His eyes, behind the thick spectacles, are open and present and filled with an emotion you have never seen in them before: relief so profound it has displaced every other feeling, leaving only a vast, exhausted, incredulous gratitude.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann's Note</div><div class="dialog-text">It is closed. After thirty years. It is closed.</div></div>
<p>You release the window frame. Your hands are marked with the inscriptions: red lines pressed into the skin, mirror images of the symbols Zann carved into the wood. They will fade. Or they will not. You find you do not care.</p>
<p>You help Zann to his feet. He is light, fragile, a framework of bones held together by habit and stubbornness. He leans on your arm and you descend the stairs together, slowly, one step at a time, through a house that is quiet in the way that houses are quiet when the danger has passed and the occupants are too exhausted to celebrate.</p>
<p>The front door opens onto morning. The Rue d\u2019Auseil stretches before you, its cobblestones gleaming in the first light of dawn. The gas lamps are out, replaced by sunlight. The buildings lean, as they always lean, but the lean feels less malicious now, less deliberate. An architectural eccentricity rather than a threat.</p>
<p>You step into the street. Zann blinks in the sunlight. He has not been outside in daylight for years, perhaps decades. The sun falls on his grey face and he closes his eyes and tilts his head back and stands there, an old man warming himself in the morning, and the moment is so ordinary and so human that it breaks something in your chest.</p>
<p>The street will vanish. You know this. You can feel it already beginning: the slow withdrawal, the gentle erasure, the city healing over the place where the wound used to be. By tomorrow the Rue d\u2019Auseil will be gone, and no one will remember it, and the ancient city wall will stand unbroken along the edge of the old quarter.</p>
<p>But the window is sealed. The void is locked out. And the manuscript, its pages warm in your pocket, contains the knowledge of how it was done. Whether the world should have this knowledge is a question for another day. Today, the sun is shining, and an old man is standing in it, and the music has stopped, and the silence that follows is the most peaceful sound you have ever heard.</p>
<p class="thought">We sealed the window. The knowledge survives. Zann survives. Whether these things are victories or merely postponements, I cannot say. The void is patient, and patience has a way of outlasting every wall and every seal and every music ever played. But today the door is closed, and the key is in my pocket, and the old man beside me is breathing, and the sun is warm, and that is enough. For now, that is enough.</p>`
},


// ========================================================================
// ENDING E — THE MUSIC OF THE SPHERES (Transcendence)
// The player and Zann play together and achieve cosmic understanding.
// Requires: knowledge >= 5, perception >= 9, played_viol >= 1,
//           sanity >= 14, knows_void >= 1
// Hardest ending to achieve. Zann dies, but transcendently.
// ========================================================================
'ending_transcendence': {
  type: 'game_ending',
  paragraph: 258,
  title: 'The Music of the Spheres',
  endingTitle: 'The Music of the Spheres',
  endingSubtitle: 'There are those who hear the music and go mad, and those who hear it and understand. You are not sure which you are.',
  ambience: 'garret_music',
  text: `<p>The two viols find each other.</p>
<p>It happens without intention, without planning, without thought. Zann plays a phrase and you answer it, and your answer contains within it a question, and Zann answers the question with a phrase that opens into a new question, and the music builds, layer by layer, voice by voice, a conversation between two instruments that is also a conversation between two minds that is also, you realise with a clarity that transcends understanding, a conversation between your world and the one that lies beyond the window.</p>
<p>The void listens. Its attention, which was pressure, becomes something else. Interest. Curiosity. The vast, formless awareness on the other side of the glass stops pushing and starts paying attention, the way an audience pays attention when the performance reaches the passage they came to hear.</p>
<p>You play. Zann plays. The music climbs.</p>
<p>The garret dissolves. The walls become transparent, then translucent, then absent, and what replaces them is not the void but something else: a space that is neither here nor there, neither your world nor the other, but the threshold between them. The place where sound becomes mathematics and mathematics becomes structure and structure becomes the architecture of everything that exists.</p>
<p>You see it. The music has opened your eyes, or closed them, or replaced them with something better. You see the geometry of the cosmos: the frequencies that hold atoms together, the intervals between stars, the harmonics that govern the expansion of space itself. You see that the void is not empty. It is full. It is the fullest thing there is. It contains every possibility, every pattern, every music that could ever be played by every instrument that could ever be built by every hand that could ever hold a bow.</p>
<p>You see that Zann's music was never a barrier. It was a translation. A way of rendering the void's language into sound that human ears could endure. The window was never a wall. It was a lens, and Zann was the interpreter, and for thirty years he sat at the junction between two worlds and translated, note by note, the music of everything into the music of something a human heart could survive hearing.</p>
<p>Zann plays his final phrase. You hear it clearly: three notes, ascending, each one encompassing more of the spectrum than the human ear was designed to perceive. The final note is not a sound. It is an understanding. A recognition. The void acknowledges the music and the music acknowledges the void and in the space between them, in the threshold where two worlds meet, something shifts.</p>
<p>The window closes. Not with force. With consent. The void withdraws, not because it is repelled but because the conversation is over. The music has said what needed to be said. The answer has been given. The door closes because both sides agree that it should close, and the agreement is the seal, and the seal is permanent.</p>
<p>Zann lowers his bow. He smiles. You have never seen him smile before. It transforms his face: the grey skin, the enormous spectacles, the years of fear and isolation and sacrifice. For one moment he is not a frightened old man in a cold garret. He is a musician at the end of a performance, suffused with the knowledge that the music was good, that the audience heard it, that the notes landed where they were meant to land.</p>
<p>He sets down the viol. He folds his hands. He closes his eyes.</p>
<p>He does not open them again.</p>
<p>The garret reforms around you. Walls, ceiling, floor, the ordinary architecture of an ordinary room. The candles burn. The window is dark glass reflecting candlelight. Beyond it, you can see rooftops, a sky full of stars, the ancient city wall outlined against the horizon.</p>
<p>You set down the second viol. Your hands are steady. Your mind is quiet. The understanding you glimpsed in the threshold is still there, folded into the spaces between your thoughts: not a memory but a permanent alteration in the way you perceive the world. You will never see a sunset without hearing its frequency. You will never hear music without seeing its geometry. The translation works both ways, and it has changed you, and the change is irreversible and total and, you suspect, the closest thing to grace that the universe is capable of offering.</p>
<p>You descend the stairs. The house is quiet. The other rooms are empty. The front door opens onto morning, and the Rue d\u2019Auseil is already fading, its cobblestones growing transparent in the early light. By noon it will be gone. By evening, no one will remember it.</p>
<p>But you will remember. You will remember the street and the house and the old man and the music. You will remember the void and the window and the threshold where two worlds met and spoke and, for one impossible moment, understood each other. You will carry the music with you for the rest of your life: not in your ears but in your bones, in the architecture of your perception, in the way you see the frequencies that hold the world together.</p>
<p>The Rue d\u2019Auseil vanishes behind you. The city fills the space it leaves. You walk into the morning, and the music walks with you, and the silence that follows is not empty but full: resonant, harmonious, alive with the echoes of every note that was ever played in a garret at the top of the world by a man who loved the music more than he feared the dark.</p>
<p class="thought">I heard the music of the spheres. I played it. I understood it, or it understood me, or the understanding was mutual, a recognition between two patterns of vibration separated by a membrane of glass and thirty years of terror and one old man's inexhaustible, sacred, impossible courage. Zann is dead. The street is gone. The window is closed. But the music continues. It has always continued. It will always continue. The only thing that changes is who is listening.</p>`
}

};
