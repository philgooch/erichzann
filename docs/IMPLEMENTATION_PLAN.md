# The Music of Erich Zann — Interactive Fiction
## Implementation Plan

---

## 1. Source Story Summary

A nameless university student, impoverished and searching for cheap lodgings, finds himself on the **Rue d'Auseil** — a steep, narrow street that appears on no map and which he can never afterwards relocate. He takes a room in a tall boarding house run by one **Blandot**. On the topmost floor lives **Erich Zann**, an elderly mute German who plays the viol in a local theatre orchestra. 

The narrator hears Zann's extraordinary, unearthly music at night. He befriends Zann, who is terrified of something beyond his garret window — the only window in the house that looks out over the city wall. Zann begins writing a manuscript explaining his situation but is interrupted by a night of cosmic terror: the window blows open, something beyond it responds to the music, Zann plays furiously to hold it back, then dies. The narrator flees with the manuscript pages, but they are torn from his hands by the wind. He escapes the Rue d'Auseil and can never find it again.

---

## 2. Game Architecture (Following Hawksmoor Pattern)

### File Structure
```
index.html          — HTML shell (adapted from Hawksmoor)
zann.css            — Themed stylesheet (dark, Parisian, eldritch)
engine.js           — Game engine (modified from Hawksmoor)
audio.js            — Web Audio API synthesised ambience (adapted from hamlet-audio.js)
act1_scenes.js      — Act 1: The Rue d'Auseil
act2_scenes.js      — Act 2: The Viol's Secret
act3_scenes.js      — Act 3: The Music of the Void
scenes.js           — Merger: SCENES = Object.assign({}, ACT1, ACT2, ACT3)
viol_game.js        — Mini-game: play Zann's viol (replaces shy_maid.js)
```

### State Variables

| Variable | Replaces | Purpose |
|---|---|---|
| `perception` | `skill` | Investigative sharpness, noticing details |
| `sanity` | `stamina` | Mental fortitude — depletes with cosmic exposure |
| `luck` | `luck` | Fortune (same mechanic) |
| `zann_trust` | `vane_trust` | Relationship with Zann; affects what he reveals |
| `knowledge` | `clues` | Forbidden/cosmic knowledge accumulated |
| `dread` | `alertness` | Mounting horror; affects available choices & endings |
| `suspicion` | `suspicion` | How much attention you're drawing (Blandot, neighbours) |
| `heard_music` | — | How many times you've heard Zann play |
| `knows_void` | `knows_wound` | Whether you've glimpsed what's beyond the window |
| `has_manuscript` | `knows_blade_detail` | Whether you possess Zann's written confession |
| `window_sealed` | `knows_bridge_entry` | Whether the window has been reinforced |
| `played_viol` | `reenactment` | Whether you've attempted to play the viol yourself |
| `rue_memory` | `reveal_winterly` | Your ability to remember the street's location |
| `zann_dead` | `own_dead` | Whether Zann has died |

### Three Display Stats (Stats Bar)
- **Perception** (1d6+6)
- **Sanity** (2d6+12)
- **Luck** (1d6+6)

---

## 3. Story Structure — Three Acts

### Act One: The Rue d'Auseil (~8-10 scenes)

The player arrives in an unnamed city as a metaphysics student, broke and searching for lodgings. Establishes atmosphere, introduces key characters, and ends with the first encounter with Zann's music.

| Scene | Title | Key Events | Choices |
|---|---|---|---|
| 1.1 | The Search | Wandering narrow streets at dusk, looking for lodgings | Choose approach: methodical search / follow instinct / ask locals |
| 1.2 | The Street | Discovering the Rue d'Auseil — unnaturally steep, strange | Observe carefully / hurry through / try to note location on map |
| 1.3 | Blandot's House | Meeting the landlord, seeing the boarding house | Ask about other tenants / take the room immediately / haggle |
| 1.4 | The Room | Settling in, exploring your cramped lodgings | Unpack and study / explore the building / go out for food |
| 1.5 | The First Night | Hearing distant, strange music from above | Listen at your door / try to sleep / go investigate |
| 1.6 | The Old Man | First encounter with Erich Zann on the stairs | Greet warmly / observe silently / ask about the music |
| 1.7 | The Overture | Hearing Zann play from outside his door — extraordinary, unsettling | Knock on his door / listen longer / return to your room |
| 1.8 | An Understanding | First real interaction with Zann; he is afraid, but curious about you | Offer friendship / press for answers / respect his silence |
| — | Act Close | Summary of Act 1 | → Act 2 |

### Act Two: The Viol's Secret (~10-12 scenes)

Deepening relationship with Zann, investigation of the street's nature, discovery of what lies beyond the window. The manuscript. Growing dread.

| Scene | Title | Key Events | Choices |
|---|---|---|---|
| 2.1 | Days in the Rue | Establishing routine, studying, returning to the boarding house | Study at the university / explore the neighbourhood / befriend neighbours |
| 2.2 | The Other Tenants | Meeting the building's residents | Talk to various tenants / investigate Blandot / ask about Zann |
| 2.3 | An Invitation | Zann invites you to his room to hear him play | Accept eagerly / accept cautiously / decline |
| 2.4 | The Garret | Inside Zann's room — the viol, the window, the piles of manuscript | Study the room / focus on Zann / look out the window |
| 2.5 | The Performance | Zann plays for you — starts beautiful, turns wild and terrifying | Stay and listen / try to approach the window / flee |
| 2.6 | The Window | Realising the window looks out on... nothing that should be there | Try to open it / step back / ask Zann what he sees |
| 2.7 | The Manuscript | Zann begins writing his confession for you | Read eagerly / help him write / ask questions as he writes |
| 2.8 | The Street at Night | Exploring the Rue d'Auseil alone at night — it changes | Map the street / speak to night wanderers / try to leave and return |
| 2.9 | **[MINI-GAME: The Viol]** | Zann asks you to try playing — or you try when he's away | Play the viol mini-game |
| 2.10 | What Answers | The music draws a response from beyond the window | Observe / assist Zann / try to close the window |
| 2.11 | The Truth | Piecing together Zann's story — the void, the music, the barrier | Accept the truth / deny it / plan an escape |
| — | Act Close | Summary of Act 2, dread rising | → Act 3 |

### Act Three: The Music of the Void (~8-10 scenes, branching to endings)

The final night. Everything converges. Multiple paths lead to different endings based on accumulated state.

| Scene | Title | Key Events | Branches |
|---|---|---|---|
| 3.1 | The Last Evening | Something is different tonight — the air, the silence | Prepare / visit Zann / try to leave |
| 3.2 | The Storm | An unnatural wind; the building shudders | Barricade your room / go to Zann / flee |
| 3.3 | The Garret Door | Reaching Zann's room — he's playing furiously | Enter / listen / try to get help |
| 3.4 | The Window Opens | The window blows open; beyond it is not the city but the void | Help Zann play / try to close it / look into the void |
| 3.5 | The Music Breaks | Zann's music falters — the void presses in | Take up the viol / hold the window / grab the manuscript and run |
| 3.6+ | **Branching endings** (see below) | Multiple resolution paths | Based on state variables |

---

## 4. Endings (4-5 total)

### Ending A — *The Canonical Ending*: "The Pages on the Wind"
**Conditions**: Default/most common path; low `played_viol`, moderate `knowledge`
Zann dies mid-performance. You grab what manuscript pages you can and flee down the stairs. The wind tears the pages from your hands. You burst from the building into unfamiliar streets. You can never find the Rue d'Auseil again. The knowledge is lost. You are haunted forever.
*"There are things in this world that cannot be mapped, streets that exist only when they choose to, and music that was never meant for human ears."*

### Ending B — *"The New Player"*: You Take Zann's Place
**Conditions**: High `played_viol`, high `zann_trust`, moderate+ `knowledge`, `sanity > threshold`
Zann dies, but you have learned enough of the music. You take up the viol and play. The void recedes. But as dawn comes, you realise you cannot stop. The music is the only thing between the world and what lies beyond. You are trapped, as Zann was. The new guardian.
*"You understand now. There has always been a player in this room, and there always will be."*

### Ending C — *"The Void Enters"*: Rue d'Auseil is Consumed
**Conditions**: High `dread`, low `sanity`, `knows_void >= 1`, failed key LUCK tests
The music stops and nothing holds back the void. The darkness pours through the window and begins consuming the building, the street, reality itself. You barely escape, running downhill through a street that is dissolving behind you. This is why the Rue d'Auseil can never be found — it no longer exists.
*"The street did not disappear from memory. It disappeared from the world."*

### Ending D — *"The Sealed Window"*: Escape with Knowledge
**Conditions**: High `knowledge`, `has_manuscript >= 1`, `window_sealed >= 1`, good `luck`
You help Zann seal the window with the manuscript's instructions. The music is no longer needed. Zann collapses from exhaustion but lives. You descend together into the morning. But when you look back, the street is already fading. You have the manuscript. You have the truth. Whether the world should know it is another question.
*"Some doors, once closed, stay closed. The question is what you do with the key."*

### Ending E — *"The Music of the Spheres"*: Transcendence
**Conditions**: Very high `knowledge`, high `perception`, `played_viol >= 1`, `sanity` still above threshold, looked into the void willingly
You look into the void and understand. It is not emptiness — it is everything, all at once. Zann's music was not holding back horror; it was translating it into something a human mind could endure. You play alongside Zann, two instruments harmonising, and for one impossible moment you perceive the music of the cosmos. Then the window closes of its own accord. You descend the stairs changed. The Rue d'Auseil vanishes, but you carry its music within you.
*"There are those who hear the music and go mad, and those who hear it and understand. You are not sure which you are."*

---

## 5. Mini-Game: "The Viol" (`viol_game.js`)

A **musical pattern-matching game** — thematically replacing the Shy Maid's three-card monte.

### Concept
Zann's viol produces a sequence of notes (represented as glowing orbs or strings vibrating). The player must repeat the pattern by clicking strings/notes in the correct order. Each round gets longer and more chaotic.

### Mechanics
- **Round 1** (3 notes): Simple sequence. Zann demonstrates, you repeat. Easy.
- **Round 2** (5 notes): Faster, stranger harmonies. A faint response is heard from beyond the window.
- **Round 3** (7 notes): The notes become discordant. The window rattles. You can feel *something listening*. The final note is impossible — there's no string for it. Whatever Zann plays, the viol shouldn't be able to produce.

### Visual Design
- 4 viol strings displayed vertically (like a simplified instrument)
- Notes light up in sequence (with Web Audio tones)
- Player clicks/taps strings to replay the sequence
- Eerie visual effects intensify each round (screen edges darken, colours shift)
- Self-contained module with injected CSS (same pattern as ShyMaid)

### Outcome
Success/failure affects `played_viol` state variable, and the narrative that follows.

---

## 6. Audio Design (`audio.js`)

Based on `hamlet-audio.js` — all synthesised via Web Audio API, no external files required (though scene.audio can layer .mp3/.ogg files on top).

### Ambience Functions

| Function | Scene | Description |
|---|---|---|
| `amb_street` | Rue d'Auseil exterior | Wind through narrow streets, distant footsteps, creaking signs, cobblestones |
| `amb_boarding_house` | Interior common areas | Creaking floorboards, muffled voices, dripping, distant street sounds |
| `amb_garret` | Zann's room (quiet) | Very quiet room tone, occasional creak, faint wind at window |
| `amb_garret_music` | Zann playing | Synthesised viol-like tones (eerie, not melodic), harmonic drones |
| `amb_void` | Window open/void revealed | Deep sub-bass drone, otherworldly harmonics, absence of natural sound |
| `amb_night` | Night scenes | Distant bells, wind, silence with occasional disturbance |
| `amb_storm` | The final storm | Violent wind, rattling windows, deep percussion, building chaos |
| `amb_rue_vanishing` | Street disappearing | Sounds fading out in reverse order, increasing silence, final distant note |

### Synthesised Sound Effects
- `playViolNote(pitch)` — single viol-like tone for the mini-game
- `playWindowRattle()` — glass and wood vibration
- `playVoidPulse()` — deep, stomach-turning sub-bass throb
- `playPageTurn()` — carried over from Hawksmoor
- `playDiceRoll()` — carried over
- `playTypeClick()` — carried over

---

## 7. CSS Theme (`zann.css`)

Darker, more oppressive palette than Hawksmoor. Think gaslit Paris, old paper, creeping shadow.

### Colour Palette
```css
:root {
  --parchment: #e8dcc8;        /* Slightly greyer, older paper */
  --parchment-dark: #c4b896;
  --parchment-light: #f0e6d4;
  --ink: #1a1520;               /* Purple-black ink */
  --ink-light: #4a3d52;
  --gold: #8b7355;              /* Tarnished, not bright */
  --gold-bright: #a89070;
  --gold-dim: #6b5940;
  --bg: #08060c;                /* Deep purple-black */
  --bg-panel: #120e18;
  --dialog-bg: #c8b88a;
  --thought-color: #3a2d42;
  --candle-glow: rgba(180, 140, 60, 0.2);   /* Dimmer gaslight */
  --candle-glow2: rgba(160, 120, 40, 0.1);
  --void-color: #0a0010;       /* NEW: the colour of the void */
  --void-glow: rgba(80, 0, 120, 0.15);  /* NEW: eldritch purple */
}
```

### Visual Effects
- Candle flicker animation (carried over, dimmer)
- **Void pulse**: subtle purple glow that intensifies as `dread` increases
- Parchment texture: slightly more distressed/aged
- Typography: same fonts (IM Fell English + Cinzel) work perfectly for this period

---

## 8. Engine Modifications (`engine.js`)

Relatively minimal changes needed — the engine is well-designed for reuse:

1. **State variables**: Replace Hawksmoor-specific vars with Zann vars
2. **Stat display names**: Skill → Perception, Stamina → Sanity
3. **Character generation descriptions**: Update flavour text
4. **Save key**: `'hawksmoor_save'` → `'zann_save'`
5. **Title screen**: New title, dramatis personae, tagline
6. **Stat descriptions**: Update for Perception/Sanity/Luck
7. **Game ending screen**: Update ending count and flavour text
8. **Mini-game hook**: `shy_maid` → `viol_game` in the minigame type handler
9. **Beginning button text**: "Enter the City" → "Enter the Rue d'Auseil" or similar
10. **Conditional dread effects**: Add optional CSS class changes when `dread` is high (e.g., darken the parchment edges)

---

## 9. Staged Implementation Plan

### Stage 1: Foundation (Day 1)
- [ ] `index.html` — Adapted shell
- [ ] `zann.css` — Full themed stylesheet
- [ ] `engine.js` — Modified engine with new state variables
- [ ] `scenes.js` — Merger file
- [ ] `audio.js` — Core audio engine with `amb_street`, `amb_boarding_house`, `amb_garret`, `amb_night` + all UI sounds (pageTurn, diceRoll, typeClick)

**Deliverable**: Working title screen, character generation, Act 1 title card. All synthesised audio functioning.

### Stage 2: Act One (Day 2)
- [ ] `act1_scenes.js` — All ~8-10 scenes of Act 1
- [ ] Establishing atmosphere, characters, first encounter with the music
- [ ] At least 3-4 choices per scene with meaningful state effects
- [ ] Skill tests integrated (Perception and Luck)
- [ ] Act 1 close screen

**Deliverable**: Fully playable Act 1 from title to act close.

### Stage 3: Act Two + Mini-Game (Day 3)
- [ ] `act2_scenes.js` — All ~10-12 scenes of Act 2
- [ ] `viol_game.js` — Complete mini-game module
- [ ] Additional ambience: `amb_garret_music`, `amb_void`, `amb_storm`
- [ ] Act 2 close screen

**Deliverable**: Fully playable Acts 1-2 with mini-game.

### Stage 4: Act Three + Endings (Day 4)
- [ ] `act3_scenes.js` — All branching scenes + 5 endings
- [ ] Conditional logic for ending selection
- [ ] `amb_rue_vanishing` ambience
- [ ] Final testing of all state paths
- [ ] Game ending screens with unique text per ending

**Deliverable**: Complete game, all endings reachable.

### Stage 5: Polish (Day 5)
- [ ] Audio refinement — balance levels, add more synthesised textures
- [ ] Placeholder audio file references for future .mp3/.ogg additions
- [ ] CSS polish — void effects, dread-responsive styling
- [ ] Playtesting all major paths
- [ ] Save/load verification

---

## 10. Dramatis Personae

| Character | Description |
|---|---|
| **The Narrator** (you) | A student of metaphysics at the university; impoverished, curious, perhaps too curious |
| **Erich Zann** | An elderly, mute German viol player; gaunt, grey-bearded, terrified of something beyond his window |
| **Blandot** | The landlord of the boarding house; palsied, incurious, content to collect rent and ask no questions |
| **The Tenant Below** | A weary clerk who has lived in the house for years; hears the music but will not speak of it |
| **The Night Wanderer** | A figure sometimes seen on the Rue d'Auseil after dark; may not be entirely human |
| **The Concierge** | An old woman at the foot of the street who remembers things she shouldn't |

---

## 11. Open Questions for Discussion

1. **Narrative voice**: Hawksmoor uses second person ("You sit at the prow..."). Lovecraft's original is first person. **Recommendation**: Keep second person for consistency with the gamebook format, but with a more introspective, academic flavour.

2. **Period setting**: Lovecraft's story is ambiguously set in a vaguely French city. **Recommendation**: Keep it vague and atmospheric — "the city", "the university" — as Lovecraft does. Don't name it Paris explicitly.

3. **Zann's muteness**: He communicates by gesture, expression, and writing. Dialog boxes will need a different treatment — perhaps *italicised stage directions* instead of spoken dialog. E.g.:
   ```
   [Zann gestures urgently at the window, then draws his finger across his throat.]
   ```

4. **MP3/OGG placeholders**: Should I include `scene.audio` references pointing to files you'll source later, or keep everything synthesised initially? **Recommendation**: Include references in the scene data as comments/placeholders, with synthesised ambience as the working default.

5. **Title**: "The Music of Erich Zann — An Interactive Audio Drama" or something more evocative? Possibilities:
   - *"The Music of Erich Zann"* (faithful)
   - *"The Rue d'Auseil"* (mysterious)
   - *"Erich Zann"* (stark)
