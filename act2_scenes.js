// --- ACT 2 SCENES DATA ---
// THE VIOL'S SECRET
// Eleven scenes: routine, tenants, invitation, garret, performance,
// window, manuscript, street at night, viol mini-game, what answers, the truth.
// Skill tests: Perception (2.2, 2.4), Sanity (2.5, 2.6, 2.10), Luck (2.8)
const ACT2_SCENES = {

// ============ ACT 2 TITLE ============
'a2_title': {
  type: 'act_title',
  actNum: 'Act Two',
  actName: 'The Viol\u2019s Secret',
  ambience: 'boarding_house',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.1, loop: true },
  ],
  next: 's2_1'
},


// ========================================================================
// SCENE 2.1 \u2014 DAYS IN THE RUE
// Time passes. The player settles into routine. The street becomes
// familiar \u2014 or as familiar as such a street can become. The music
// continues every night. Something is changing in you.
// ========================================================================
's2_1': {
  paragraph: 100,
  title: 'Days in the Rue',
  ambience: 'boarding_house',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: '07_Part_Fratres_String_Quartet.mp3', volume: 0.4, loop: false },
  ],
  text: `<p>A week passes. Then two. The university term begins and you attend your lectures, take your notes, walk the long route from the campus back to the Rue d\u2019Auseil each evening. You have not yet found a shorter path. You are beginning to suspect there is none.</p>
<p>The city is old and indifferent to you. The lecture halls smell of dust and ambition. Your professors speak of Kant and Hegel, of the limits of reason, of the categories that bind perception to the knowable world. You sit in the back row and take meticulous notes, and all the while a part of your mind is elsewhere; in a garret at the top of a house that should not exist, listening to music that should not be possible.</p>
<p>Each night, the music plays. You have learned its rhythms now, or some of them. Zann begins around eleven, sometimes earlier. The playing lasts two hours, sometimes three. On certain nights it is quiet, almost gentle \u2014 a lullaby for something that does not sleep. On others it is violent, frantic, the viol driven to sounds that make your teeth ache and your dreams curdle.</p>
<p>You have not spoken to Zann again since that first evening in his garret. You see him on the stairs occasionally, descending in the late afternoon for his work at the theatre orchestra, returning after midnight, always with the battered viol case clutched to his chest. He nods to you. You nod back. The understanding between you is fragile and unspoken, and you are afraid to test it.</p>`,
  conditionals: [
    {
      check: 'zann_trust >= 1',
      text: `<p>But there is something in his nod that was not there before \u2014 a fractional warmth, an acknowledgement. You helped him, or tried to. You accepted his invitation without flinching. That counts for something, in the economy of a frightened old man\u2019s trust.</p>`
    },
    {
      check: 'zann_trust <= -1',
      text: `<p>His nod, when it comes, is curt. Guarded. You mentioned his music on the stairs that first time, and the memory of his terror has not faded from either of you. The damage may not be permanent, but it will take time to undo.</p>`
    }
  ],
  closingText: `<p class="thought">Settling in. The room is mine now \u2014 my books on the desk, my coat on the hook, my shoes wearing a path in the floorboards. This is my life. A student of metaphysics in a house on a street that cannot be found, listening each night to music that comes from somewhere beyond the edge of the world.</p>
<p>It is a Tuesday evening. You have returned from lectures, and the house is quiet. You have a few hours before Zann\u2019s nightly performance begins. How do you spend them?</p>`,
  choices: [
    {
      label: 'A',
      text: 'Study at your desk. You are falling behind, and the term waits for no one.',
      audio: null,
      paragraph: 101,
      effects: {},
      outcome: `<p>You sit at the desk and open the <em>Critique of Pure Reason</em>. The gaslight is thin but adequate. You read, and you take notes, and for a time the world contracts to the size of a page and a pen and the dry, rigorous architecture of Kant\u2019s thought.</p>
<p><em>The thing-in-itself is unknowable.</em> You write this in the margin and then sit back and stare at it. The thing-in-itself. The <em>Ding an sich</em>. The reality behind appearances, which reason can never reach.</p>
<p>Upstairs, an old man plays a viol to keep a window closed against something that has no name. And you, student of metaphysics, are beginning to wonder whether Kant was wrong: not about the limits of reason, but about what waits on the other side of those limits.</p>
<p class="thought">My notes are good. But the questions that matter most are not in any textbook, and the answers \u2014 if they exist \u2014 are in a garret one floor above my head.</p>`,
      next: 's2_2'
    },
    {
      label: 'B',
      text: 'Explore the neighbourhood. You know so little about this part of the city.',
      audio: null,
      paragraph: 102,
      effects: { knowledge: 1 },
      outcome: `<p>You take your coat and step outside. The Rue d\u2019Auseil is quieter than a street in a busy city should be. The cobblestones are damp with a moisture that seems to come from the stone itself rather than from any rain. The gas lamps are already lit, though the sky still holds a thin wash of grey.</p>
<p>You walk downhill. The street curves and narrows, and you pass buildings you have seen before but never examined: a shuttered pharmacie with green glass bottles in the window, a door with an iron knocker in the shape of a hand, a wall on which the plaster has fallen away to reveal brickwork of astonishing age.</p>
<p>At the foot of the street you find the small caf\u00e9 where you ate on your first night. The same silent woman is behind the counter. She serves you coffee without being asked, as though she has been waiting for you.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">This street \u2014 the Rue d\u2019Auseil. How long have you lived here?</div></div>
<p>She looks at you with mixture of pity and contempt. She does not answer. She pours more coffee and turns away.</p>
<p class="thought">The neighbourhood does not want to be known. It merely tolerates my presence with indifference that borders on hostility. But I am learning its shape, its rhythms, its silences. And that is something.</p>`,
      next: 's2_2'
    },
    {
      label: 'C',
      text: 'Knock on the doors of other tenants. You should know your neighbours.',
      audio: [
        { src: 'House_on_the_Hill-door_knock.ogg', volume: 0.2, loop: false },
      ],
      paragraph: 103,
      effects: { suspicion: 1, knows_clerk: 1 },
      outcome: `<p>You have lived here for two weeks and spoken to no one but Blandot and Zann. The house has other tenants; you hear them, distantly, through the walls and floors. Doors opening and closing. Footsteps. The occasional cough. But you have never seen their faces.</p>
<p>You try the fourth floor first. Three doors, all closed. You knock on the nearest.</p>
<p>No answer. You knock again.</p>
<p>The door opens a crack. A man\u2019s face appears: drawn, sallow, with dark circles under his eyes that suggest he has not slept properly in years. He is perhaps forty, dressed in the threadbare jacket of a clerk or a minor official.</p>
<div class="dialog-box"><div class="dialog-speaker">The Tenant</div><div class="dialog-text">Yes?</div></div>
<p>His voice is flat. Not unfriendly, exactly, just drained. Maybe friendliness is a resource he exhausted long ago.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I\u2019m your neighbour. I live on the floor above \u2014 or below. I wanted to introduce myself.</div></div>
<div class="dialog-box"><div class="dialog-speaker">The Tenant</div><div class="dialog-text">I know who you are. You\u2019re the student. The new one.</div></div>
<p>He pauses. He seems to be deciding something.</p>
<div class="dialog-box"><div class="dialog-speaker">The Tenant</div><div class="dialog-text">A word of advice, if you\u2019ll take it. Don\u2019t ask questions in this house. Not of Blandot, not of the old man upstairs, not of anyone. Just pay your rent and keep your door closed after dark.</div></div>
<p>He closes the door. The lock turns. You stand in the corridor, and the silence of the house settles around you like a held breath.</p>
<p class="thought">Don\u2019t ask questions. It is the same advice, in different words, that everyone on this street seems determined to share. But I am a student of metaphysics. Asking questions is my vocation.</p>`,
      next: 's2_2'
    }
  ]
},


// ========================================================================
// SCENE 2.2 \u2014 THE OTHER TENANTS
// Meeting the building's residents. Learning about the house, Zann,
// the street. Each choice reveals different information.
// PERCEPTION TEST (deferred): noticing details about residents.
// ========================================================================
's2_2': {
  paragraph: 104,
  title: 'The Other Tenants',
  ambience: 'boarding_house',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.2, loop: true },
    { src: 'House_on_the_Hill-clock_loop.ogg', volume: 0.03, loop: true },
    { src: 'House_on_the_Hill-house_rattle.ogg', volume: 0.03, loop: false },
    { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.1, loop: true },
  ],
  text: `<p>Over the following days, despite all warnings, you begin to learn about the other people in Blandot\u2019s house.</p>
<p>The building holds perhaps a dozen souls, distributed across its six floors like specimens in a cabinet. They are, without exception, quiet. They come and go at odd hours, passing one another on the stairs with the practised invisibility of people who have learned that to be noticed is to be vulnerable.</p>
<p>You have identified three, aside from Blandot and Zann. The clerk on the fourth floor, {{if knows_clerk >= 1}}whose warning you received{{else}}who you observed through the crack in the door{{/if}}. A woman on the second floor who leaves before dawn and returns after midnight, her face always hidden by a dark shawl. And an old woman on the ground floor, behind a door that is never quite closed, who watches the comings and goings of the house with the attentive patience of a spider in its web.</p>
<p>You have questions. The house, the street, the music: they press against your mind; water against a dam. Someone here must know something.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Speak to the clerk on the fourth floor.{{if knows_clerk >= 1}} He warned you, which means he knows something worth warning about.{{/if}}',
      paragraph: 105,
      effects: { knowledge: 1, suspicion: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> As the clerk speaks, you notice details he does not intend to reveal: his hands tremble when he mentions the garret. There are scratch marks on the inside of his door, deep grooves in the wood, as if something once tried to claw its way out. And on his desk, half-hidden by papers, you see a fragment of manuscript paper covered in musical notation you do not recognise.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> The clerk\u2019s manner is guarded, and you cannot read what lies behind his words. He tells you only what he chooses, and whatever he is hiding remains hidden.</div>`
      },
      outcome: `<p>You find the clerk in the corridor, returning from work. He carries a leather case under one arm and smells of ink and exhaustion. When he sees you, his expression tightens.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">{{if knows_clerk >= 1}}You told me not to ask questions. I\u2019m asking anyway. {{/if}}The old man in the garret \u2014 what do you know about him?</div></div>
<p>The clerk stops. He looks up and down the corridor. Then he takes your arm and pulls you inside his room.</p>
<p>The room is identical to yours in layout but older: the walls darker, the furniture more deeply worn. He has been here a long time.</p>
<div class="dialog-box"><div class="dialog-speaker">The Clerk</div><div class="dialog-text">Zann has been in this house longer than anyone. Longer than Blandot, even. He was here when I arrived eight years ago. He was here when the woman before me arrived, and the man before her. He does not age. He does not leave, except for the theatre. And every night he plays.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">What does he play for?</div></div>
<p>The clerk\u2019s face closes like a door.</p>
<div class="dialog-box"><div class="dialog-speaker">The Clerk</div><div class="dialog-text">I don\u2019t know. I don\u2019t want to know. I hear the music and I put my pillow over my head and I wait for morning. That\u2019s what you should do. That\u2019s what everyone here does.</div></div>
<p>He hesitates. Something else is pressing at his lips.</p>
<div class="dialog-box"><div class="dialog-speaker">The Clerk</div><div class="dialog-text">There was a tenant before you. On the fifth floor. Your room. He stayed three months. Then one night \u2014 I heard him on the stairs. Running. He was gone by morning. Left everything. His books, his clothes. Blandot cleared the room and never mentioned him again.</div></div>
<p class="thought">A man who ran. Who left everything and fled in the night. I wonder what he heard. Was it the music that drove him out, or something the music failed to keep at bay.</p>`,
      next: 's2_3'
    },
    {
      label: 'B',
      text: 'Visit the old woman on the ground floor \u2014 the concierge who watches everything.',
      paragraph: 106,
      effects: { knowledge: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> You notice what she is trying to hide: pinned to the wall behind her chair, half-covered by a shawl, is a faded photograph of the Rue d\u2019Auseil. In the photograph, the street is level. The buildings stand straight. And the sky above them is wrong \u2014 too wide, too bright, the street perhaps having once existed in a different world entirely.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> The old woman\u2019s room is cluttered and dim, and whatever secrets it holds are lost among the accumulated debris of decades. You see only what she wants you to see.</div>`
      },
      outcome: `<p>The ground-floor door stands ajar, as always. You knock on the frame. From within comes a dry, papery voice, with an accent you cannot place.</p>
<div class="dialog-box"><div class="dialog-speaker">The Concierge</div><div class="dialog-text">Come in, then. You\u2019ve been hovering long enough.</div></div>
<p>She sits in a high-backed chair by a window that looks onto the street. She is older than Blandot. Her skin is translucent. Her eyes, however, are sharp and dark and entirely present.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">You\u2019ve been watching me come and go. You seem to watch everyone.</div></div>
<div class="dialog-box"><div class="dialog-speaker">The Concierge</div><div class="dialog-text">Watching is all that\u2019s left to me. I have watched this street for longer than you would believe.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Tell me about the street. About Zann. About the music.</div></div>
<p>She smiles. It is not a warm smile.</p>
<div class="dialog-box"><div class="dialog-speaker">The Concierge</div><div class="dialog-text">The street was here before the city. Or rather \u2014 the city grew around it, the way a tree grows around a nail. The Rue d\u2019Auseil is the nail. It does not belong to the city. It belongs to itself.</div></div>
<div class="dialog-box"><div class="dialog-speaker">The Concierge</div><div class="dialog-text">As for Zann \u2014 he came here thirty years ago. Or forty. Time is not what it should be on this street. He came because the garret has the only window that looks over the wall. And whatever he saw through that window, it was enough to make him play every night since. To keep it closed.</div></div>
<p class="thought">The only window that looks over the wall. The city wall \u2014 ancient, crumbling \u2014 runs along one side of the Rue d\u2019Auseil. Every window in every building faces inward, toward the street. Every window except one.</p>`,
      next: 's2_3'
    },
    {
      label: 'C',
      text: 'Investigate Blandot. The landlord knows more than he lets on.',
      paragraph: 107,
      effects: { suspicion: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> While Blandot\u2019s back is turned, you glimpse his rent ledger. The entries stretch back decades. Zann\u2019s name appears on every page \u2014 the same cramped handwriting, the same sum, never changing, never missed. And at the bottom of one page, in different ink, a single annotation: <em>Ne jamais monter. Ne jamais regarder.</em> Never go up. Never look.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> Blandot is a careful man, and his rooms reveal nothing you can use. Whatever he knows, he has had decades of practice concealing it.</div>`
      },
      outcome: `<p>You find Blandot in his ground-floor office, a cramped room behind the entrance hall, piled with ledgers and smelling of camphor and damp wool. He is writing in a large book with a pen that scratches like a rat in the walls.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I have questions about the house. About the upper floors.</div></div>
<p>Blandot does not look up.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Questions cost nothing to ask and everything to answer. What do you want?</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">The garret. Zann\u2019s room. How long has he lived there?</div></div>
<p>The pen stops scratching. Blandot\u2019s good eye swivels toward you.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Longer than you. Longer than me. He pays. He\u2019s quiet \u2014 quiet enough, considering. I don\u2019t ask what he does up there and neither should you.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">But you know. You must know something.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">I know that this house has stood for two hundred years and the rent gets paid and the roof doesn\u2019t leak and the tenants who mind their own business tend to stay healthy. That\u2019s what I know. That\u2019s all I know.</div></div>
<p>He returns to his ledger. The audience is over.</p>
<p class="thought">He is lying, perhaps without realising. His is the silence of one who has made a conscious decision about what to know and what to ignore, and who enforces that decision on everyone under this roof.</p>`,
      next: 's2_3'
    }
  ]
},


// ========================================================================
// SCENE 2.3 \u2014 AN INVITATION
// Zann reaches out again. A note under your door. He wants you
// to come to the garret \u2014 to hear him play, to see the room, to
// understand. Trust is growing, or desperation is.
// ========================================================================
's2_3': {
  paragraph: 108,
  title: 'An Invitation',
  ambience: 'boarding_house',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: 'House_on_the_Hill-clock_loop.ogg', volume: 0.03, loop: true },
    { src: 'House_on_the_Hill-house_rattle.ogg', volume: 0.03, loop: false },
    { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.1, loop: true },
  ],
  text: `<p>You find the note one evening, slipped under your door while you were at the university. The paper is the same thin, almost translucent stock as before. The handwriting is the same: angular, Germanic, but steadier now.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I owe you an explanation. What I showed you before was not enough. Come tonight at ten. Before I must play. I will show you the room properly. I will show you the window. You deserve to understand what lives above your head.</div></div>
<p>You read it twice. The word <em>lives</em> catches your eye. So the garret itself is a living thing ... or contains one.</p>`,
  conditionals: [
    {
      check: 'zann_trust >= 2',
      text: `<p>There is a postscript, added in pencil, fainter than the ink:</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I am glad you are here. I have been alone with this for too long.</div></div>`
    }
  ],
  closingText: `<p class="thought">An invitation. Or a summons. Or a confession. Not sure which, and I suspect Zann is not sure either. But the garret is waiting, and the window \u2014 and whatever waits beyond it \u2014 is patient.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Go at ten, as he asks \u2014 eager, willing, ready to learn.',
      paragraph: 109,
      effects: { zann_trust: 1 },
      outcome: `<p>You climb the stairs at ten o\u2019clock precisely. The house is quiet, the tenants behind their doors, the corridors dim, the lamps turned to their lowest. Your footsteps on the treads are the loudest sound in the building.</p>
<p>The garret door is ajar. Candlelight spills across the landing in a thin golden wedge. You push the door open and step inside.</p>
<p>Zann is waiting for you. He sits in his chair by the music stand, the viol resting across his knees. He has attempted to clean the room. The piles of manuscript paper have been gathered and stacked. A second chair has been placed near the first. Two candles burn in tarnished holders on the table.</p>
<p>He nods to you. It is a greeting and an instruction both: sit down.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He gestures around the room with one thin hand \u2014 a sweeping motion that encompasses the walls, the ceiling, the window. Then he touches his chest and inclines his head. All of this is mine. All of this is what I am. Look.</div></div>
<p class="thought">He has prepared for this. Whatever he is about to show, it is not impulsive: it is the result of deliberation, of a decision made and remade over many sleepless nights. He needs me to see.</p>`,
      next: 's2_4'
    },
    {
      label: 'B',
      text: 'Go, but cautiously \u2014 prepare yourself first.',
      paragraph: 110,
      effects: { knowledge: 1 },
      outcome: `<p>You do not go at ten. You go at nine.</p>
<p>You spend the hour before in your room, reviewing the notes that you have been keeping in a separate book since your first night on the Rue d\u2019Auseil. Observations. Impressions. Questions. You read through them with the disciplined eye of a scholar preparing for a viva, and you compile a list of things you need to know.</p>
<p><em>The window \u2014 what lies beyond it? The music \u2014 what does it hold back, and how? The manuscript \u2014 what has he written, and why? The street \u2014 why can it not be found?</em></p>
<p>At ten you climb the stairs, your questions ordered, your mind as clear as you can make it.</p>
<p>The garret door is ajar. Zann sits inside, waiting. He has arranged a second chair. Candles burn. The room is as ready as he can make it.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He looks at you and nods slowly, approvingly. He can see that you have prepared. He respects this. One scholar to another \u2014 even if his scholarship is written in a language of sound rather than words.</div></div>`,
      next: 's2_4'
    },
    {
      label: 'C',
      text: 'Delay \u2014 write back asking for the morning instead.',
      paragraph: 111,
      effects: { zann_trust: -1, suspicion: -1 },
      outcome: `<p>You hesitate. The garret at night, with the music about to begin and the window doing whatever it does in the dark. It is not a prospect you relish. You write a note of your own and slide it under his door.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Your Note</div><div class="dialog-text">I will come. But can we meet in the morning? Daylight would be easier for me.</div></div>
<p>The reply comes within the hour, pushed under your door with what you sense is reluctance.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">In the morning the window is only a window. You would see nothing. You would understand nothing. But come if you wish. I will wait.</div></div>
<p>You go in the morning. The garret in daylight seems different: smaller, shabbier, the sloping ceiling stained with damp, the furniture worn to bare wood. The candles are out. Grey light enters through the window, and through it you see \u2014</p>
<p>A wall. The city wall, close and featureless, its ancient stone filling the frame. Beyond the wall, a strip of sky. Nothing else. Nothing remarkable. Nothing that could possibly require a lifetime of desperate, nightly music to contain.</p>
<p>Zann sits in his chair and watches you look. His expression is complicated: vindication and disappointment mixed in equal measure.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">You see? In daylight it is nothing. The night is when it opens. You must come at night.</div></div>
<p>That evening, at ten, you climb the stairs again. This time the room is different. The candles are lit. The air is heavier. And the window ...</p>`,
      next: 's2_4'
    }
  ]
},


// ========================================================================
// SCENE 2.4 \u2014 THE GARRET
// Inside Zann's room properly for the first time. The viol, the
// window, the manuscript pages, the accumulated evidence of decades
// of nightly vigil.
// PERCEPTION TEST (deferred): examining the room for details.
// ========================================================================
's2_4': {
  paragraph: 112,
  title: 'The Garret',
  ambience: 'garret',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: 'House_on_the_Hill-clock_loop.ogg', volume: 0.05, loop: true },
    { src: 'Bleakwater_Docks-dock_creaks_loop.ogg', volume: 0.1, loop: true },
    { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.1, loop: true },
  ],
  text: `<p>The garret is smaller than you remembered. Or perhaps it has contracted since your last visit, the way rooms do in dreams, shrinking around their occupants like a hand closing into a fist. The ceiling slopes sharply from the centre beam to the eaves, and you can stand upright only in a narrow strip down the middle.</p>
<p>Zann\u2019s life is all here. The narrow bed, neatly made. The table with its candles and its inkwell and its stacks of paper. A wardrobe whose door does not close properly. The music stand, battered and ink-stained. And the viol, resting in its open case on the floor. A dark, scarred, yet gleaming instrument, caressed by the same hands every day for decades.</p>
<p>The manuscript pages are everywhere, arranged in stacks and bundles, some tied with twine, some weighted with stones. They cover the table, the chair, the floor around the music stand. On each page, dense, unconventional musical notation; unreadable.</p>
<p>And the window.</p>
<p>It dominates the far wall, framed in heavy timber that has darkened with age to almost black. The curtain are a thick, dark fabric, doubled over, and are drawn across it. The fabric stirs slowly, deliberately, the air behind it seemingly displaced by a immense presence.</p>
<p>Zann watches you take it in. He has given you this moment deliberately. The room, laid bare, with all its accumulated strangeness on display.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Examine the manuscript pages \u2014 what has he been writing all these years?',
      paragraph: 113,
      effects: { knowledge: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> Among the dense notation you spot something extraordinary: the symbols on these pages are not merely musical. Some are mathematical. Others resemble no system you have studied \u2014 angular, recursive, with a logic that seems to fold in on itself. This is not a score. It is a proof. A proof written in sound.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> The notation is impenetrable. You see patterns \u2014 repetitions, variations, structures that suggest meaning \u2014 but their language is beyond you. The manuscript keeps its secrets.</div>`
      },
      outcome: `<p>You pick up the nearest stack of pages. Zann stiffens but does not stop you. The paper is very old; yellowed and brittle at the edges. The ink varies from page to page: black, brown, a faded blue. He has been writing for a long time.</p>
<p>The notation is unlike anything you have encountered. It is not the five-line staff of Western music. Instead, each page is covered in dense symbols arranged in spiralling patterns; lines that curve and intersect, punctuated by marks that might be notes or might be something else entirely. Some pages include diagrams: circles within circles, angles that do not resolve, geometries that make your eyes ache if you look at them too long.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He takes a page from you \u2014 gently, not snatching \u2014 and points to a particular sequence of symbols. Then he picks up the viol and plays the sequence. The sound is familiar: a passage you have heard through your ceiling a dozen times. The notation is a map of the music. But it is also something more.</div></div>
<p>He sets the viol down and writes on a fresh slip of paper.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">It is not only music. It is a language. The music speaks to what is beyond the window, and these pages are the grammar. I have spent thirty years learning it.</div></div>
<p class="thought">A language. He has been writing a grammar of something that lies beyond the limits of human experience. The metaphysician in me recognises the ambition.</p>`,
      next: 's2_5'
    },
    {
      label: 'B',
      text: 'Study the viol \u2014 the instrument that holds back the dark.',
      paragraph: 114,
      effects: { knowledge: 1 },
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> The viol is old \u2014 centuries old, you suspect. But that is not the remarkable thing. The remarkable thing is the modification: additional strings have been added, thinner than the originals, tuned to intervals that no standard instrument uses. Someone \u2014 Zann, presumably \u2014 has rebuilt this instrument to play notes that should not exist.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> The viol is old and well-used. You see the scars and the polish and the wear of decades. But its deeper secrets \u2014 whatever makes it capable of the sounds you have heard \u2014 remain hidden to your untrained eye.</div>`
      },
      outcome: `<p>You kneel beside the open case and look at the viol. Zann makes a constricted, anxious sound in his throat, the closest thing to speech his ruined voice can manage, but he does not stop you.</p>
<p>The instrument is beautiful in the way that old, well-used things are beautiful: not pristine, but resonant with the accumulated weight of its history. The wood is dark, almost black in the candlelight, with a grain that seems to shift as you look at it. You count the strings. There are more than you expected. The standard viol has six or seven strings. This one has eleven. The additional strings are thinner, almost invisible, strung between the others at intervals you cannot quite measure.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He reaches past you and plucks one of the thin strings. The sound it produces is not a note. It is a vibration that you feel in your sinuses, in the hollow of your chest, in the spaces between your vertebrae. The air in the room changes quality, as if a huge, unseen void has been opened.</div></div>
<p>He plucks a second thin string. The vibration harmonises with the first in a way that makes your vision blur at the edges. The curtain over the window twitches.</p>
<p>Zann covers the strings with his palm, silencing them instantly. He shakes his head. <em>Not now. Not yet.</em></p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I added those strings myself. The viol was not built for what I must play. No instrument was. I had to remake it.</div></div>`,
      next: 's2_5'
    },
    {
      label: 'C',
      text: 'Approach the window \u2014 look at what he fears.',
      paragraph: 115,
      effects: { dread: 1 },
      audio: [
        { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.2, loop: true },
      ],
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> As you approach, you notice something others might miss: the window frame is scored with symbols, carved into the wood with a knife or chisel, hundreds of them, layer upon layer. Some match the notation on Zann\u2019s manuscript pages. This window has been inscribed like a ward, a barrier of carved language supplementing the barrier of sound.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> The window is large, curtained, and unsettling. You feel its presence \u2014 everyone in this room must feel it \u2014 but whatever secrets are carved into its frame or hidden in its construction elude you.</div>`
      },
      outcome: `<p>You step toward the window. Zann\u2019s reaction is immediate: he rises from his chair with a speed that belies his age, his hand outstretched, his face a mask of alarm. But he does not grab you. He watches, trembling, as you approach.</p>
<p>The curtain is heavy. Up close, you can see that it is not one layer but several: a thick drape, a thinner lining, and behind that, what appears to be a blanket, pinned to the frame. Zann has layered his defences.</p>
<p>The stirring of the fabric is more pronounced here. Not a breeze \u2014 there is no sense of moving air on your skin. The fabric heaves: something behind it is pressing forward, testing the barrier, then withdrawing. The rhythm is slow. Patient. Inhuman.</p>
<p>You reach out and touch the curtain.</p>
<p>The fabric is cold. A deep cold, of absence, of a place where warmth has never existed. Your fingers register the temperature before your mind can process it, and you jerk your hand back.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He grips your shoulder and pulls you gently but firmly away from the window. His eyes are very wide. He shakes his head \u2014 not angrily, but with the urgency of a man pulling a child from a precipice.</div></div>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Not yet. You are not ready. Perhaps you will never be ready.</div></div>
<p class="thought">He is right. I know he is right. Whatever is behind that curtain, beyond the window, is outside everything I understand.</p>`,
      next: 's2_5'
    }
  ]
},


// ========================================================================
// SCENE 2.5 \u2014 THE PERFORMANCE
// Zann plays for you privately. The music starts beautifully,
// becomes wild, becomes terrifying.
// SANITY TEST (immediate): can you endure a private performance?
// ========================================================================
's2_5': {
  paragraph: 116,
  title: 'The Performance',
  ambience: 'garret',
  audio: [
    { src: '02_Part_Fratres_Violin.mp3', volume: 0.4, loop: true },
    { src: '09_Part_Fratres_Cello.mp3', volume: 0.1, loop: false },
  ],
  text: `<p>Zann picks up the viol. He holds it for a moment without playing, cradling it against his chest the way a mother holds a child she is about to surrender. Then he positions it, tucks the scroll beneath his chin, raises the bow, and looks at you.</p>
<p>His eyes ask a question: <em>Are you ready?</em></p>
<p>You nod. You are not ready. You nod anyway.</p>
<p>He draws the bow across the strings.</p>
<p>The first note is a G \u2014 low, resonant, human. It fills the small room the way water fills a cup, finding every corner, every crack. The viol\u2019s voice is deeper than you expected, richer, with a quality that reminds you of a human voice singing in a language you almost recognise.</p>
<p>The music builds. A second note joins the first, then a third. Zann\u2019s fingers move across the strings with the practised certainty of thirty years, and the melody unfolds like a map of an undiscovered country.</p>
<p>For the first few minutes, it is beautiful. Strange, yes \u2014 the intervals are wrong, the harmonies unfamiliar, the rhythm something your body does not know how to follow. But beautiful. You sit in your chair and you listen and you feel the music move through you.</p>
<p>Then it changes.</p>
<p>The shift is gradual at first. A darkening of tone, a tightening of rhythm, as if the music is no longer exploring but fleeing. Zann\u2019s bow moves faster. His face, lit by candlelight, has changed: the scholarly concentration replaced by something rawer, something that looks very much like terror.</p>
<p>The additional strings begin to sound. The thin ones, the ones that do not produce notes but vibrations, frequencies that bypass the ear and speak directly to the soul. You feel them in your teeth. In the base of your skull. In the hollow between your ribs where the heart sits.</p>
<p>The curtain over the window is moving in long, slow undulations: some force, something seemingly immense is pushing, pulsating against the glass.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Stay and listen \u2014 endure whatever comes.',
      audio: [
        { src: '07_Part_Fratres_String_Quartet.mp3', volume: 0.4, loop: true },
      ],
      paragraph: 117,
      effects: { heard_music: 1, dread: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -2 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> Your mind holds. The music crashes against you like a wave, and you do not break. You grip the arms of the chair and you endure, and when it is over you are shaking but whole. Something in you has been tempered \u2014 hardened by the fire of the sound.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> The music enters you. It finds the seams in your composure and pries them apart. Your vision splits. The room seems to expand and contract in time with the viol, and for a terrible moment you are not sure whether the walls are breathing or you are. When the music finally stops, you find that your hands are gripping the chair so hard your knuckles have gone white, and there is a thin trickle of blood from your nose. <em>Sanity reduced by 2.</em></div>`,
        successOutcome: `<p>You stay. The music rises around you like a flood, and you let it rise. Your training in metaphysics has given you this, if nothing else: the ability to sit with the incomprehensible and not flinch.</p>
<p>The viol screams. Zann\u2019s bow tears across the strings with a violence that should shatter them, and the sound that emerges is not music but pure expression \u2014 terror and defiance and even love, all compressed into a single sustained note that fills the room, fills your skull, fills the space between molecules.</p>
<p>The curtain billows. Behind it, you sense a sound that is ... a response. Something acknowledging the music from the other side of the glass, from beyond.</p>
<p>Then Zann plays a final phrase \u2014 three notes, descending, with a finality that is like the closing of a door \u2014 and the music stops.</p>
<p>The silence that follows crashes over you like a wave.</p>
<p>Zann lowers the bow. His hands are trembling. His face is grey. He looks at you with eyes that are asking: <em>Do you see? Do you understand what this costs?</em></p>`,
        failOutcome: `<p>You stay, because you cannot leave. The music has taken hold of your body in a way that bypasses volition. You grip the chair. Your vision narrows.</p>
<p>The viol\u2019s voice climbs into registers that should not exist. The additional strings vibrate at frequencies you can feel in your chest cavity, in the fluid of your inner ear, in the grey matter of your brain. The room distorts. The walls breathe. The candlelight bends.</p>
<p>Something warm runs from your nose. You touch it. Blood. A thin trickle, bright in the candlelight.</p>
<p>The music peaks. Behind the curtain, something moves: a deliberate, searching pressure, as of a huge hand pressing against the glass.</p>
<p>Then it stops. Zann lowers the bow. The silence crashes in.</p>
<p>You are in the chair. Your knuckles are white. Your nose is bleeding. The room is still, tense, paused, as if about to strike.</p>
<p>Zann looks at you with an expression of terrible guilt.</p>`
      },
      next: 's2_6'
    },
    {
      label: 'B',
      text: 'Move toward the window while Zann is absorbed in playing.',
      audio: [
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.4, loop: true },
      ],
      paragraph: 118,
      effects: { heard_music: 1, dread: 2 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -3 },
        successBonus: { knows_void: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> You look behind the curtain and your mind survives intact. What you see there will never leave you \u2014 but you are still yourself. You have glimpsed the void and retained the capacity to process what you saw.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> You look behind the curtain. What you see there breaks something inside you \u2014 not dramatically, not all at once, but with the quiet finality of a bone cracking under sustained pressure. The world will never look quite the same again. <em>Sanity reduced by 3.</em></div>`,
        successOutcome: `<p>While Zann plays, his eyes closed, his body given over entirely to the music, you rise from the chair. You cross the room in three steps. You reach the curtain.</p>
<p>You pull it aside.</p>
<p>For an instant you see what lies beyond the window.</p>
<p>Beyond the glass is a darkness; a void so complete that it contains neither space nor time nor the possibility of either. And in that void, either very far away or very close \u2014 distance has no meaning there \u2014 something moves. Not a shape or a presence. An <em>attention</em>. Something vast and formless that is aware of the window, aware of the music, aware of you.</p>
<p>Zann\u2019s hand clamps on your wrist and yanks you back. The curtain falls. The room returns. You are standing in a garret in a boarding house on a street in a city, and you are breathing, and you are alive, and you have seen what lies beyond.</p>
<p>Zann\u2019s face is white with rage and terror. But behind the terror, in the depths of his enormous eyes, you see something else: a flicker of terrible, reluctant respect. You looked. You survived. Most would not.</p>`,
        failOutcome: `<p>While Zann plays, lost in the music, you rise. You cross to the window. You pull the curtain aside.</p>
<p>You see it.</p>
<p>The void. The nothing that is not nothing. The darkness that breathes and watches and knows your name. It fills the window, fills your vision, fills your mind, and for a moment \u2014 a moment that lasts forever \u2014 you are not looking at the void. The void is looking at you.</p>
<p>Zann pulls you back. The curtain falls. You are on the floor. You do not remember falling. Your hands are shaking. Your vision is fragmented \u2014 the room seems to exist in pieces, like a broken mirror reassembling itself. The walls are where they should be but they do not feel solid. Nothing feels solid. The concept of solidity has become uncertain.</p>
<p>Zann is kneeling beside you, his face terrible with concern. He presses a glass of water into your hands. You drink. The water is real. The glass is real. You hold onto these facts like a drowning man holds a rope.</p>
<p class="thought">I looked into the void. The void looked back. And something \u2014 some thin membrane between my mind and the incomprehensible \u2014 has torn.</p>`
      },
      next: 's2_6'
    },
    {
      label: 'C',
      text: 'Leave the room before the music reaches its peak \u2014 you know your limits.',
      paragraph: 119,
      effects: { heard_music: 1 },
      outcome: `<p>You feel the music beginning to turn. You have heard it through the ceiling enough times to recognise the moment when Zann\u2019s playing shifts from exploration to desperation \u2014 the tempo quickening, the harmonies darkening, the boundary between music and something else beginning to dissolve.</p>
<p>You stand. Zann\u2019s eyes open. For a moment the music falters \u2014 a stumble in the bow, a discord in the strings \u2014 and in that moment the curtain surges forward, pressing against the glass with a sound like a held breath releasing.</p>
<p>Zann recovers. The music resumes, more urgently than before, and you retreat to the door. You do not run. You walk, deliberately, down the stairs to your room, and you close the door, and you sit on your bed in the dark.</p>
<p>Above you, the music continues. Through the ceiling you hear it reach its peak \u2014 a sustained, agonised crescendo that vibrates in the plaster and the joists and the very marrow of the house. Then it subsides. Then silence.</p>
<p class="thought">I was not strong enough. Or not wise enough. Not sure which. But I have learned something tonight: the music is not performance. It is combat. And Zann fights that battle every night, alone, at the top of the world, with nothing between him and the dark but a viol and thirty years of practice.</p>`,
      next: 's2_6'
    }
  ]
},


// ========================================================================
// SCENE 2.6 \u2014 THE WINDOW
// The confrontation with what lies beyond. The player must
// decide how to engage with the central mystery.
// SANITY TEST (immediate): looking through the window.
// Conditional text based on whether they've already glimpsed the void.
// ========================================================================
's2_6': {
  paragraph: 120,
  title: 'The Window',
  ambience: 'garret',
  audio: null,
  text: `<p>The morning after the performance, you find another note under your door.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Come again tonight. Before I play. There is something you must see for yourself. I cannot describe it. Language fails. But you must see.</div></div>`,
  exclusiveConditionals: [
    {
      check: 'knows_void >= 1',
      text: `<p>You have already seen. The memory of what lay beyond the glass \u2014 the void, the attention, the darkness that was not darkness \u2014 sits in your mind like a stone in a shoe. Inescapable. You are not sure what more there is to see. But Zann\u2019s note has the quality of an instruction, not a request.</p>`
    }
  ],
  defaultConditional: `<p>You have not yet seen what lies beyond the window. You have felt its cold through the curtain, heard the music that holds it back, sensed the pressure of something vast against the glass. But you have not looked. Tonight, Zann is asking you to look.</p>`,
  closingText: `<p>At ten o\u2019clock you climb the stairs. The garret door is open. Zann is standing by the window. The curtain is drawn, but his hand rests on the fabric, and in the candlelight you can see that the fabric is trembling from what presses against the other side.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He looks at you. His eyes are steady, though his hand is not. He gestures toward the window with his free hand, then makes a motion like opening a book \u2014 or a door. Will you see?</div></div>`,
  choices: [
    {
      label: 'A',
      text: 'Look through the window \u2014 you must know what Zann has been fighting.',
      audio: [
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.4, loop: true },
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.2, loop: true },
      ],
      paragraph: 121,
      effects: { dread: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -5 },
        successBonus: { knows_void: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> You look into the void and your mind bends but does not break. The experience is devastating, but you retain the ability to process it \u2014 to observe, to catalogue, to understand. This is what your training was for.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> The void exceeds your capacity to contain it. Your perception fractures, briefly but unmistakably, and the world reassembles itself with a hairline crack running through it that will never fully heal. <em>Sanity reduced by 5.</em></div>`,
        successOutcome: `<p>Zann draws the curtain aside, just enough. A gap of perhaps two feet, revealing the glass.</p>
<p>You look.</p>
<p>Beyond the glass there is no city wall. No sky. No familiar darkness. What you see is an absence: of space, of light, the darkness of a place where the concept of illumination has never existed. It extends in all directions without boundary, without feature, without the landmarks by which a human mind orients itself.</p>
<p>And it is not empty.</p>
<p>There is something there. An awareness. A vast, patient, formless intelligence that exists in the void: native to it, part of it, inseparable from the medium in which it moves.</p>
<p>It knows you are looking. You feel its attention shift, a sensation like the movement of a searchlight across a landscape, sweeping, focusing, finding you. For one vertiginous instant you see yourself from the outside \u2014 a small, warm, temporary thing, pressed against a pane of glass at the edge of a universe that is itself merely a bubble in the void\u2019s immensity.</p>
<p>Zann closes the curtain. You step back. The room returns. You are breathing hard.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Now you see. Now you know why I play.</div></div>
<p class="thought">I see. The window does not open onto the city. It opens onto what lies beyond the city, beyond the world. And Zann\u2019s desperate, nightly music is the only thing that keeps it from opening wider.</p>`,
        failOutcome: `<p>Zann draws the curtain aside. You look.</p>
<p>The void.</p>
<p>It hits you like a physical force. Your mind, trained to analyse and categorise, reaches for its tools and finds them useless. There is nothing here to analyse. Nothing to categorise. Only the abyss, and the abyss\u2019s awareness of you.</p>
<p>Your vision blurs. The room tilts. You feel something inside your head: a stretching, the container of your consciousness being forced to accommodate something too large for it. The boundaries flex. Something cracks.</p>
<p>Zann pulls the curtain closed. You are on your knees. When did you fall? The room is spinning, or you are spinning, or the distinction between the two has temporarily lost its meaning.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I am sorry. But you had to see. You had to know what the music holds back.</div></div>
<p class="thought">I have looked into the void. And the void has looked into me. And something between those two acts of looking has been irrevocably changed.</p>`
      },
      next: 's2_7'
    },
    {
      label: 'B',
      text: 'Ask Zann to describe what he sees \u2014 let his experience mediate yours.',
      paragraph: 122,
      effects: { knowledge: 1, zann_trust: 1 },
      outcome: `<p>You shake your head. Not in refusal, but in caution.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Not yet. Tell me what you see. Write it down. Let me understand before I look.</div></div>
<p>Zann stares at you for a several seconds. Then, his expression softens. You are being careful. He appreciates careful.</p>
<p>He sits at the table. He takes his pen. And he writes.</p>
<p>It takes a long time. He writes and crosses out and writes again, his pen pressing so hard it occasionally tears the paper. You sit in the second chair and wait, and the curtain stirs, and the garret is very quiet.</p>
<p>When he is done, he slides the paper across to you. It is covered in dense, cramped writing, and you read it with the same attention you would give to a primary source in your studies \u2014 slowly, carefully, letting each sentence settle before moving to the next.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Beyond the window there is no city. No world. Nothing you would recognise. It is a darkness, but not the darkness of night. It is the darkness that existed before light was possible. Before space was possible. Before time. It is the original state of things, the state to which all things wish to return. And in that darkness there is something aware. Not alive \u2014 alive requires a beginning and an end, and this has neither. It simply is. It has always been. It will always be. And it presses against the window because the window is a wound in its surface \u2014 a place where our world, which should not exist, has broken through into the void like a splinter in flesh. The music soothes the wound. When I play, the void accepts the intrusion. When I stop, it tries to close the wound. And if the wound closes, everything on this side \u2014 the street, the city, perhaps the world \u2014 goes with it.</div></div>
<p>You read it twice. Then a third time. The words are clear, the logic terrible.</p>
<p class="thought">The world is a wound in the void. The music keeps the wound open. Without the music, the wound heals, and reality is swallowed. A most terrifying cosmology, with an awful ring of truth.</p>`,
      next: 's2_7'
    },
    {
      label: 'C',
      text: 'Refuse to look \u2014 some things should not be seen.',
      paragraph: 123,
      effects: { zann_trust: -1, suspicion: -1 },
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">No. I don\u2019t need to see it. I believe you. I\u2019ve felt it through the ceiling, through the curtain, through the music. I know it\u2019s real. But I don\u2019t need to look.</div></div>
<p>Zann\u2019s hand falls from the curtain. His expression is complex \u2014 disappointment and relief woven together so tightly you cannot separate them. He wanted you to see. He is glad you will not.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He nods. Slowly, heavily. He lets the curtain fall back into place and secures it with trembling hands \u2014 straightening the fabric, smoothing it flat, checking the edges where it meets the frame. A ritual. A nightly ritual, performed thousands of times.</div></div>
<p>He sits down and writes.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Perhaps you are wiser than I was. I looked, thirty years ago, and I have never been the same. The looking changed me. It made me what I am \u2014 the player, the guardian, the fool who sits in a garret and fiddles against the dark. If you do not look, you can still leave. You can still forget.</div></div>
<p class="thought">He is offering me an exit. A way out, while one exists. But, I will not take it. Not yet. I am in too deep. The music has entered me, and the questions have taken root. Whatever mercy ignorance might offer, it no longer offers a retreat.</p>`,
      next: 's2_7'
    }
  ]
},


// ========================================================================
// SCENE 2.7 \u2014 THE MANUSCRIPT
// Zann begins writing his confession. The history of his vigil,
// the nature of the void, instructions for what must be done.
// ========================================================================
's2_7': {
  paragraph: 124,
  title: 'The Manuscript',
  ambience: 'garret',
  audio: [
    { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.05, loop: true },
    { src: 'House_on_the_Hill-clock_loop.ogg', volume: 0.03, loop: true },
  ],
  text: `<p>Something has shifted between you. The garret is no longer Zann\u2019s secret, it is a secret you share. You visit most evenings now, arriving before ten, sitting in the second chair while Zann prepares for his nightly vigil. Sometimes you talk and he writes, and together you construct a dialogue from speech and paper and gesture.</p>
<p>And he has begun, at last, to write the manuscript.</p>
<p>The one he has been putting off for years, perhaps decades. The confession. The explanation. The record of everything he knows about the window and the void and the music that stands between them.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I have put this off too long. If something happens to me \u2014 and something will happen, eventually \u2014 the knowledge must survive. You are the first person in thirty years who has stayed long enough to receive it.</div></div>
<p>He writes in the evenings, in the hour before he must play. The manuscript grows page by page, night by night, a document that begins as autobiography and becomes cosmology and ends as instruction manual. You read each page as he produces it, and the picture that emerges is more terrible and more coherent than anything you imagined.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Read the manuscript carefully \u2014 absorb every detail he offers.',
      audio: [
        { src: 'House_on_the_Hill-heartbeat_loop.ogg', volume: 0.3, loop: true },
      ],
      paragraph: 125,
      effects: { knowledge: 2, has_manuscript: 1 },
      outcome: `<p>You read with the attention of a scholar. Each page is a revelation.</p>
<p>Zann came to the Rue d\u2019Auseil thirty, maybe forty, years ago; he is no longer certain. He was already old. He had been a musician all his life, playing in theatre orchestras across Germany and France, possessed of a talent that was remarkable but not extraordinary. He came to this city because it was cheap and because the theatre needed a viol player. He took the garret because it was the cheapest room in the cheapest house.</p>
<p>On his first night, he looked through the window. The city wall was visible, and beyond it, the sky. Normal. Unremarkable.</p>
<p>On his second night, the sky was different. Darker. Deeper. The stars had moved, or multiplied, or been replaced by something that resembled stars the way a mirror resembles the face it reflects.</p>
<p>On the third night, the sky was gone. And the void was there. And the void was looking at him.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">From the Manuscript</div><div class="dialog-text">I played. I did not know what else to do. I played a Bach partita \u2014 the music I knew best, the music that felt safest. And as I played, the void retreated. Not much. But enough. The window remained a window. The glass held. And I understood, in that moment, that the music was the barrier. That without it, the void would enter. And I have played every night since.</div></div>
<p>The manuscript describes the decades that followed. The gradual refinement of the music \u2014 the discovery that certain frequencies and harmonics were more effective than others. The modification of the viol. The development of the notation system. The slow, terrible accumulation of knowledge about what lies on the other side of the glass.</p>
<p class="thought">Thirty years. Every night. One man, one instrument, one window. The weight of it is staggering. And the most terrible part is this: he has found no solution. No way to close the window permanently. The music is a holding action, a nightly reprieve. The void is patient. The void will wait.</p>`,
      next: 's2_8'
    },
    {
      label: 'B',
      text: 'Help him write \u2014 ask questions, organise his thoughts, fill in the gaps.',
      audio: [
        { src: 'House_on_the_Hill-house_rattle.ogg', volume: 0.03, loop: false },
      ],
      paragraph: 126,
      effects: { knowledge: 1, has_manuscript: 1, zann_trust: 1 },
      outcome: `<p>You sit beside him at the table and you work. He writes, and when his descriptions become confused or incomplete \u2014 as they often do, the memories surfacing in fragments rather than sequences \u2014 you ask questions. You organise. You give his terror a structure.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">When did you first modify the viol? Before or after you discovered the notation system?</div></div>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">After. The notation came first \u2014 the understanding that certain patterns of sound affected the void more than others. Then I realised the viol as built could not produce all the necessary frequencies. So I added strings. Retuned. Rebuilt.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">And the void \u2014 does it change? Does it learn?</div></div>
<p>Zann\u2019s pen stops. He stares at the page. Then he writes, very slowly.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Yes. It learns. Thirty years ago, a simple melody was enough. Now I must play for hours. The patterns must be more complex, more intense. It adapts. It tests the music, searching for weaknesses. One day the music will not be enough. I do not know what happens then.</div></div>
<p>The manuscript, with your help, becomes something remarkable: a rigorous document, half autobiography and half cosmological treatise, written in the precise, desperate prose of a man who knows his time is running out.</p>
<p class="thought">I am helping him build a record, a testament. And I cannot shake the feeling that I am also helping him write his will.</p>`,
      next: 's2_8'
    },
    {
      label: 'C',
      text: 'Ask him about the possibility of closing the window permanently.',
      paragraph: 127,
      effects: { knowledge: 1, has_manuscript: 1 },
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Is there a way to seal it? The window. Not just hold it back, but close it for good?</div></div>
<p>Zann sets down his pen. He sits very still for a long time. The candles gutter. The curtain stirs. When he finally writes, the words come slowly, each one considered.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I have thought about this for thirty years. I believe it is possible. The notation \u2014 the manuscript \u2014 contains the theory. If the right sequence were played, at the right moment, with sufficient force, the window could be sealed. The wound in the void healed from this side.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Then why haven\u2019t you done it?</div></div>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Because the sequence requires what I cannot give. I am old. My hands are not what they were. The sequence demands precision and endurance beyond what one player can sustain. I have tried. Twice. Both times the void nearly broke through while I was attempting the seal. I nearly died. The house nearly fell. I dare not try again alone.</div></div>
<p>He looks at you. The meaning is clear, and terrifying.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">But with two players \u2014 one to maintain the barrier while the other plays the sealing sequence \u2014 it might be possible.</div></div>
<p class="thought">Two players. One of whom would need to be me. A student of metaphysics who has never touched a viol, being asked to help seal a wound between worlds. The absurdity of it is exceeded only by the necessity.</p>`,
      next: 's2_8'
    }
  ]
},


// ========================================================================
// SCENE 2.8 \u2014 THE STREET AT NIGHT
// Exploring the Rue d'Auseil alone after dark. The street changes.
// Strange encounters. The nature of the place.
// LUCK TEST (immediate): determines the encounter.
// ========================================================================
's2_8': {
  paragraph: 128,
  title: 'The Street at Night',
  subtitle: 'The Rue d\u2019Auseil',
  ambience: 'night',
  audio: [
    { src: 'Olde_Towne-crickets_loop.ogg', volume: 0.1, loop: true },
    { src: 'Olde_Towne-light_rain_loop.ogg', volume: 0.1, loop: true },
  ],
  text: `<p>You cannot sleep. The knowledge that Zann has poured into you over these past days sits in your mind like a fever, hot and restless, demanding movement. The garret, the manuscript, the void, the music: it is too much to hold in a small room with a thin mattress and a window that looks onto brick.</p>
<p>You take your coat and step out into the Rue d\u2019Auseil.</p>
<p>The street is different at night. You have noticed this before, but tonight the difference is more pronounced. Or perhaps your perception, sharpened by everything you have learned, is finally acute enough to register what was always there.</p>
<p>The gradient is steeper. You are certain of this. The cobblestones tilt at an angle that was not present in daylight, the street almost adjusting its posture for the hours of darkness. The buildings lean further inward. The gas lamps burn with a amber light that casts no warmth and very little illumination, creating pools of pallor between stretches of shadow so dense you could reach into them and feel them resist.</p>
<p>The city is totally quiet, with the absolute, pressurised silence of a sealed room. Even the wind, which is always present on this steep and narrow street, has stopped. The air is still. Waiting.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Walk to the top of the street, as high as it goes.',
      paragraph: 129,
      effects: { dread: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { knowledge: 1 },
        failPenalty: { sanity: -1, dread: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Luck \u2014 Success!</strong> Fortune guides your steps. At the top of the street you find something remarkable \u2014 something that illuminates the nature of this place.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck \u2014 Failed.</strong> The street does not want you at its summit tonight. What you find there is not a revelation but a warning. <em>Sanity reduced by 1.</em></div>`,
        successOutcome: `<p>You climb. The street rises and rises, past Blandot\u2019s house, past the last gas lamp, into a darkness that the city has abandoned. The cobblestones become rougher, older, and the buildings give way to walls of ancient stone; the city wall itself, or what remains of it.</p>
<p>At the very top, where the street should end at a wall or a gate or a dead end, you find something else. A gap. A place where the wall has crumbled, or was never complete, and through the gap you can see \u2014</p>
<p>The city. But not from above. From beside. The view through the gap shows the rooftops of the city stretching away at the same level as the street, as though the Rue d\u2019Auseil, despite its relentless upward climb, has arrived at exactly the place it began. The geometry is impossible. The street has climbed for hundreds of metres and reached its own starting point.</p>
<p>You stand in the gap and look at the city\u2019s rooftops, and you understand something about the Rue d\u2019Auseil that the concierge\u2019s words only hinted at. The street is not part of the city. It is folded into the city \u2014 a crease in the fabric of the place, a wrinkle in space where something that should not exist has been tucked away, like a secret stitched into the lining of a coat.</p>
<p class="thought">The street is a fold. A hidden dimension. It exists because the void requires a point of contact with the world, and the world has obligingly provided one \u2014 a narrow, steep, forgettable street that slips between the pages of reality like a forgotten bookmark.</p>`,
        failOutcome: `<p>You climb. The street steepens. The buildings fall away. The darkness deepens.</p>
<p>At the top, the street ends at a wall. Blank stone. No gate, no gap, no passage. Just a wall, and on the wall, in the faint amber light of the last gas lamp, a shape.</p>
<p>It is not a shadow. Shadows are cast by objects, and there is no object here to cast this one. The shape is on the wall like a stain in fabric: part of it, embedded in it, as though whatever cast the shadow did so with such force that the shadow became permanent.</p>
<p>The shape is human. Or was. It stands upright, arms slightly raised, head tilted, listening to something above and behind it. And as you look at it, you feel certain that the shape is looking back at you. With the imprint of eyes of someone who had stood on this spot and was reduced to a mark on a wall.</p>
<p>You descend rapidly. Your heart is hammering. The shape on the wall stays with you all the way down, burned into your mind.</p>
<p class="thought">Someone else climbed to the top of this street. Someone else looked. And whatever they found there left nothing but a shadow.</p>`
      },
      next: 's2_9'
    },
    {
      label: 'B',
      text: 'Try to leave the Rue d\u2019Auseil and return. Test whether you can find it again.',
      paragraph: 130,
      effects: {},
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { rue_memory: 1 },
        failPenalty: { dread: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Luck \u2014 Success!</strong> Against all odds, you find your way back. The street permits your return \u2014 this time.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck \u2014 Failed.</strong> The street resists you. Finding your way back takes far too long and leads through places that should not exist.</div>`,
        successOutcome: `<p>You walk downhill. You count the turnings. Left past the pharmacie, right at the fountain, through the dog-leg where the buildings narrow. You emerge into the wider city: a square you recognise, a caf\u00e9 still lit. The real world. Normal streets, normal buildings, normal sky.</p>
<p>You stand for a moment, breathing, letting the ordinariness of it settle your nerves. Then you turn around and retrace your steps.</p>
<p>The lane is there. The narrow, steep opening between buildings, climbing into darkness. You enter it, and the Rue d\u2019Auseil receives you back with its characteristic indifference. The same cobblestones. The same leaning buildings. The same gas lamps marking a path into the dark.</p>
<p>You have found it. You have left and returned. This should be reassuring, but it is not. You have the distinct impression that the street allowed it, that it chose to be found again, and that its reasons for doing so are not yours.</p>
<p class="thought">I can find the street. For now. But I am not foolish enough to believe this will always be the case. The Rue d\u2019Auseil is not a place you find. It is a place that finds you. And one day it may choose not to.</p>`,
        failOutcome: `<p>You walk downhill. You count the turnings, note the landmarks, fix the route in your mind with all the discipline your training provides.</p>
<p>You emerge into \u2014 where? Not the square you expected. Not the caf\u00e9, not the market, not any part of the city you recognise. A narrow street, yes, but not the right one. The buildings are wrong. The lamps are wrong. The sky is wrong: too low, too dark, the stars arranged in patterns you have never seen.</p>
<p>You walk for twenty minutes. Thirty. The streets loop and double back. You pass the same shuttered window three times. The city has become a maze, and you are a rat being led through corridors designed by something that finds your confusion amusing.</p>
<p>When you finally find the Rue d\u2019Auseil again \u2014 recognise its gradient, its leaning buildings, its gas lamps \u2014 it is from an angle you have never approached before. You are entering from the top, looking down. You did not climb. The street has simply rearranged itself to put you where it wants you.</p>
<p>You descend to Blandot\u2019s house in silence. Your hands are shaking. The clock in the hallway tells you an hour has passed. It felt like ten minutes, or a lifetime. Both.</p>
<p class="thought">One cannot find this street. It finds you. And whatever logic governs its geography, it is not the logic of cartography or Euclidean space. It is the logic of what lies behind the window.</p>`
      },
      next: 's2_9'
    },
    {
      label: 'C',
      text: 'Walk the street slowly and listen. What does it sound like when Zann is not playing?',
      audio: [
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.2, loop: true },
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.3, loop: true },
        { src: '09_Part_Fratres_Cello.mp3', volume: 0.3, loop: false },
      ],
      paragraph: 131,
      effects: { knowledge: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { knowledge: 1 },
        failPenalty: { dread: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Luck \u2014 Success!</strong> The street shares its secrets with you tonight. What you hear in the silence between the buildings is a gift, and a burden.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck \u2014 Failed.</strong> What you hear is not a gift. The street\u2019s silence has teeth.</div>`,
        successOutcome: `<p>You walk slowly, listening. Your footsteps on the cobblestones are the only human sound. But the street has its own sounds, and tonight, in the deep silence before Zann\u2019s nightly performance, they are more audible than ever.</p>
<p>The wind. Not the street-level wind but a higher, thinner stream of air, moving above the rooftops, carrying a sound you cannot quite identify. It is rhythmic. Almost musical. The air almost remembering the music played here every night and is humming it back, faintly.</p>
<p>You stop at a point where the street widens slightly \u2014 a small cobbled space between buildings, barely large enough for two people to stand side by side. And you hear it clearly. The street is resonating. The stones, the walls, the timber frames of the buildings \u2014 they are all vibrating at a frequency below hearing, a sub-audible note that you feel in the soles of your feet and the palms of your hands.</p>
<p>The entire Rue d\u2019Auseil is an instrument. Zann\u2019s viol plays it every night, and the music sinks into the stone and the wood and the air, and the street remembers, and the street plays back.</p>
<p class="thought">The street is part of the barrier. Not just the window, or the music, but the street itself \u2014 its impossible geometry, its steep and narrow climb, its refusal to appear on any map. It is all one mechanism, one vast instrument tuned to a single purpose: to stand between the world and what wants to unmake it.</p>`,
        failOutcome: `<p>You walk slowly, listening. The silence presses in. It is not passive \u2014 it is predatory, the silence of a space that has swallowed sound and is hungry for more.</p>
<p>And then you hear it.</p>
<p>Not the music \u2014 Zann has not yet begun to play. What you hear is a sound from the other end of the street. The top, where the buildings give way to the city wall. A sound that should not be possible in a place with no visible source.</p>
<p>It is like a voice \u2014 inasmuch the void is to darkness, or a predator is to its prey. The voice speaks in no language. It is simply sound arranged in patterns that suggest meaning without delivering any, and the patterns change, shifting and reorganising, trying different configurations, searching for one that will connect.</p>
<p>The sound stops. The silence returns. And from far above, very faintly, Zann\u2019s viol begins to play \u2014 urgently: has he has heard it too and is answering before the speaker can try again?</p>
<p class="thought">Something spoke. From the top of the street, from beyond the wall, from the void. It spoke, and the silence carried its words, and Zann heard it and began to play. The nightly ritual is not prevention. It is response. The void calls, and the music answers.</p>`
      },
      next: 's2_9'
    }
  ]
},


// ========================================================================
// SCENE 2.9 \u2014 THE VIOL
// Mini-game: musical pattern-matching. Zann teaches you to play.
// Engine delegates to ViolGame.start() if viol_game.js is loaded;
// falls through to s2_10 automatically if not.
// State effects (played_viol, zann_trust, dread, knowledge) are
// applied by the ViolGame module based on score.
// ========================================================================
's2_9': {
  type: 'minigame',
  game: 'viol_game',
  paragraph: 132,
  title: 'The Viol',
  ambience: 'garret',
  audio: null,
  next: 's2_10'
},


// ========================================================================
// SCENE 2.10 \u2014 WHAT ANSWERS
// The void responds to the music. Something changes. The barrier
// is tested, and the consequences are felt.
// SANITY TEST (immediate): high stakes \u2014 witnessing the void's response.
// ========================================================================
's2_10': {
  paragraph: 136,
  title: 'What Answers',
  ambience: 'garret',
  audio: [
    { src: '02_Part_Fratres_Violin.mp3', volume: 0.2, loop: false },
    { src: '09_Part_Fratres_Cello.mp3', volume: 0.1, loop: false },
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.2, loop: true },
  ],
  text: `<p>It happens on a Thursday. You are in the garret, sitting in your chair, watching Zann play. The music tonight is different. More tentative. Zann is searching for something in the sound, a phrase or a frequency he cannot quite locate.</p>
<p>His hands are unsteady. You have noticed this more and more in recent days \u2014 a tremor in the bow arm, a fractional hesitation before each phrase. He is tired. He has been tired for thirty years, and the years have finally begun to collect their debt.</p>
<p>The music stutters. A note goes wrong; imprecise, the frequency a fraction off its mark. Zann grimaces and corrects, but the damage is done. In the gap between the wrong note and the correction, something happens.</p>
<p>The curtain over the window bulges. It presses inward, toward the room, as before, a wall-sized hand placed flat against the glass and is pushing. The fabric strains. The wooden curtain rod groans.</p>
<p>And the room fills with a frequency below hearing, below feeling, that vibrates in the empty spaces of your body: the sinuses, the lungs, the chambers of the heart. The candles dim. The shadows in the corners of the garret deepen, thicken, take on a weight and a substance they should not possess.</p>
<p>Zann plays harder. Faster. His eyes are closed, his face a mask of concentration and fear. The viol screams and the curtain bulges and the darkness pushes in and the barrier between here and there thins to nothing \u2014</p>`,
  choices: [
    {
      label: 'A',
      text: 'Stay at Zann\u2019s side \u2014 lend whatever strength you can.',
      audio: [
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.2, loop: false },
      ],
      paragraph: 137,
      effects: { dread: 1, committed_to_stay: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -3 },
        successBonus: { zann_trust: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> The void presses against your mind and your mind holds. You are terrified, but you do not break. Your presence steadies Zann. Your companionship, in this extremity, is worth more than music.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> The void breaches your defences. The darkness enters you \u2014 not through your eyes or your ears but through the spaces between your thoughts, filling the gaps with something cold and formless and aware. You feel yourself dissolving at the edges. <em>Sanity reduced by 3.</em></div>`,
        successOutcome: `<p>You grip the arms of your chair. You neither move nor speak. But your presence is a tether, a dimensional anchor in a room that is warping into multitudes.</p>
<p>The curtain bulges. The darkness presses. You feel the void\u2019s attention on you: a weight, a pressure, a vast and patient curiosity that is neither hostile nor benign but simply <em>interested</em>, as a scientist is in a specimen on a slide.</p>
<p>You endure it. You sit in the dark and the cold and the impossible sound, and you endure.</p>
<p>Zann finds the note he was searching for. The viol strikes a frequency that resonates through the room like a hammer striking a bell, and the curtain shudders and falls back and the darkness retreats and the candles flare and the room is a room again. Small, shabby, human, with two frightened men sitting in it.</p>
<p>Zann lowers the bow. He is weeping. You have never seen him weep before. The tears are silent; they run down his grey cheeks and into his beard. He reaches out and grips your hand, and the grip is fierce and desperate and grateful beyond words.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">You stayed. No one has ever stayed.</div></div>`,
        failOutcome: `<p>You try to stay. You grip the chair and you try.</p>
<p>But the void is stronger than your grip. The darkness presses into the room and into you, and the boundary between the two dissolves. You feel it \u2014 the cold, the absence, the awareness \u2014 not outside you but <em>inside</em>, filling the spaces between your thoughts, occupying the empty rooms of your mind.</p>
<p>Your vision fractures. The room splits into layers \u2014 the garret you know, and behind it, visible through the cracks, something else. A space without dimension. A darkness without end. You see the room from two perspectives simultaneously: from your chair, and from the void, looking in.</p>
<p>Then Zann strikes the note. The frequency shakes the room like an earthquake. The darkness contracts. The vision snaps back to unity. You are in the chair. You are yourself. But the boundaries are thinner now, and you can feel the void\u2019s attention lingering on you like a handprint on cold glass.</p>
<p>Zann is weeping. He grips your hand. You grip back, and the warmth of human contact is the most real thing in the world.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I am sorry. I am so sorry. It should not have come that close. I am failing.</div></div>`
      },
      next: 's2_11'
    },
    {
      label: 'B',
      text: 'Help Zann \u2014 if you have learned anything from the viol, use it now.',
      paragraph: 138,
      effects: { dread: 1, vowed_to_help: 1 },
      condition: 'played_viol >= 1',
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -2 },
        successBonus: { played_viol: 1, zann_trust: 2 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> You hold the viol and the music flows through you \u2014 imperfect, rough, but present. The barrier strengthens. Zann\u2019s face transforms with astonished hope. Two voices. Two instruments. The void retreats.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> You try to play but the void\u2019s proximity overwhelms you. The music that emerges is wrong \u2014 discordant, fractured. It weakens the barrier rather than strengthening it. <em>Sanity reduced by 2.</em></div>`,
        successOutcome: `<p>You move before you think. You take the second viol, the old one, the practice instrument Zann keeps in the wardrobe, and you place it against your chest and you draw the bow.</p>
<p>The sound you produce is crude. Rough. A child\u2019s first attempt compared to Zann\u2019s thirty years of mastery. But the frequency is there \u2014 the holding note, the one Zann taught you, the vibration that speaks to the barrier in its own language.</p>
<p>The effect is immediate. The curtain, which was straining inward, shudders and pulls back. The darkness in the corners of the room thins. Zann\u2019s eyes fly open and he stares at you with an expression of stunned, incredulous hope.</p>
<p>Two instruments. Two voices. The barrier doubles in strength, and the void \u2014 for the first time \u2014 <em>retreats</em>.</p>
<p>You play together for five minutes, or fifty \u2014 time has no meaning in this room tonight. Your arms ache. Your fingers bleed. But the music holds, and the darkness withdraws, and when Zann finally plays the closing phrase, the silence that follows is not the silence of something waiting. It is the silence of something that has, for now, accepted defeat.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Two players. It works. The manuscript was right. Two can hold what one cannot. There is hope.</div></div>`,
        failOutcome: `<p>You grab the practice viol and try. God help you, you try.</p>
<p>But the void is too close, the fear too great, and the sound that comes from your bow is not music but panic. A scraping, squalling discord that clashes with Zann\u2019s playing and opens gaps in the barrier that should not be there.</p>
<p>The curtain surges inward. Zann shouts a wordless sound, and plays harder, faster, compensating for your failure with sheer force of will.</p>
<p>You set down the viol. Your hands are shaking. The room steadies, slowly, as Zann\u2019s music reasserts control.</p>
<p>When it is over, Zann looks at you. There is no anger in his face. Only the exhaustion of a man who has hoped for help and received, instead, one more thing to carry.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">It is not your fault. The proximity of the void makes everything harder. We will try again. When it is quieter. When there is more time.</div></div>`
      },
      next: 's2_11'
    },
    {
      label: 'C',
      text: 'Try to close the window physically \u2014 force it shut.',
      paragraph: 139,
      effects: { dread: 2 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -2 },
        successBonus: { window_sealed: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> Your hands find the window frame and hold. The void pushes back, but you push harder, and the physical act of resistance \u2014 human muscle against cosmic force \u2014 buys Zann the time he needs.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> You touch the window and the void touches you back. The cold that enters your hands is not physical cold \u2014 it is the cold of contact with something that exists outside the boundaries of temperature and sensation. <em>Sanity reduced by 2.</em></div>`,
        successOutcome: `<p>You lunge for the window. The curtain billows around you, cold and heavy, and your hands find the window frame. The glass is vibrating, shaking, and through it you can feel the pressure of the void, pushing, testing, searching for a way in.</p>
<p>You push back. You brace your feet against the floor and your hands against the frame and you push with everything you have. The cold enters your fingers, your wrists, your forearms; a spreading numbness that threatens to reach your heart. But you hold.</p>
<p>Behind you, Zann plays. The music is desperate, frantic, but it is focused now: aimed, like a weapon, at the window, at the barrier, at the void that is trying to breach it. And between your physical resistance and his musical resistance, the barrier holds.</p>
<p>The pressure eases. The glass stills. The cold retreats from your hands, leaving them numb and tingling. You step back from the window, gasping, and the curtain falls back into place.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">You held the window. Physically. I have never seen anyone do that. The frame \u2014 the inscriptions I carved into the wood \u2014 they recognised your touch. You have become part of the barrier.</div></div>`,
        failOutcome: `<p>You reach for the window. Your hands find the frame.</p>
<p>The cold hits you instantly \u2014 a cold of absolute absence, from a place where warmth is <em>impossible</em>. It races up your arms like fire in reverse, numbing everything it touches, and with the numbness comes a vision \u2014</p>
<p>You see yourself from outside the window. A microscopic figure, hands pressed against glass, in a minute room, in a miniscule house, on a tiny street, in a small city, on a planet, in a universe so insignificant, so fragile, so temporary, that the void regards it the way one might a soap bubble.</p>
<p>Zann pulls you away. The vision shatters. You are on the floor, your hands aching with a cold that will not fully leave them for days. The window is intact. The curtain falls back. The music continues.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Do not touch the window. Not directly. The inscriptions protect the frame, but the glass is the void\u2019s territory. You cannot fight it with your hands. Only with sound.</div></div>`
      },
      next: 's2_11'
    }
  ]
},


// ========================================================================
// SCENE 2.11 \u2014 THE TRUTH
// Piecing it all together. The player must decide what they believe
// and what they intend to do. Sets up Act 3.
// ========================================================================
's2_11': {
  paragraph: 140,
  title: 'The Truth',
  ambience: 'night',
  audio: null,
  text: `<p>It is very late. The music has ended. The candles in the garret have burned down to stubs, their light thin and unsteady. Zann sits in his chair, the viol across his knees, his head bowed. He is at the end of his strength, sustained by nothing but habit and terror and a stubbornness that borders on the sacred.</p>
<p>You sit across from him. Between you, the manuscript pages are spread across the table; thirty years of knowledge, distilled into ink and paper. The notation. The theory. The history of a one-man war against the dissolution of everything.</p>
<p>The window is quiet. The curtain hangs still. Beyond the glass, the void waits with the patience of something that has no concept of time.</p>`,
  conditionals: [
    {
      check: 'played_viol >= 1',
      text: `<p>Your hands still ache from the viol. The strings left red lines on your fingers: wounds that have not yet decided whether to bleed. You can still feel the vibration in your bones, the echo of the frequency that spoke to the barrier in its own language.</p>`
    },
    {
      check: 'knows_void >= 1',
      text: `<p>You have seen what lies beyond the window. The memory sits in your mind like an uninvited guest: present, permanent, impossible to ignore. The void. The attention. The vast, formless awareness that regards your universe with cold, absolute nothingness.</p>`
    },
    {
      check: 'window_sealed >= 1',
      text: `<p>Your hands still carry the cold of the window frame. The inscriptions Zann carved into the wood recognised your touch, he said. You have become part of the barrier. The thought is as terrifying as it is oddly comforting.</p>`
    }
  ],
  closingText: `<p>Zann raises his head and looks at you. His eyes, enormous behind the thick spectacles, are asking a question that his pen has not yet written. But you know what it is. You have known it for days.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">What will you do? You know the truth now. You know what I am. What this place is. What presses against the glass every night. You can leave \u2014 walk down the Rue d\u2019Auseil and never come back, and perhaps you will forget, in time, what you have seen. Or you can stay. And help me fight.</div></div>
<p>He sets down the pen. He waits.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Stay. Commit to helping Zann \u2014 whatever it takes.',
      paragraph: 141,
      effects: { committed_to_stay: 1, vowed_to_help: 1, zann_trust: 2 },
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I\u2019m staying. I\u2019ll help. I don\u2019t know if I can learn the music, or hold the window, or do any of the things you need. But I am not going to leave you alone with this.</div></div>
<p>Zann\u2019s expression settles: a release, as though a weight that has been pressing on him for thirty years has shifted, just slightly, but enough.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He reaches across the table and takes your hand. His grip is firm. His hand is cold, as it always is, but the coldness is human coldness \u2014 the cold of poor circulation and old age and a garret that never warms. Not the other cold. Not the void\u2019s cold.</div></div>
<p>He writes one more note. The last note of the evening. The last note of the life you have known until now.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Thank you. We begin tomorrow. There is much to learn, and I fear there is very little time.</div></div>
<p class="thought">I have chosen. Not from courage \u2014 I am not sure I possess that. From something else. From the recognition that some doors, once opened, cannot be closed by walking away from them. I have seen the void. You have heard the music. I have held the window against the dark. I am part of this now, and the only way through is forward.</p>`,
      next: 'a2_close'
    },
    {
      label: 'B',
      text: 'Accept the truth but do not promise to stay \u2014 you need to think.',
      paragraph: 142,
      effects: { knowledge: 1 },
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I believe you. Everything you\u2019ve shown me, everything I\u2019ve seen \u2014 I believe it. But I can\u2019t promise to stay. I need time. I need to think about what this means.</div></div>
<p>Zann nods. There is no disappointment in his face this time; only understanding. He is a man who has spent thirty years thinking about what this means, and he knows that the thinking never ends.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Think, then. But do not think too long. I can feel it growing stronger. The music that held it back last year is not enough this year. The window strains more. The void presses harder. Something is coming, and it is coming soon.</div></div>
<p>You descend to your room. You sit at your desk and you open your private notebook and you write. Not the philosophical arguments of your academic work, but something rawer \u2014 a record of what you know, what you have seen, what you believe. A parallel manuscript, your own version of Zann\u2019s thirty years of accumulated truth.</p>
<p>You write until dawn. The music plays above you, and for the first time, you hear it not as a mystery but as a message. A plea. A prayer. An old man, playing for his life and yours and everyone\u2019s, alone at the top of the world, and pleading with every note, phrase, and impossible harmonic, for help.</p>
<p class="thought">I will stay. I know this, even as I tell myself that I am undecided. The truth has its own gravity, and I am already falling.</p>`,
      next: 'a2_close'
    },
    {
      label: 'C',
      text: 'Plan an escape \u2014 take the manuscript and leave the Rue d\u2019Auseil.',
      paragraph: 143,
      effects: { has_manuscript: 1, zann_trust: -2 },
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Give me the manuscript. The full manuscript \u2014 the notation, the theory, everything. I\u2019ll take it to the university. There are people there who study this kind of thing \u2014 not the void, not specifically, but the mathematics of it, the physics. If the information survives, someone else can carry the fight.</div></div>
<p>Zann stares at you. The hope drains from his face like water from a cracked vessel.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">You would leave? Take the knowledge and go? The manuscript is nothing without the music, and the music is nothing without a player. Paper cannot hold back the void. Only sound. Only this viol, in this room, played by someone who understands.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">And when you die? When your hands fail for the last time and the music stops? What then? Someone else needs to know. The world needs to know.</div></div>
<p>Zann closes his eyes. When he opens them again, the terror is still there, but it is joined by something older and sadder. Resignation.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Take what you need. Copy the key pages. But do not take the originals \u2014 I need them for the sealing sequence. And understand this: even if you leave, the Rue d\u2019Auseil will find you again. It always does. The street does not forget its tenants.</div></div>
<p>You spend the rest of the night copying. Your hand cramps. Your eyes burn. But by dawn you have a sheaf of papers \u2014 the essential notation, the key frequencies, the cosmological theory that underlies the music. A portable version of Zann\u2019s thirty years of knowledge.</p>
<p class="thought">I have the knowledge. I have an exit strategy. But Zann\u2019s words echo: <em>the street does not forget its tenants.</em> I am not leaving. I am being allowed to believe I can leave. And the distinction may prove to be everything.</p>`,
      next: 'a2_close'
    }
  ]
},


// ========================================================================
// ACT 2 CLOSE
// ========================================================================
'a2_close': {
  type: 'act_close',
  paragraph: 144,
  title: 'End of Act Two',
  ambience: 'night',
  audio: null,
  text: `<p>The last candle dies. Zann\u2019s garret falls into darkness. The window is the only point of reference; a rectangle of deeper dark, a frame around the absolute, stirring faintly with the pulsing of something.</p>
<p>You descend the stairs in the dark. Each step takes you further from the garret, further from the void, further from the old man who sits alone with his viol and his terror and his fragile, inexhaustible courage. Each step takes you closer to your room, your bed, the thin pretence of normality that dawn will bring.</p>
<p>But you carry the truth with you now. You carry it in the ache of your hands and the ringing in your ears and the cold that has not entirely left your fingers since you touched the window frame.</p>`,
  conditionals: [
    {
      check: 'committed_to_stay >= 1',
      text: `<p>You have promised to stay. To fight. The promise seals you: invisible, inescapable, permanent. Whatever comes next, you will face it in the garret, at the old man\u2019s side, with the viol\u2019s voice between you and the dark.</p>`
    },
    {
      check: 'has_manuscript >= 1',
      text: `<p>The manuscript pages rustle in your coat pocket. Thirty years of knowledge, folded and pressed against your chest. Whether they represent hope or hubris, you cannot yet say.</p>`
    }
  ],
  closingText: `<p>Outside, the Rue d\u2019Auseil is silent. The gas lamps burn with their greenish-yellow pallor. The buildings lean. The cobblestones gleam. And somewhere, very far above the rooftops, the city wall, the sky, the void watches, and waits, and remembers the silence between the notes.</p>
<div class="scene-break"></div>`,
  next: 'a3_title',
  nextActLabel: 'Act Three'
}

};
