// --- ACT 1 SCENES DATA ---
// THE RUE D'AUSEIL
// Eight scenes: arrival, discovery of the street, Blandot's house,
// settling in, first night, meeting Zann, the overture, first understanding.
// Skill tests: Perception (1.2, 1.5), Luck (1.3), Sanity (1.7)
const ACT1_SCENES = {

// ============ TITLE ============
'title': {
  type: 'title'
},

// ============ CHARACTER CREATION ============
'chargen': {
  type: 'chargen'
},

// ============ ACT 1 TITLE ============
'a1_title': {
  type: 'act_title',
  actNum: 'Act One',
  actName: 'The Rue d\u2019Auseil',
  ambience: 'street',
  audio: [
    { src: 'Olde_Towne-crickets_loop.ogg', volume: 0.4, loop: true },
    { src: 'Olde_Towne-dogs_barking.ogg', volume: 0.1, loop: false },
    { src: 'Olde_Towne-light_rain_loop.ogg', volume: 0.2, loop: true }
  ],
  next: 's1_1'
},


// ========================================================================
// SCENE 1.1 - THE SEARCH
// The player arrives in the city, broke and hunting for lodgings.
// Establishes tone, setting, the sense of a city that is not quite right.
// ========================================================================
's1_1': {
  paragraph: 1,
  title: 'The Search',
  ambience: 'street',
  audio: [
    { src: 'Olde_Towne-crickets_loop.ogg', volume: 0.4, loop: true },
    { src: 'Olde_Towne-dogs_barking.ogg', volume: 0.1, loop: false },
    { src: 'Olde_Towne-church_bell.ogg', volume: 0.04, loop: false }
  ],
  text: `<p>You have been walking for hours. The streets of this quarter are narrow and steep, and the misty dusk clings to the buildings like soot. The last scraps of daylight form a thin orange line above the rooftops, and below it the city is a jumble of shadow and lamplight.</p>
<p>For three days now you have been searching for lodgings. The university term begins next week, and the modest sum remaining to you after tuition will not stretch to the boarding houses near the campus, where students with better fortunes take their rooms. Always evicted for want of money, you need somewhere cheaper.</p>
<p>Your studies are in metaphysics \u2014 a subject that earns you no money and considerable suspicion. The philosophy of what lies beyond the physical. It is a discipline that attracts a certain kind of mind, and you are unsure whether that reflects well on you or not.</p>
<p>The quarter you have wandered into is unfamiliar. The buildings lean toward one another overhead, narrowing the sky to a ragged strip. Gas lamps burn at irregular intervals, their light a sickly yellow that makes the wet cobblestones twitch and shimmer like the hide of some lost, washed-up leviathan. You passed a caf\u00e9 some streets back, and a church with boarded windows, but now there is only the press of old tenements and shuttered shops.</p>
<p class="thought">So tired. Feet ache. Can\u2019t go on much further.</p>
<p>But some instinct \u2014 or perhaps stubbornness \u2014 keeps you walking.</p>
<p>Ahead, the street forks. To the left, a broader avenue slopes gently downhill toward what might be a market square. To the right, a lane so narrow you could touch both walls with outstretched arms, climbs steeply into darkness.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Take the narrow lane uphill. Follow your instinct into the dark.',
      paragraph: 2,
      effects: { dread: 1 },
      outcome: `<p>You take the narrow lane, which climbs steeply. The cobblestones are old and uneven, worn smooth in the centre. The walls on either side are close enough to brush your shoulders. Above you, the buildings lean further still, their upper storeys almost touching, and the strip of sky narrows to a thread.</p>
<p>You pass a doorway of ancient timber: iron-studded, with a number you cannot read in the gloom. Then another. The gas lamps are fewer here, and their light more uncertain. One flickers as you pass, as if startled.</p>
<p class="thought">This is a street that wants to be forgotten. Like a turning in a dream that evaporates into somewhere else entirely.</p>`,
      next: 's1_2'
    },
    {
      label: 'B',
      text: 'Take the broader avenue downhill. A market square means people, and lodgings.',
      paragraph: 3,
      effects: {},
      outcome: `<p>You take the avenue. It is the sensible choice. Where there is commerce, there is someone willing to trade a bed for a few coins.</p>
<p>But the avenue disappoints. The market square, when you reach it, is closed and dark \u2014 nothing but empty stalls and an abandoned fountain. From the rim of a horse trough, a cat watches you, capturing you with a blink.</p>
<p>You circle the square. One street leads to a dead end. Another doubles back the way you came. A third descends toward a canal where the reek of standing water is thick, soupy; catching the back of your throat.</p>
<p>It is only as you turn back, defeated, that you notice it. A lane you are certain was not there before \u2014 narrow, steep, climbing away from the square into darkness.</p>
<p class="thought">I walked past this spot twice already. There was no lane here. I\u2019m sure of it. Almost.</p>
<p>You take it.</p>`,
      next: 's1_2'
    },
    {
      label: 'C',
      text: 'Ask a passer-by for directions to cheap lodgings.',
      paragraph: 4,
      effects: { knowledge: 1, knows_street_name: 1 },
      outcome: `<p>A woman passes, wrapped in a black shawl, hurrying against the chill. You raise a hand.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Pardon madame \u2014 I\u2019m looking for lodgings. Somewhere inexpensive. Can you direct me?</div></div>
<p>She stops. Her eyes pin you; an insect to a card.</p>
<div class="dialog-box"><div class="dialog-speaker">Woman</div><div class="dialog-text">Lodgings? Cheap ones? Up. Always up.</div></div>
<p>She points toward a lane that climbs steeply away from the street \u2014 narrow, dark, barely wide enough for a cart.</p>
<div class="dialog-box"><div class="dialog-speaker">Woman</div><div class="dialog-text">Rue d\u2019Auseil. There\u2019s a house halfway up. Blandot\u2019s.</div></div>
<p>Before you can thank her, she is gone \u2014 swallowed by the dusk that has been waiting for her. You look at the lane. It climbs into shadow.</p>
<p class="thought">Rue d\u2019Auseil. Never heard the name. Not on the map I bought at the station, nor in the university\u2019s directory.</p>
<p>But a name is more than you had five minutes ago.</p>`,
      next: 's1_2'
    }
  ]
},


// ========================================================================
// SCENE 1.2 - THE STREET
// The Rue d'Auseil itself - unnaturally steep, strange, wrong.
// PERCEPTION TEST (deferred): can you fix this place in your memory?
// ========================================================================
's1_2': {
  paragraph: 5,
  title: '{{if knows_street_name >= 1}}The Rue d\u2019Auseil{{else}}The Nameless Street{{/if}}',
  ambience: 'street',
  audio: [
        { src: 'Film_Noir-traffic_distant_loop.ogg', volume: 0.1, loop: true },
        { src: 'Olde_Towne-church_bell.ogg', volume: 0.03, loop: true },
        { src: 'Olde_Towne-dogs_barking.ogg', volume: 0.05, loop: true }
      ],
  text: `<p>The street climbs with a malicious obstinacy, as if the cobblestones resent your presence and are tilting away from you. You lean into the gradient, your calves burning.</p>
<p>The buildings on either side are ancient, and not gracefully \u2014 more a stubborn, hostile endurance. They lean toward one another across the narrow gap, their upper storeys jutting out on blackened timber frames, and above them the sky is a frayed, dark blue, pricked with early stars.</p>
<p>No two houses are alike. One has a door painted dark green, almost black. Another has shutters that hang at impossible angles. A third has windows of thick, warped glass that bends and distorts the light within, as if through water.</p>
<p>There are no street signs. No numbers that follow any sequence you can determine. The gas lamps, where they exist, are older than any you have seen in the city \u2014 wrought iron, encrusted with black grime.</p>
<p>You pass a wall on which someone has scratched, in a hand both hasty and precise, a single word you cannot translate. Below it, a date: 1734.</p>
<p class="thought">How steep is this street?</p>
<p>The buildings are taller here, the spaces between them narrower. You can no longer see the avenue below. When you look back, the lower part of the street seems to have curved, shifted, hiding its origin.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Try to fix the route in your memory. Count turnings, note landmarks.',
      paragraph: 6,
      effects: {},
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { rue_memory: 1 },
        failPenalty: { dread: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> You  fix on the details: the scratched word on the wall, the house with the dark green door, the lamp with the cracked glass. You count the turnings. Left from the fork, straight past the sealed fountain, a dog-leg where the street narrows further. You could retrace this. You think. You hope.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> You try to note the turnings, but the street resists you. Each landmark, the moment you pass it, seems to lose its distinctness, the details draining away even as you fix upon them. You are not confident you could find this place again.</div>`
      },
      outcome: `<p>You slow your pace and try to be methodical. This is what your studies have taught you, if nothing else \u2014 observation, attention, the disciplined recording of phenomena. You note the turnings. You count the houses. You look for landmarks: the green door, the scratched inscription, a gargoyle on a drainpipe whose face has eroded into something worse than blankness.</p>
<p>But even as you catalogue these things, you feel a strange resistance: the street itself is pushing back against your attempts to map it. The proportions keep shifting. A house you are certain you passed two minutes ago appears again on your left, or seems to. The gradient changes without warning.</p>
<p class="thought">This is not a street that wants to be remembered.</p>`,
      next: 's1_3'
    },
    {
      label: 'B',
      text: 'Press on quickly. Find a boarding house before nightfall.',
      paragraph: 7,
      effects: { dread: 1 },
      outcome: `<p>You quicken your pace. The street is steeper now, and your footsteps echo oddly; a fraction too late, as if the sound has travelled further than the walls should allow. Full dark is coming, and this is not a quarter in which to be lost at night.</p>
<p>The buildings thin slightly. You pass what might once have been a shop \u2014 the window display holds nothing but dust and a single shoe, child-sized, placed in the centre of the empty case. Further on, a doorway stands open, revealing a passage that recedes into total blackness.</p>
<p>You do not look down that passage for more than a moment. The darkness within has an almost positive quality, with substance, texture and intent.</p>
<p class="thought">Keep walking. Find a boarding house. The rest can wait until morning.</p>`,
      next: 's1_3'
    },
    {
      label: 'C',
      text: 'Stop and listen. What sounds does this street make?',
      paragraph: 8,
      effects: { knowledge: 1 },
      audio: [
        { src: 'Bleakwater_Docks-dock_creaks_loop.ogg', volume: 0.4, loop: true },
        { src: 'Bleakwater_Docks-footsteps_ambient_loop.ogg', volume: 0.3, loop: true }
      ],
      outcome: `<p>You stop. You stand in the middle of {{if knows_street_name >= 1}}the Rue d\u2019Auseil{{else}}the street{{/if}}, and you listen.</p>
<p>The city beyond is still audible as a low, distant murmur. But it is muffled here, as if a behind a curtain. The sounds that remain are the street\u2019s own.</p>
<p>Wind \u2014 different to that in the streets below. This is a thinner, higher sound, as if the air is being drawn upward through a flue. It rises and falls with an almost musical rhythm.</p>
<p>Creaking. The old timber frames of the houses, perhaps, settling against one another. Or perhaps footsteps in an upper room, or the slow turning of a handle, or the sound a furtively opened door.</p>
<p>And beneath it all, a low vibration \u2014 a tremor in the stone beneath your feet, a slow breathing from deep below.</p>
<p class="thought">There is something here. The street is not just old, it\u2019s alive in some way, and it knows I am standing on it.</p>`,
      next: 's1_3'
    }
  ]
},


// ========================================================================
// SCENE 1.3 - BLANDOT'S HOUSE
// Meeting the landlord. Taking a room.
// LUCK TEST: which floor? High luck = fifth floor, near Zann.
// ========================================================================
's1_3': {
  paragraph: 9,
  title: 'Blandot\u2019s House',
  ambience: 'boarding_house',
  audio: [
    { src: 'House_on_the_Hill-door_knock.ogg', volume: 0.3, loop: false },
    { src: 'Bleakwater_Docks-footsteps_ambient_loop.ogg', volume: 0.4, loop: true }
  ],
  text: `<p>You reach a house with a dark, wooden sign, cracked and weathered, on which the words <em>Chambres \u00e0 louer</em> are barely legible. Rooms to let. The building is taller than its neighbours \u2014 remarkable on a street on which every house seems to be straining upward, as if trying to escape its own foundations. Five storeys, possibly six. The upper floors are lost in darkness.</p>
<p>The door is answered by a man with trembling hands. His left eye weeps continuously. A few strands of colourless hair are combed across a crusty scalp. But his right eye is sharp, and it fixes on you with the practised assessment of a man used to judging whether strangers can pay.</p>
{{if knows_street_name == 0}}
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I\u2019m sorry to bother you monsieur. I seem to be lost. Can you tell me which street this is?</div></div>
<p>The man mutters something inaudible, and starts to close the door.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Wait, please! I need a room, I can pay.</div></div>
<p>The man pauses.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Rue d\u2019Auseil. I am Blandot. I may have a room.</div></div>
{{else}}
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">A room, is it?</div></div>
{{/if}}
<p>His voice is a dry rasp, like a boot on gravel. He does not invite you in. He stands in the doorway and waits.</p>`,
  choices: [
    {
      label: 'A',
      text: 'State your business plainly.',
      paragraph: 10,
      effects: { knows_street_name: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { dread: 1, player_room_floor: 'fifth' },
        failPenalty: { sanity: 1, player_room_floor: 'third' },
        successText: `<div class="skill-result success"><strong>Test Your Luck \u2014 Success!</strong> Fortune smiles, or perhaps grimaces. Blandot has a room on the fifth floor \u2014 the topmost occupied storey. It is cheap because no one wants to climb that many stairs. You will take it. You do not yet know what lives above you.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck \u2014 Failed.</strong> The only room available is on the third floor \u2014 small, damp, with a window that looks onto a wall. It will do.</div>`,
        successOutcome: `<p>You state your case. Student. Metaphysics. One term, possibly two. You can pay in advance for the first month.</p>
<p>Blandot considers this with the gravity of a magistrate weighing a death sentence. Then he nods \u2014 a single, grudging inclination of his trembling head.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Fifth floor. The room at the back. It\u2019s the cheapest I have.</div></div>
<p>He leads you inside and up. The staircase is narrow, dark, and smells of boiled cabbage and something older \u2014 damp plaster, perhaps, or the accumulated breath of decades. Each landing is lit by a single lamp dimmed so low it barely illuminates the numbers on the doors. Third floor. Fourth floor. Fifth.</p>
<p>Your room is small but clean enough. A bed, a desk, a chair, a basin. One window, looking out onto a grimy brick wall that belongs to the building next door. The ceiling is low, and the floorboards creak with every step.</p>
<p>Above you, one more floor. The sixth. You hear nothing from it now. But the ceiling seems very thin.</p>
<p class="thought">The fifth floor. The top of the house, or nearly. Only one storey between me and whatever occupies the garret above. Not sure I like that.</p>`,
        failOutcome: `<p>You state your case. Student. Metaphysics. One term, possibly two. You can pay in advance for the first month.</p>
<p>Blandot considers this with the gravity of a magistrate weighing a death sentence. Then he nods.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Third floor. It\u2019s what I have.</div></div>
<p>He leads you inside and up. The staircase is narrow, dark, and smells of boiled cabbage and something older \u2014 damp plaster, perhaps, or the accumulated breath of decades. Each landing is lit by a single lamp dimmed so low it barely illuminates the numbers on the doors.</p>
<p>Your room is small but adequate. A bed, a desk, a chair, a basin. One window, looking out onto a wall of grimy brick. The ceiling is low, and the floorboards creak underfoot.</p>
<p>Above you \u2014 two more floors, at least. You hear nothing from them. The house seems very quiet for its size.</p>
<p class="thought">The third floor. Somewhere in the middle of things. Could be a good thing, maybe?</p>`
      },
      next: 's1_4'
    },
    {
      label: 'B',
      text: 'Ask about the other tenants.',
      paragraph: 11,
      effects: { knowledge: 1, suspicion: 1, knows_street_name: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { dread: 1, player_room_floor: 'fifth' },
        failPenalty: { player_room_floor: 'third' },
        successText: `<div class="skill-result success"><strong>Test Your Luck \u2014 Success!</strong> Your questions irritate Blandot, but fortune favours you \u2014 the room he offers is on the fifth floor. Cheap, because of the stairs. Close, because of what lives above.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck \u2014 Failed.</strong> Your questions irritate Blandot. He offers the third floor \u2014 take it or leave it.</div>`,
        successOutcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">How many tenants do you have? What sort of people?</div></div>
<p>Blandot\u2019s weeping eye narrows. His good eye goes flat.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Quiet ones. I don\u2019t suffer noise. I don\u2019t suffer questions, neither.</div></div>
<p>He tells you nothing useful. A few tenants, long-term. A clerk. A woman who works nights. He does not elaborate. His manner suggests that curiosity is, in this house, is misbehaviour.</p>
<p>He takes you to the fifth floor. The room is small but clean enough. A bed, a desk, a chair, a basin. One window onto brick.</p>
<p>Above you \u2014 one more floor. You ask about it.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">The garret? That\u2019s Zann. He keeps to himself. Plays in a theatre orchestra. You won\u2019t be troubled.</div></div>`,
        failOutcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">How many tenants do you have? What sort of people?</div></div>
<p>Blandot\u2019s weeping eye narrows. His good eye goes flat.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Quiet ones. I don\u2019t suffer noise. I don\u2019t suffer questions, neither.</div></div>
<p>He takes you to the third floor. The room is adequate. A bed, a desk, a chair, a basin. Above you, the house rises on, floor after floor, into silence.</p>`
      },
      next: 's1_4'
    },
    {
      label: 'C',
      text: 'Accept whatever is offered.',
      paragraph: 12,
      effects: { knows_street_name: 1 },
      skillTest: {
        stat: 'luck',
        deferResult: false,
        successBonus: { dread: 1, player_room_floor: 'fifth' },
        failPenalty: { player_room_floor: 'third' },
        successText: `<div class="skill-result success"><strong>Test Your Luck \u2014 Success!</strong> As it happens, the cheapest room is also the highest \u2014 the fifth floor, where no one else wants to climb. One floor below the garret.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Luck \u2014 Failed.</strong> You are given the third floor. Cheap, damp, and far from whatever secrets the upper storeys hold.</div>`,
        successOutcome: `<p>You do not haggle. You do not ask questions. You have learned, in these lean months, that pride is a luxury you can no longer afford.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I\u2019ll take whatever you have.</div></div>
<p>Blandot\u2019s expression shifts, easing; your lack of resistance has earned you a small, grudging approval.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Fifth floor. Cheapest in the house. The stairs keep the price down.</div></div>
<p>He leads you up. Five flights. The staircase grows darker and narrower with each floor, the treads more worn, the walls closer. By the fifth landing you are breathing hard, and you begin to feel that the building is swallowing you up.</p>
<p>The room is small. A bed, a desk, a chair, a basin. One window onto nothing but brick. Above you, one more floor. The ceiling is very thin.</p>`,
        failOutcome: `<p>You do not haggle. You do not ask questions.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I\u2019ll take whatever you have.</div></div>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Third floor.</div></div>
<p>He leads you up. Three flights. The staircase is dark, the treads worn smooth. Your room is adequate. A bed, a desk, a chair, a basin. The house rises above you, floor after floor, into silence.</p>`
      },
      next: 's1_4'
    }
  ]
},


// ========================================================================
// SCENE 1.4 - THE ROOM
// Settling in. Exploring your surroundings. Establishing routine.
// ========================================================================
's1_4': {
  paragraph: 13,
  title: 'The Room',
  ambience: 'boarding_house',
  audio: [
    { src: 'House_on_the_Hill-door_open.ogg', volume: 0.3, loop: false },
    { src: 'Bleakwater_Docks-footsteps_ambient_loop.ogg', volume: 0.4, loop: true },
    { src: 'House_on_the_Hill-clock_loop.ogg', volume: 0.1, loop: true }
  ],
  text: `<p>You set down your bag. The room accepts you the way a coat accepts a new owner \u2014 without enthusiasm, without objection. The bed is hard but not intolerable. The desk is steady. The window admits a grey light that will serve for reading, if you press close enough.</p>
<p>You unpack what little you have. Books, mostly. Your notes from last term. A change of clothes. A pen and ink. No luxuries. You arrange the books on the desk and stand back to regard them.</p>
<p class="thought">This is my life, then. Reduced to a single shelf. Metaphysics and the margins.</p>
<p>The building is quiet. You can hear, if you concentrate, the distant sounds of other lives: a door closing somewhere below, the scrape of a chair, a muffled cough. But these sounds are remote, filtered through many walls and floors, and they serve only to emphasise the silence of your own room.</p>
<p>It is late. You have been walking all day. There is time for one thing before sleep.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Explore the building.',
      paragraph: 14,
      effects: { knowledge: 1 },
      outcome: `<p>You leave your room and walk the corridors. The house is larger than it first seemed. Or perhaps it just feels that way, as some buildings do at night, when shadows fill in the spaces between walls and the proportions stretch.</p>
<p>The hallways are narrow and dimly lit. Doors line them at irregular intervals, each one identical: dark wood, brass number, silence behind. You count them. Five rooms on each floor, plus a shared water closet at the end of each corridor.</p>
{{if player_room_floor == 'fifth'}}
  <p>You head downstairs.</p>
{{else}}
  <p>You head upstairs.</p>
{{/if}}
<p>On the fourth floor you pass a door that is slightly ajar. Through the gap you see a sliver of candlelight and the edge of a desk piled high with papers. A man sits at the desk with his back to you, motionless. He might be sleeping, or reading, or simply sitting. You do not disturb him.</p>
<p>You {{if player_room_floor == 'fifth'}}return{{else}}climb{{/if}} to the fifth floor{{if player_room_floor == 'fifth'}} \u2014 your own{{/if}}. And then you look upward. A final flight of stairs, narrower than the rest, leads to a single door at the top. The garret.</p>
<p>The door is shut. No light shows beneath it. But as you stand there, looking up, you become aware of a faint vibration in the banister beneath your hand, as if the house itself is humming at a frequency too low to hear.</p>
<p class="thought">Someone lives up there. And whatever they do behind that door, the house can feel it.</p>`,
      next: 's1_5'
    },
    {
      label: 'B',
      text: 'Sit at the desk and study. You have fallen behind in your reading.',
      paragraph: 15,
      effects: {},
      outcome: `<p>You sit at the desk and open your books. The gaslight is poor \u2014 a thin, wavering flame that turns the pages the colour of old bone \u2014 but you have read in worse conditions. You are behind on your Kant, and the term begins in a week.</p>
<p>For a time, the work absorbs you. The <em>Critique of Pure Reason</em>, the architecture of thought, the boundaries of human knowledge. You take notes in your careful hand, filling the margins with questions. <em>What lies beyond the categories of understanding? What is the thing-in-itself?</em></p>
<p>But as the hour deepens, your concentration frays. The silence of the building presses in. It is not the comfortable silence of a library \u2014 it is the silence of a held breath, a pause between sounds that have not yet arrived.</p>
<p>You close your book. You sit in the dim room and listen. Nothing. The house is still. But the stillness has a quality to it \u2014 an expectancy \u2014 that keeps you listening longer than you intend.</p>
<p class="thought">Kant asks: what can we know? Tonight, in this room, on this impossible street, the question feels less academic than usual.</p>`,
      next: 's1_5'
    },
    {
      label: 'C',
      text: 'Go out for food. You have not eaten since morning.',
      paragraph: 16,
      effects: { suspicion: 1 },
      outcome: `<p>Your stomach reminds you that philosophy does not fill it. You take your coat and go out.</p>
<p>The Rue d\u2019Auseil is different at night. The steep gradient, which was merely strange in the dusk, is now actively hostile \u2014 the cobblestones slick with a moisture that might be dew or might be something else, the shadows between the buildings so dense they seem solid. You descend carefully, one hand trailing along the wall.</p>
<p>At the foot of the street you find a small caf\u00e9, still lit, where a silent woman serves you bread and soup. The soup is thin but hot. You eat, and you watch the street through the window.</p>
<p>When you have finished and step outside, you look back up the Rue d\u2019Auseil. From here, at its foot, it rises into darkness. The buildings on either side are black shapes leaning inward. The gas lamps are faint yellow stars, irregularly spaced, marking a path that seems to lead away from the knowable world.</p>
<p class="thought">Standing here, if I turned away now and walked home by another route, I would never find this street again.</p>
<p>The certainty is irrational, and absolute. You climb back up.</p>`,
      next: 's1_5'
    }
  ]
},


// ========================================================================
// SCENE 1.5 - THE FIRST NIGHT
// Hearing Zann's music for the first time - distant, faint, strange.
// PERCEPTION TEST (deferred): can you discern the music's quality?
// ========================================================================
's1_5': {
  paragraph: 17,
  title: 'The First Night',
  ambience: 'night',
  audio: [
    { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.1, loop: true },
    { src: 'Bleakwater_Docks-footsteps_ambient_loop.ogg', volume: 0.2, loop: true },
    { src: 'House_on_the_Hill-clock_loop.ogg', volume: 0.1, loop: true },
    { src: 'House_on_the_Hill-house_rattle.ogg', volume: 0.05, loop: true }
  ],
  text: `<p>You are in bed. The sheets are rough, the mattress thin. Sleep, which should have come easily after so much walking, does not come at all. You lie in the dark and listen to the house.</p>
<p>It breathes. That is the only word for it. The old timber frame expands and contracts with the changing temperature, performing a prelude of creaks and groans and sighs. The walls tick. The floorboards whisper. Somewhere, a pipe gurgles.</p>
<p>And then you hear music.</p>
<p>It {{if player_room_floor == 'third'}}seems to come from two floors{{else}}comes from{{/if}} above. From the garret. From behind the door at the top of the last flight of stairs. It is faint \u2014 so faint that at first you mistake it for the wind, or for the ringing in your fatigued ears. But as you lie still and concentrate, the sound resolves itself, and you understand that what you are hearing is an instrument. A stringed instrument. Something with the resonance of a cello but higher, thinner, more human in its register.</p>
<p>A viol.</p>
<p>The music is unlike anything you have heard. It does not follow a melody you can hum, nor a rhythm you can tap. It seems to move and extend through spaces that exist between the notes.</p>
<p>It is both beautiful and terrible.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Listen carefully. Try to understand what you are hearing.',
      paragraph: 18,
      effects: { heard_music: 1 },
      audio: [
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
        { src: 'Film_Noir-sting_harp.ogg', volume: 0.1, loop: true },
        { src: 'Film_Noir-sting_orchestral.ogg', volume: 0.1, loop: true },
      ],
      skillTest: {
        stat: 'perception',
        deferResult: true,
        successBonus: { knowledge: 1 },
        successText: `<div class="skill-result success"><strong>Test Your Perception \u2014 Success!</strong> You catch something in the music that a less attentive listener would miss: it is not merely a performance. It is a conversation. The viol speaks, and something \u2014 you cannot tell what \u2014 answers. The response is not audible, exactly, but you can hear the musician adjusting, reacting, playing against a partner you cannot perceive.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Perception \u2014 Failed.</strong> The music is strange and beautiful, but its deeper nature eludes you. You hear only the surface \u2014 the melody, if it can be called that \u2014 and not whatever lies beneath.</div>`
      },
      outcome: `<p>You lie still. You close your eyes and open your mind to the sound, the way your professors have taught you to open your mind to a philosophical proposition \u2014 receiving it without judgement, letting it fill the available space.</p>
<p>The music is in no key you recognise. The intervals between the notes are wrong: not dissonant, but <em>other</em>, from a scale without any relation to music you have heard before. And yet it is not random. There is structure here, rigorous and complex, like a mathematical proof expressed in sound.</p>
<p>You listen for a long time. The music rises and falls, pauses and resumes. At times it is so quiet you can barely distinguish it from the silence. At other times it fills the room, fills your skull, vibrates in the bones of your chest. Once, for a moment, you feel certain that the music is not coming from above at all, but from inside you \u2014 as if your own body has become the instrument, resonating with frequencies it was not built to contain.</p>
<p class="thought">Who is this genius? What are they playing? And who \u2014 or what \u2014 are they playing it for?</p>`,
      next: 's1_6'
    },
    {
      label: 'B',
      text: 'Try to sleep through it. It is late, and you are exhausted.',
      paragraph: 19,
      effects: { heard_music: 1 },
      audio: [
        { src: 'Bleakwater_Docks-dark_tone_loop.ogg', volume: 0.4, loop: true },
        { src: 'Film_Noir-sting_harp.ogg', volume: 0.1, loop: true },
        { src: 'Film_Noir-sting_orchestral.ogg', volume: 0.1, loop: true },
      ],
      outcome: `<p>You pull the thin pillow over your head and try to ignore the music. You are tired. You have been walking all day, and the mattress, for all its faults, is better than the bench at the railway station where you spent the previous night. Sleep should be easy.</p>
<p>But the music will not let you go. It threads through the fabric of the pillow, through the bones of your skull, into the place where thoughts become dreams. You drift toward sleep and the music follows: softening, deepening, becoming less like sound and more like the memory of sound.</p>
<p>You sleep. And in your sleep, you dream of a window that opens onto nothing. Not darkness \u2014 nothing. An absence so complete it has its own colour, its own sound, its own weight. The music plays on, and in the dream you understand that it is holding the nothing at bay. That without it, the nothing would pour in and fill everything, and that <em>everything</em> would cease to be a meaningful word.</p>
<p>You wake before dawn. The music has stopped. The dream is already fading, but the feeling remains \u2014 a cold hollow in your chest, as if something has been removed.</p>`,
      next: 's1_6'
    },
    {
      label: 'C',
      text: 'Get up and investigate.',
      paragraph: 20,
      effects: { heard_music: 1, dread: 1 },
      audio: [
        { src: 'Bleakwater_Docks-dark_tone_loop.ogg', volume: 0.4, loop: true },
        { src: 'Film_Noir-sting_harp.ogg', volume: 0.1, loop: true },
        { src: 'Film_Noir-sting_orchestral.ogg', volume: 0.1, loop: true },
      ],
      outcome: `<p>You cannot lie still. The music pulls at you with an almost physical force, tugging at the edge of your attention. You rise, wrap yourself in your coat, and open the door.</p>
<p>The corridor is dark. The gas lamp on this landing has been turned off, or has gone out on its own. 
{{if player_room_floor == 'third'}}
  <p>You climb up to the fifth floor and along the corridor.</p>
{{/if}}
<p>You feel your way to the staircase and look up.</p>
<p>The final flight of stairs rises into blackness. The door at the top is closed, but a thin line of light \u2014 not gaslight, something colder, more uncertain \u2014 shows beneath it. The music is much louder here. It resonates in the stairwell, the narrow walls concentrating and amplifying the sound until it seems to come from everywhere at once.</p>
<p>You climb three stairs. Four. Five. The music intensifies with each step, and with it comes a feeling of proximity to something vast, as if you are approaching not merely a door but an edge, beyond which the familiar rules of the world no longer apply.</p>
<p>On the seventh step you stop. Your hand is on the banister. The wood is vibrating.</p>
<p>You go no further. Not tonight. But you stay on that step for a long time, listening, and the music plays on above you until the sky begins to lighten and the sounds of the waking city seep back into the stairwell and the music, very slowly, stops.</p>`,
      next: 's1_6'
    }
  ]
},


// ========================================================================
// SCENE 1.6 - THE OLD MAN
// First encounter with Erich Zann on the stairs. He is descending
// to his evening work at the theatre orchestra. He is old, gaunt,
// grey-bearded, and mute.
// ========================================================================
's1_6': {
  paragraph: 21,
  title: 'The Old Man',
  ambience: 'boarding_house',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: 'Film_Noir-music_dark_city_loop.ogg', volume: 0.1, loop: true },
  ],
  text: `<p>Three days pass. You attend the university, take your lectures, return to the Rue d\u2019Auseil in the evenings. Each night the music plays. Each night it is different, and each night it is the same \u2014 strange, beautiful, and faintly, insistently, wrong.</p>
<p>You have asked Blandot about the musician. He offered you nothing but a shrug and a name.</p>
<div class="dialog-box"><div class="dialog-speaker">Blandot</div><div class="dialog-text">Zann. He\u2019s been here longer than I have. Pays his rent. Keeps to himself. That\u2019s all I know, and all I care to know.</div></div>
<p>On the fourth evening, as you climb the staircase to your room, you encounter him.</p>
<p>He is descending from the garret, viol case in hand. He is older than you expected, with gaunt frame and untrimmed, grey beard. He wears a long, dark coat, buttoned high. Pale blue eyes, enormous behind thick spectacles, fix upon you.</p>
<p>You step aside to let him pass on the narrow staircase. He pauses. You look at each other.</p>
<p>He opens his mouth. No sound comes out. He closes it again. His hand moves \u2014 a small, uncertain gesture, reaching for a word and finding nothing there.</p>
<p class="thought">He is mute. The old man cannot speak.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Smile and nod \u2014 a neighbourly greeting, no words needed.',
      paragraph: 22,
      effects: { zann_trust: 1 },
      outcome: `<p>You smile. A simple thing \u2014 the small, unremarkable courtesy of two people passing on a staircase. You incline your head in greeting.</p>
<p>Zann regards you for a moment. His expression is difficult to read \u2014 there is wariness in it, fatigue, and perhaps relief. Then he nods. A single, curt inclination of his head, and he continues past you, descending the stairs with the careful, measured tread of a man for whom each step is an act of will.</p>
<p>You watch him go. The viol case is old and battered, its leather scarred and stained. He holds it protectively against his chest.</p>
<p>At the foot of the stairs he pauses and looks back at you for a moment. Then he turns and is gone, swallowed by the dark hallway.</p>
<p class="thought">There was something in that look. Neither hostility nor welcome. More like an appraisal: perhaps deciding whether I am dangerous, or merely unfortunate.</p>`,
      next: 's1_7'
    },
    {
      label: 'B',
      text: 'Compliment his playing. You have heard the music, and it is extraordinary.',
      paragraph: 23,
      effects: { zann_trust: -1, suspicion: 1 },
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Forgive me \u2014 I live on {{if player_room_floor == 'fifth'}}the floor below{{else}}the third floor{{/if}}. I have heard you playing at night. It is\u2026 extraordinary.</div></div>
<p>The effect is immediate and alarming.</p>
<p>Zann\u2019s face, which had been merely guarded, undergoes a transformation. The colour drains from it. His eyes widen behind the thick spectacles. His free hand comes up in a sharp, warding gesture \u2014 palm outward, fingers spread, deflecting you.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He shakes his head violently. His hand chops the air \u2014 no, no, no. He presses a finger to his lips, then gestures downward, toward the lower floors. His meaning is unmistakable: do not speak of this. Not here. Not ever.</div></div>
<p>He pushes past you on the staircase with surprising strength for so frail a man, and descends rapidly, his coat flapping, the viol case clutched tight. He does not look back.</p>
<p class="thought">I have frightened him. The mention of his music has produced a terror so immediate that I feel I have committed an act of cruelty.</p>`,
      next: 's1_7'
    },
    {
      label: 'C',
      text: 'Observe him silently. Watch how he moves, what he carries, how he holds himself.',
      paragraph: 24,
      effects: { knowledge: 1 },
      outcome: `<p>You say nothing. You step aside, let him pass, and watch. Your studies have given you the discipline of recording what you see without rushing to interpret it.</p>
<p>He is older than he first appears. The gauntness of his frame is not merely thinness but a kind of reduction: the years have pared away everything inessential and left only what is required to exist. His hands are large for his frame: strong, with long, callused fingers that grip the viol case with a certainty the rest of his body lacks.</p>
<p>His coat is old but well-maintained. The collar is worn to a shine. The buttons are mismatched; replaced, one at a time, over many years. His shoes are polished, the heels worn at an angle that suggests he favours his left leg.</p>
<p>He descends the stairs with care, placing each foot precisely, as if the staircase were his instrument that might produce an unwanted note if struck carelessly.</p>
<p>At the bottom he turns, and his eyes meet yours. They are extraordinary: almost colourless, like windows, magnified by the thick lenses. They hold yours for some time, reading you the way you have just read him \u2014 cataloguing details, filing observations, deciding.</p>
<p class="thought">This is a sharp man. Frightened, perhaps. Old, certainly. But sharp. Whatever he does in that garret, he does it with full knowledge of what it means.</p>`,
      next: 's1_7'
    }
  ]
},


// ========================================================================
// SCENE 1.7 - THE OVERTURE
// Hearing Zann play from just outside his door. The music is
// extraordinary, unsettling, physically affecting.
// SANITY TEST (immediate): can you endure the first close hearing?
// ========================================================================
's1_7': {
  paragraph: 25,
  title: 'The Overture',
  ambience: 'garret_music',
  audio: [
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.4, loop: true },
    { src: 'Bleakwater_Docks-dark_tone_loop.ogg', volume: 0.2, loop: true },
    { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.1, loop: true },
    { src: '07_Part_Fratres_String_Quartet.mp3', volume: 0.3, loop: true },
  ],
  text: `<p>It is past midnight. You cannot sleep. The music has started again, but tonight it is different \u2014 louder, more urgent, with a quality of desperation you have not heard before. The viol is not being played but <em>driven</em>, forced through passages it was never built to contain.</p>
<p>You feel compelled to rise. You put on your coat.</p>
<p>You climb the final flight of stairs.</p>
<p>Outside Zann\u2019s door, the music is overwhelming. It fills the narrow landing, pressing against the walls, the floor, the door itself. You can feel it in your teeth. In your fingertips. In the marrow of your bones. The door vibrates with it: a thin, continuous tremor, the wood a membrane stretched across the mouth of something vast.</p>
<p>You stand there. You listen.</p>
<p>The music climbs. It descends. It moves through angular harmonies; combinations of tones that should be discordant but which resolve, somehow, into something that bypasses the ear entirely and speaks directly to the soul. Your heart rate changes. Your breathing stutters. The hairs on the back of your neck stand erect, and a cold sweat breaks across your skin.</p>
<p>And then, for one moment, the music does something seemingly impossible. It produces a sound that seems to suspend time. A note that opens a gap in the texture of reality through which you glimpse, or imagine, something on the other side.</p>
<p>The moment passes. The music retreats to mere brilliance. But the impression remains, burned on your mind like a retinal afterimage.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Knock on the door.',
      paragraph: 26,
      effects: { heard_music: 1 },
      audio: [
        { src: 'House_on_the_Hill-wind_outside_loop.ogg', volume: 0.4, loop: true },
        { src: 'House_on_the_Hill-door_knock.ogg', volume: 0.4, loop: false },
      ],
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -2 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> The music shakes you, but your mind holds. You are rattled but not broken. The experience leaves you sharpened, not diminished.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> The music breaches something inside you. A vibration takes root in your chest, in your skull, in the spaces between your thoughts. You feel, for a terrible instant, as if the top of your head has been removed and something is looking in. The sensation passes, but it leaves a mark \u2014 a hairline crack in the glass of your composure. <em>Sanity reduced by 2.</em></div>`,
        successOutcome: `<p>You knock. Your knuckles against the wood feel very small, very human, against the vastness of the sound inside.</p>
<p>The music stops. Not gradually \u2014 it ceases, instantly and completely, cut as if with a blade. The silence that follows is so absolute it has a sound of its own \u2014 a high, thin ringing, like the aftermath of a bell.</p>
<p>A long pause. Then the scrape of a chair. Slow footsteps. The click of a latch.</p>
<p>The door opens a crack. One huge, pale eye regards you through the gap, magnified to grotesque proportions by the thick spectacle lens. Behind it, the garret is dim \u2014 you see candlelight, the edge of a table, papers. And beyond them, at the far end of the room, a window. The curtain is drawn across it, but the fabric moves, very slightly, stirred by a breeze that enters from nowhere.</p>`,
        failOutcome: `<p>You knock. Your hand is trembling. You are not sure when it started.</p>
<p>The music stops. The silence hits you like a physical blow. Your vision swims. For a moment the stairwell seems to elongate, the walls stretching away from you, and you grip the banister to keep from falling.</p>
<p>A long pause. Then the door opens a crack. One huge, pale eye regards you through the gap. Behind the door, candlelight. Papers. And a window, curtained, its fabric stirring.</p>
<p>You try to speak, but your voice comes out wrong \u2014 thin, cracked, as if it belongs to someone else.</p>`
      },
      next: 's1_8'
    },
    {
      label: 'B',
      text: 'Do not disturb him. Listen from the landing until the music stops',
      paragraph: 27,
      effects: { heard_music: 1, dread: 1 },
      skillTest: {
        stat: 'sanity',
        deferResult: false,
        failPenalty: { sanity: -2 },
        successText: `<div class="skill-result success"><strong>Test Your Sanity \u2014 Success!</strong> You endure. The music washes over you and through you, and when it is done, you are still yourself \u2014 changed, perhaps, in ways you cannot yet articulate, but intact.</div>`,
        failText: `<div class="skill-result failure"><strong>Test Your Sanity \u2014 Failed.</strong> The music enters you. It finds a fissure in your composure and pries it wider. By the time it stops, you are sitting on the stairs with no memory of having sat down, your hands pressed against your temples, a thin ringing in your ears that will not entirely fade. <em>Sanity reduced by 2.</em></div>`,
        successOutcome: `<p>You stay. You sit on the top step of the staircase and you listen to the old man play.</p>
<p>The music continues for what might be twenty minutes or two hours. Time, near this door, does not behave as it should. The viol speaks in tongues, exploring territories of sound that no composer has mapped. At times it is hauntingly beautiful. At others it is unbearable.</p>
<p>Finally, it stops. The silence settles like dust. You hear the scrape of a chair. A dry, painful cough, from a man who has given everything he has. Then nothing.</p>
<p>You descend to your room. You sit on the edge of your bed in the dark, thinking about what you have heard. You do not sleep until dawn.</p>`,
        failOutcome: `<p>You stay. You cannot leave. The music holds you to the landing as surely as if it had taken you by the wrists and pressed you to the wall.</p>
<p>It builds. It crests. It does things to the air that are not possible, producing harmonics that vibrate in the hollow spaces of your body \u2014 your sinuses, your chest, the cavities of your skull. You feel your vision blur. The walls of the stairwell seem to breathe.</p>
<p>When the music finally stops, you find yourself sitting on the stairs. You do not remember sitting down. Your hands are pressed against your temples. There is a ringing in your ears \u2014 high, persistent, like a note the viol struck and left hanging in the air, unsupported, refusing to decay.</p>
<p>You return to your room. You sit on the edge of your bed. The ringing fades, slowly, over the course of an hour. But it does not entirely stop.</p>`
      },
      next: 's1_8'
    },
    {
      label: 'C',
      text: 'Retreat to your room \u2014 this is too much, too soon.',
      paragraph: 28,
      effects: { heard_music: 1 },
      outcome: `<p>You step back. The music presses against you like a hand on your chest, and you yield to it \u2014 not from cowardice, exactly, but from a recognition, deep and instinctive, that you are standing at the threshold of something you are not yet prepared to enter.</p>
<p>You descend the stairs. With each step the music diminishes, but it does not release you. It follows you into your room, through the closed door, through the pillow you press over your head. It is quieter here \u2014 thin, distant, reduced to a thread of sound \u2014 but it is present, and it will not let you go.</p>
<p>You lie in the dark and listen to it. After a time, the worst of it passes. The music settles into something merely strange, and you feel the tension in your body begin to ease. Your breathing steadies. Your heart slows.</p>
<p>But something has changed. You have stood outside that door. You have heard the music from close quarters. And you know, with a certainty that has nothing to do with reason, that you will go back.</p>
<p class="thought">There is a man up there, in a room at the top of the world, playing music that should not exist. And me, student of metaphysics, of what lies beyond \u2014 I am not going to leave that mystery alone.</p>`,
      next: 's1_8'
    }
  ]
},


// ========================================================================
// SCENE 1.8 - AN UNDERSTANDING
// First real interaction with Zann. He is afraid, but he is also
// lonely, and there is something about you that makes him willing
// to let you in - just slightly. Just enough.
// ========================================================================
's1_8': {
  paragraph: 29,
  title: 'An Understanding',
  ambience: 'garret',
  audio: [
    { src: 'House_on_the_Hill-footsteps_limping_loop.ogg', volume: 0.2, loop: false },
    { src: 'House_on_the_Hill-door_open.ogg', volume: 0.4, loop: false },
  ],
  text: `<p>Two more nights pass. On the third, you hear him on the staircase, not descending this time, for his evening\u2019s work at the theatre, but ascending, returning. His footsteps are heavier than usual. Slower. He stops on your landing.</p>
<p>When you open your door, he is standing in the corridor. The viol case hangs at his side. His face, in the dim gaslight, is drawn and grey. He seems not to have slept in days.</p>
<p>He holds out his hand. In it is a folded slip of paper. He presses it into your palm, then withdraws his hand quickly, as if the contact might burn him.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">I know you listen. I have heard you on the stairs. Come tonight, at eleven. I will explain what I can.</div></div>
<p>His handwriting is cramped and angular, in a Germanic script, precise but trembling. The ink is dark and has been applied with pressure, each word forced from the pen by an act of will.</p>
<p>He stands before you, waiting for your response. His eyes search your face. There is fear, but also desperation of a man who has kept a secret for so long that the weight of it has become unbearable, and who recognises, in a stranger, the possibility of being understood.</p>`,
  choices: [
    {
      label: 'A',
      text: 'Accept immediately \u2014 of course you will come.',
      paragraph: 30,
      effects: { zann_trust: 1 },
      audio: [
        { src: 'Bleakwater_Docks-scrape_tone_loop.ogg', volume: 0.3, loop: true },
        { src: 'Film_Noir-sting_harp.ogg', volume: 0.4, loop: false },
      ],
      outcome: `<p>You nod. You do not hesitate.</p>
<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I\u2019ll be there. Eleven o\u2019clock.</div></div>
<p>Something in Zann\u2019s expression shifts. The fear in his face is joined, for a moment, by something warmer. He nods with a finality that suggests a decision has been made that cannot be unmade.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He reaches out and grips your wrist, briefly, with surprising strength. His hand is cold. Then he releases you and climbs the final flight of stairs to the garret, and the door closes behind him.</div></div>
<p>You stand in the corridor holding the note. The paper is thin, almost translucent. You fold it carefully and place it in your breast pocket.</p>
<p>At eleven o\u2019clock you climb the stairs. The door is ajar. A thin yellow light spills across the landing. You push the door open and step inside.</p>
<p>The garret is smaller than you expected. The ceiling slopes sharply, following the angle of the roof, so that only the centre of the room allows you to stand upright. A table, a chair, a narrow bed. Candles in tarnished holders. Piles of manuscript paper, covered in dense notation. And against the far wall, below the window, a battered wooden music stand and, resting beside it, the viol.</p>
<p>You notice the window at once. It is larger than the room warrants, and curtained with heavy fabric. The curtain is drawn tight. But even drawn, it moves. A faint, continuous stirring, as if something on the other side is breathing against it.</p>
<p>Zann motions for you to sit. He pulls his own chair close. And then, slowly, with the deliberation of a man who has no voice to squander, he begins to gesture.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He points to the window. Then to the viol. Then to his own chest. He makes a motion with both hands \u2014 pressing outward, holding something back. His face is very grave.</div></div>
<p>Zann then takes some paper and writes. </>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">The window must not be opened. The music keeps it closed. I play every night. If I do not play, it opens. Do you understand? It opens.</div></div>
<p class="thought">I do not understand. Not yet.</p>`,
      next: 'a1_close'
    },
    {
      label: 'B',
      text: 'Accept, but carefully \u2014 you have questions.',
      paragraph: 31,
      effects: { knowledge: 1 },
      audio: [
        { src: 'Bleakwater_Docks-scrape_tone_loop.ogg', volume: 0.3, loop: true },
        { src: 'Film_Noir-sting_harp.ogg', volume: 0.4, loop: false },
      ],
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">I will come. But I need to know what I\u2019m walking into. Your music \u2014 it is not ordinary music. It does things. I have felt them.</div></div>
<p>Zann\u2019s eyes widen. For a moment the fear overwhelms everything else, and he looks about to bolt up the stairs, behind his locked door, away from this conversation. But he holds his ground.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He raises both hands, palms downward \u2014 a calming gesture. Wait. Patience. He draws a small notebook from his coat pocket and writes, quickly, his pen scratching across the paper with an urgency that borders on violence.</div></div>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Not here. Not in the corridor. Come to the room and I will show you. What I play is not for my pleasure. It is a necessity. You must understand this. A necessity.</div></div>
<p>He underlines the last word three times.</p>
<p>At eleven o\u2019clock you climb the stairs. The garret opens before you: a small room under a sloping ceiling, cluttered with candles and manuscript paper. Against the far wall, below a large curtained window, the viol rests on its stand.</p>
<p>The curtain moves slightly. A constant, faint stirring, as if the glass behind it is not quite sealed against whatever lies outside.</p>
<p>Zann pulls his chair close to yours. And in the language of gesture and written scraps and the eloquence of his extraordinary, terrified eyes, he begins to tell you what he can.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">The window must not be opened. The music is what keeps it shut. Every night I play. Every night it tries to open. Do you understand what I am telling you?</div></div>
<p class="thought">A necessity. He plays every night to keep a window closed. The absurdity of it jars with the terror on his face, and the terror wins. He believes what he is saying. And after what I have heard and felt on that landing, I am no longer certain he is wrong.</p>`,
      next: 'a1_close'
    },
    {
      label: 'C',
      text: 'Tell him you need time to think.',
      paragraph: 32,
      effects: { suspicion: -1, zann_trust: -1 },
      audio: [
        { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.3, loop: true },
        { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.1, loop: false },
      ],
      outcome: `<div class="dialog-box"><div class="dialog-speaker">Pickman</div><div class="dialog-text">Give me a day. I need to think.</div></div>
<p>Zann stares at you. He looks disappointed, and beneath that, something darker. Resignation, perhaps. The look of a man who has risked everything on an overture and been refused.</p>
<div class="dialog-box gesture-box"><div class="dialog-speaker">Zann</div><div class="dialog-text">He nods, slowly, heavily. He reaches out and takes the note back from your hand. He folds it and places it in his pocket. Then, without looking at you again, he turns and climbs the stairs to his garret.</div></div>
<p>The door closes. The lock turns. After a moment, the music begins.</p>
<p>You stand in the corridor and listen. Tonight the music is different \u2014 resigned, somehow. Elegiac. The viol seems to be mourning something that has not yet been lost.</p>
<p>You return to your room. You do not sleep. When dawn comes, you climb the stairs and slide a note of your own under the garret door.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Your Note</div><div class="dialog-text">Tonight. Eleven. I will come.</div></div>
<p>There is no response. But that evening, when you climb the stairs at eleven, the door is ajar. A thin line of candlelight. The garret waits.</p>
<p>You step inside. The room is small \u2014 a sloping ceiling, candles, manuscript paper, the viol on its stand. And the window. Large, curtained, its heavy fabric stirring continuously, stirred by a breeze that enters from nowhere and goes nowhere.</p>
<div class="dialog-box note-box"><div class="dialog-speaker">Zann\u2019s Note</div><div class="dialog-text">Thank you. I will explain what I can. The window is the important thing. The music keeps it closed. Without the music, it opens. This is all you need to know, for now.</div></div>
<p class="thought">For now. But <em>for now</em> is not enough. As a student of metaphysics, my study is what lies beyond. And there is something beyond that window, and the old man knows what it is, and I am going to find out.</p>`,
      next: 'a1_close'
    }
  ]
},


// ========================================================================
// ACT 1 CLOSE
// ========================================================================
'a1_close': {
  type: 'act_close',
  paragraph: 33,
  title: 'End of Act One',
  ambience: 'night',
  audio: [
    { src: 'Bleakwater_Docks-choral_tone_loop.ogg', volume: 0.2, loop: true },
    { src: 'Bleakwater_Docks-bent_tone_loop.ogg', volume: 0.3, loop: false },
  ],
  text: `<p>You sit in Zann\u2019s garret as the candles gutter and the night deepens around you. The old man is hunched in his chair, his hands resting on his knees, his eyes fixed on the window. Between you, a silence has settled: something has been set in motion that cannot now be undone.</p>
<p>The window. The music. The necessity.</p>
<p>You understand nothing, and you know too much.</p>
<p>Below you, the Rue d\u2019Auseil sleeps. Above you, there is only the roof, the sky, and beyond the sky, whatever it is that presses against the old man\u2019s window and listens for the silence between the notes.</p>
<div class="scene-break"></div>`,
  next: 'a2_title',
  nextActLabel: 'Act Two'
}

};
